import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  HiOutlineBriefcase,
  HiOutlineBookmark,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import { useSavedJobs } from '../../context/SavedJobsContext';
import { useAppliedJobs } from '../../context/AppliedJobsContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { savedJobs } = useSavedJobs();
  const { appliedJobs } = useAppliedJobs();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/saved', label: 'Saved Jobs' },
    { to: '/applied', label: 'Applied Jobs' },
  ];

  const activeLinkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors';

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700/60 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-300 dark:group-hover:shadow-indigo-900 transition-shadow">
              <HiOutlineBriefcase className="text-white text-xl" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-indigo-600 dark:text-indigo-400">Job</span>
              <span className="text-slate-800 dark:text-white">Sphere</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={activeLinkClass}>
                {link.label === 'Saved Jobs' ? (
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {savedJobs.length > 0 && (
                      <span className="bg-indigo-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                        {savedJobs.length}
                      </span>
                    )}
                  </span>
                ) : link.label === 'Applied Jobs' ? (
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {appliedJobs.length > 0 && (
                      <span className="bg-violet-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                        {appliedJobs.length}
                      </span>
                    )}
                  </span>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <HiOutlineSun className="text-xl" /> : <HiOutlineMoon className="text-xl" />}
            </button>

            {/* Saved shortcut (desktop) */}
            <button
              onClick={() => navigate('/saved')}
              aria-label="Saved jobs"
              className="relative hidden md:flex p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800 transition-colors"
            >
              <HiOutlineBookmark className="text-xl" />
              {savedJobs.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-indigo-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {savedJobs.length}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {menuOpen ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-slate-200 dark:border-slate-700 mt-1 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-medium ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  } transition-colors`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label === 'Saved Jobs' ? (
                  <span className="flex items-center justify-between">
                    {link.label}
                    {savedJobs.length > 0 && (
                      <span className="bg-indigo-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {savedJobs.length}
                      </span>
                    )}
                  </span>
                ) : link.label === 'Applied Jobs' ? (
                  <span className="flex items-center justify-between">
                    {link.label}
                    {appliedJobs.length > 0 && (
                      <span className="bg-violet-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {appliedJobs.length}
                      </span>
                    )}
                  </span>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
