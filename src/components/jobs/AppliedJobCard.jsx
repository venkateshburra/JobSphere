import { Link } from 'react-router-dom';
import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineChevronRight,
  HiOutlineTrash,
  HiOutlineCalendar,
  HiOutlineUser,
} from 'react-icons/hi';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { getJobTypeColor } from '../../utils/helpers';
import { useAppliedJobs } from '../../context/AppliedJobsContext';

/**
 * Maps a status label to badge colors.
 */
function getStatusStyle(status) {
  const map = {
    'Under Review':
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    'Interview Scheduled':
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    Accepted:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    Rejected:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  };
  return (
    map[status] ||
    'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
  );
}

/**
 * Format an ISO date string to a readable applied date.
 */
function formatAppliedDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AppliedJobCard({ job }) {
  const { removeApplied } = useAppliedJobs();

  return (
    <article className="group relative bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-100 dark:hover:shadow-violet-900/20 hover:-translate-y-0.5 transition-all duration-200">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500" />

      <div className="p-5 flex flex-col gap-4">
        {/* Applied badge + remove */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800">
            <HiOutlineCheckCircle className="text-sm" />
            Applied
          </span>

          {/* Remove from applied */}
          <button
            onClick={() => removeApplied(job.id)}
            aria-label="Remove from applied"
            title="Remove from applied list"
            className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:text-slate-600 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <HiOutlineTrash className="text-base" />
          </button>
        </div>

        {/* Company logo + name + title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  job.company
                )}&background=7c3aed&color=fff&size=64&bold=true`;
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider truncate">
              {job.company}
            </p>
            <h2 className="text-base font-bold text-slate-800 dark:text-white leading-tight mt-0.5 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {job.title}
            </h2>
          </div>
        </div>

        {/* Application status */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Application Status
            </p>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusStyle(
                job.status
              )}`}
            >
              {job.status}
            </span>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getJobTypeColor(
                job.jobType
              )}`}
            >
              {job.jobType}
            </span>
          </div>
        </div>

        {/* Meta info grid */}
        <ul className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-slate-500 dark:text-slate-400">
          <li className="flex items-center gap-1.5">
            <HiOutlineLocationMarker className="shrink-0 text-violet-400" />
            <span className="truncate">{job.location}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <HiOutlineCurrencyDollar className="shrink-0 text-emerald-400" />
            <span className="truncate">{job.salary}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <HiOutlineClock className="shrink-0 text-amber-400" />
            <span>{job.experience}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <MdOutlineWorkHistory className="shrink-0 text-slate-400" />
            <span>{job.jobType}</span>
          </li>
        </ul>

        {/* Applicant info */}
        <div className="rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 p-3 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <HiOutlineUser className="shrink-0 text-violet-400" />
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {job.applicantName}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <HiOutlineCalendar className="shrink-0 text-violet-400" />
            Applied on{' '}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {formatAppliedDate(job.appliedAt)}
            </span>
          </div>
        </div>

        {/* View job link */}
        <div className="pt-1 border-t border-slate-100 dark:border-slate-700/60">
          <Link
            to={`/jobs/${job.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors"
          >
            View Job Details
            <HiOutlineChevronRight className="text-base transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
