import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineBriefcase } from 'react-icons/hi';

const suggestions = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'DevOps Engineer',
  'React Developer',
];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white">
      {/* Decorative background blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <HiOutlineBriefcase className="text-indigo-300" />
          <span className="text-indigo-200">Over 1,000 jobs available today</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
          Find Your{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Dream Job
          </span>
          <br />
          With JobSphere
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover thousands of opportunities from top companies. Search, filter, and apply — all in one place.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl mx-auto mb-8"
        >
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
            <input
              id="hero-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, company, or skill..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition-colors shadow-lg shadow-indigo-500/30"
          >
            Search Jobs
          </button>
        </form>

        {/* Suggestion chips */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-slate-400 text-sm mr-1 self-center">Popular:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => navigate(`/jobs?q=${encodeURIComponent(s)}`)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-slate-200 hover:bg-indigo-500/40 hover:border-indigo-400 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
