import { useState } from 'react';
import { HiOutlineX, HiOutlinePaperAirplane } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { isValidEmail, isValidPhone } from '../../utils/helpers';
import { useAppliedJobs } from '../../context/AppliedJobsContext';

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  resumeUrl: '',
  coverLetter: '',
};

export default function ApplyModal({ job, onClose }) {
  const { markAsApplied, isJobApplied } = useAppliedJobs();
  const alreadyApplied = isJobApplied(job.id);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!isValidPhone(form.phone)) e.phone = 'Enter a valid phone number.';
    if (form.resumeUrl && !/^https?:\/\/.+/.test(form.resumeUrl))
      e.resumeUrl = 'Enter a valid URL starting with http:// or https://';
    if (!form.coverLetter.trim()) e.coverLetter = 'Cover letter is required.';
    else if (form.coverLetter.trim().length < 50)
      e.coverLetter = 'Cover letter must be at least 50 characters.';
    return e;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    // Persist to applied jobs context (localStorage)
    markAsApplied(job, form);
    toast.success(`Application submitted for ${job.title} at ${job.company}! 🎉`);
    setForm(INITIAL);
    onClose();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {alreadyApplied ? 'Already Applied' : 'Apply for Position'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {job.title} · {job.company}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close application form"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        {/* Already applied banner */}
        {alreadyApplied && (
          <div className="px-6 py-8 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <HiOutlinePaperAirplane className="text-2xl text-violet-600 dark:text-violet-400 rotate-90" />
            </div>
            <p className="font-bold text-slate-800 dark:text-white text-lg">
              You've already applied!
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              Your application for <span className="font-semibold text-slate-700 dark:text-slate-200">{job.title}</span> at{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">{job.company}</span> has been submitted.
              Track its status on your Applied Jobs page.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Form */}
        {!alreadyApplied && (
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <Field
            id="apply-name"
            label="Full Name *"
            type="text"
            value={form.fullName}
            onChange={(v) => handleChange('fullName', v)}
            error={errors.fullName}
            placeholder="John Doe"
          />
          <Field
            id="apply-email"
            label="Email Address *"
            type="email"
            value={form.email}
            onChange={(v) => handleChange('email', v)}
            error={errors.email}
            placeholder="john@example.com"
          />
          <Field
            id="apply-phone"
            label="Phone Number *"
            type="tel"
            value={form.phone}
            onChange={(v) => handleChange('phone', v)}
            error={errors.phone}
            placeholder="+1 (555) 000-0000"
          />
          <Field
            id="apply-resume"
            label="Resume URL"
            type="url"
            value={form.resumeUrl}
            onChange={(v) => handleChange('resumeUrl', v)}
            error={errors.resumeUrl}
            placeholder="https://drive.google.com/..."
          />
          {/* Cover Letter */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="apply-cover" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Cover Letter *
            </label>
            <textarea
              id="apply-cover"
              rows={4}
              value={form.coverLetter}
              onChange={(e) => handleChange('coverLetter', e.target.value)}
              placeholder="Tell us why you're a great fit for this role..."
              className={`px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition resize-none ${
                errors.coverLetter
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-slate-200 dark:border-slate-600 focus:ring-indigo-400'
              }`}
            />
            {errors.coverLetter && (
              <p className="text-xs text-red-500">{errors.coverLetter}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 mt-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <HiOutlinePaperAirplane className="text-base" />
                Submit Application
              </>
            )}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}

function Field({ id, label, type, value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
          error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-slate-200 dark:border-slate-600 focus:ring-indigo-400'
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
