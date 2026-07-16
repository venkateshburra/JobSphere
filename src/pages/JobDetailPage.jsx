import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineArrowLeft,
  HiOutlineBriefcase,
  HiOutlineCheck,
} from 'react-icons/hi';
import { getJobTypeColor, formatPostedDate } from '../utils/helpers';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useAppliedJobs } from '../context/AppliedJobsContext';
import jobs from '../data/jobs.json';
import ApplyModal from '../components/jobs/ApplyModal';
import EmptyState from '../components/ui/EmptyState';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleSaveJob, isJobSaved } = useSavedJobs();
  const { isJobApplied } = useAppliedJobs();
  const [showApply, setShowApply] = useState(false);

  const job = jobs.find((j) => j.id === id);
  const saved = job ? isJobSaved(job.id) : false;
  const applied = job ? isJobApplied(job.id) : false;

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Job not found"
          subtitle="This job listing may have been removed or the link is incorrect."
        />
        <div className="text-center mt-6">
          <Link to="/jobs" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-7 group"
        >
          <HiOutlineArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job header card */}
            <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=6366f1&color=fff&size=64&bold=true`;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                    {job.company}
                  </p>
                  <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white leading-tight">
                    {job.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <HiOutlineLocationMarker className="text-indigo-400 shrink-0" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiOutlineClock className="text-amber-400 shrink-0" />
                      {job.experience}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiOutlineCalendar className="text-slate-400 shrink-0" />
                      Posted {formatPostedDate(job.postedDate)}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(job.jobType)}`}>
                      {job.jobType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <Section title="About the Role" icon={<HiOutlineBriefcase className="text-indigo-500" />}>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{job.description}</p>
            </Section>

            {/* Responsibilities */}
            <Section title="Responsibilities">
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <HiOutlineCheck className="shrink-0 text-emerald-500 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Requirements */}
            <Section title="Requirements">
              <ul className="space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Skills */}
            <Section title="Required Skills">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Job meta card */}
            <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 sticky top-24">
              <h2 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wider">
                Job Overview
              </h2>
              <ul className="space-y-3 mb-6">
                <MetaItem icon={<HiOutlineCurrencyDollar className="text-emerald-500" />} label="Salary" value={job.salary} />
                <MetaItem icon={<HiOutlineClock className="text-amber-500" />} label="Experience" value={job.experience} />
                <MetaItem icon={<HiOutlineLocationMarker className="text-rose-500" />} label="Location" value={job.location} />
                <MetaItem icon={<HiOutlineBriefcase className="text-indigo-500" />} label="Job Type" value={job.jobType} />
              </ul>

              {/* Apply button */}
              {applied ? (
                <div className="mb-3">
                  <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-400 font-semibold text-sm">
                    <HiOutlineCheck className="text-base" />
                    Application Submitted
                  </div>
                  <Link
                    to="/applied"
                    className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    View in Applied Jobs →
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => setShowApply(true)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 mb-3"
                >
                  Apply Now
                </button>
              )}

              {/* Save button */}
              <button
                onClick={() => toggleSaveJob(job)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-colors ${
                  saved
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {saved ? <HiBookmark className="text-lg" /> : <HiOutlineBookmark className="text-lg" />}
                {saved ? 'Saved' : 'Save Job'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApply && <ApplyModal job={job} onClose={() => setShowApply(false)} />}
    </>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-bold text-slate-800 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function MetaItem({ icon, label, value }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{value}</p>
      </div>
    </li>
  );
}
