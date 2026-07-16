import { HiOutlineSearch } from 'react-icons/hi';
import { MdWorkOutline } from 'react-icons/md';

export default function EmptyState({ title, subtitle, icon: Icon }) {
  const DefaultIcon = HiOutlineSearch;
  const DisplayIcon = Icon || DefaultIcon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-5">
        <DisplayIcon className="text-4xl text-indigo-400 dark:text-indigo-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        {title || 'No results found'}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
        {subtitle || "We couldn't find any jobs matching your search. Try adjusting your filters or search term."}
      </p>
    </div>
  );
}

export function EmptySavedJobs() {
  return (
    <EmptyState
      icon={MdWorkOutline}
      title="No saved jobs yet"
      subtitle="Browse jobs and click the bookmark icon to save them here for later."
    />
  );
}
