import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard';
import { SkeletonGrid } from '../components/jobs/SkeletonCard';
import FilterPanel from '../components/jobs/FilterPanel';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import { useJobs } from '../hooks/useJobs';
import { HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi';

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    jobs,
    allFilteredJobs,
    totalJobs,
    searchQuery,
    filters,
    currentPage,
    totalPages,
    handleSearch,
    handleFilterChange,
    resetFilters,
    setCurrentPage,
  } = useJobs();

  // Pre-fill search from URL query param
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) handleSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [searchQuery, filters, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1">Browse Jobs</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Find opportunities that match your skills and ambitions
        </p>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowMobileFilters((o) => !o)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {showMobileFilters ? <HiOutlineX /> : <HiOutlineAdjustments />}
          Filters
        </button>
      </div>

      {/* Mobile filter panel */}
      {showMobileFilters && (
        <div className="lg:hidden mb-6">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
            totalJobs={totalJobs}
          />
        </div>
      )}

      <div className="flex gap-7">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
              totalJobs={totalJobs}
            />
          </div>
        </aside>

        {/* Jobs grid */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips */}
          {Object.entries(filters).some(([, v]) => v) && (
            <div className="flex flex-wrap gap-2 mb-5">
              {Object.entries(filters).map(([key, val]) =>
                val ? (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
                  >
                    {val}
                    <button
                      onClick={() => handleFilterChange(key, '')}
                      aria-label={`Remove ${key} filter`}
                      className="hover:text-indigo-900 dark:hover:text-indigo-100"
                    >
                      <HiOutlineX className="text-xs" />
                    </button>
                  </span>
                ) : null
              )}
            </div>
          )}

          {loading ? (
            <SkeletonGrid count={9} />
          ) : jobs.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                Showing {(currentPage - 1) * 9 + 1}–{Math.min(currentPage * 9, allFilteredJobs.length)} of {totalJobs} jobs
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setCurrentPage(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
