import { Link } from 'react-router-dom';
import { HiOutlineHome, HiOutlineBriefcase } from 'react-icons/hi';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-black text-indigo-200 dark:text-indigo-900 select-none mb-4">404</p>
      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">Page not found</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        Looks like this page doesn't exist. Head back to safety.
      </p>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
        >
          <HiOutlineHome />
          Go Home
        </Link>
        <Link
          to="/jobs"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors"
        >
          <HiOutlineBriefcase />
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
