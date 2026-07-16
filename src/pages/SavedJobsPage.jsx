import { useSavedJobs } from '../context/SavedJobsContext';
import JobCard from '../components/jobs/JobCard';
import { EmptySavedJobs } from '../components/ui/EmptyState';
import { HiOutlineBookmark } from 'react-icons/hi';

export default function SavedJobsPage() {
  const { savedJobs } = useSavedJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
          <HiOutlineBookmark className="text-indigo-600 dark:text-indigo-400 text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">Saved Jobs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <EmptySavedJobs />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
