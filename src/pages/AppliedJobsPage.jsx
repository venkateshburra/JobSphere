import { useAppliedJobs } from '../context/AppliedJobsContext';
import AppliedJobCard from '../components/jobs/AppliedJobCard';
import EmptyState from '../components/ui/EmptyState';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HiOutlineBriefcase } from 'react-icons/hi';

export default function AppliedJobsPage() {
  const { appliedJobs } = useAppliedJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <MdOutlineWorkHistory className="text-violet-600 dark:text-violet-400 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              Applied Jobs
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {appliedJobs.length} application{appliedJobs.length !== 1 ? 's' : ''} submitted
            </p>
          </div>
        </div>

        {appliedJobs.length > 0 && (
          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <HiOutlineBriefcase />
            Browse More Jobs
          </Link>
        )}
      </div>

      {/* Status legend */}
      {appliedJobs.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-7 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider self-center mr-1">
            Status Key:
          </span>
          {[
            { label: 'Under Review', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
            { label: 'Interview Scheduled', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
            { label: 'Accepted', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
            { label: 'Rejected', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
          ].map(({ label, color }) => (
            <span key={label} className={`px-2.5 py-1 rounded-md text-xs font-semibold ${color}`}>
              {label}
            </span>
          ))}
        </div>
      )}

      {appliedJobs.length === 0 ? (
        <EmptyState
          icon={MdOutlineWorkHistory}
          title="No applications yet"
          subtitle="You haven't applied to any jobs. Browse openings and hit Apply Now to get started!"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {appliedJobs.map((job) => (
            <AppliedJobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
