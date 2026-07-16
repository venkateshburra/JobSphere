import { Link } from 'react-router-dom';
import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { formatPostedDate, getJobTypeColor, truncate } from '../../utils/helpers';
import { useSavedJobs } from '../../context/SavedJobsContext';

export default function JobCard({ job }) {
  const { toggleSaveJob, isJobSaved } = useSavedJobs();
  const saved = isJobSaved(job.id);

  return (
    <article className="group relative bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        {/* Logo + company */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=6366f1&color=fff&size=64&bold=true`;
              }}
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {job.company}
            </p>
            <h2 className="text-base font-bold text-slate-800 dark:text-white leading-tight mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {job.title}
            </h2>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={() => toggleSaveJob(job)}
          aria-label={saved ? 'Remove from saved' : 'Save job'}
          title={saved ? 'Remove from saved' : 'Save job'}
          className={`p-2 rounded-lg shrink-0 transition-colors ${saved
              ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/30'
              : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30'
            }`}
        >
          {saved ? <HiBookmark className="text-xl" /> : <HiOutlineBookmark className="text-xl" />}
        </button>
      </div>

      {/* Job type badge */}
      <div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getJobTypeColor(job.jobType)}`}>
          {job.jobType}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
        {truncate(job.description, 115)}
      </p>

      {/* Meta info */}
      <ul className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-slate-500 dark:text-slate-400">
        <li className="flex items-center gap-1.5">
          <HiOutlineLocationMarker className="shrink-0 text-indigo-400" />
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
        <li className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
          {formatPostedDate(job.postedDate)}
        </li>
      </ul>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400">
            +{job.skills.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          View Details
          <HiOutlineChevronRight className="text-base transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
