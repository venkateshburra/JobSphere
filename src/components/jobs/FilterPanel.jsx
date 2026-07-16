import { HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi';

const LOCATIONS = ['San Francisco, CA', 'New York, NY', 'Remote', 'Austin, TX', 'Seattle, WA', 'Menlo Park, CA', 'Mountain View, CA'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Hybrid', 'Contract', 'Internship'];
const EXPERIENCE = ['1+ years', '2+ years', '3+ years', '4+ years', '5+ years', '6+ years'];

function Select({ id, label, value, onChange, options, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FilterPanel({ filters, onFilterChange, onReset, totalJobs }) {
  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <aside className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <HiOutlineAdjustments className="text-indigo-500 text-xl" />
          <h2 className="font-bold text-slate-800 dark:text-white">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <HiOutlineX className="text-sm" />
            Reset
          </button>
        )}
      </div>

      {/* Job count */}
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
        <span className="font-bold text-indigo-600 dark:text-indigo-400">{totalJobs}</span> jobs found
      </p>

      <div className="flex flex-col gap-4">
        <Select
          id="filter-location"
          label="Location"
          value={filters.location}
          onChange={(v) => onFilterChange('location', v)}
          options={LOCATIONS}
          placeholder="All Locations"
        />
        <Select
          id="filter-jobtype"
          label="Job Type"
          value={filters.jobType}
          onChange={(v) => onFilterChange('jobType', v)}
          options={JOB_TYPES}
          placeholder="All Types"
        />
        <Select
          id="filter-experience"
          label="Experience"
          value={filters.experience}
          onChange={(v) => onFilterChange('experience', v)}
          options={EXPERIENCE}
          placeholder="All Levels"
        />
      </div>

      {/* Reset button (bottom) */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="mt-5 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Reset all filters
        </button>
      )}
    </aside>
  );
}
