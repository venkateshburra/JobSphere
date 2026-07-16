import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBriefcase, HiOutlineLightningBolt, HiOutlineChevronRight } from 'react-icons/hi';
import HeroSection from '../components/hero/HeroSection';
import JobCard from '../components/jobs/JobCard';
import { SkeletonGrid } from '../components/jobs/SkeletonCard';
import jobs from '../data/jobs.json';

const STATS = [
  { label: 'Jobs Available', value: '10,000+' },
  { label: 'Companies Hiring', value: '500+' },
  { label: 'Candidates Placed', value: '25,000+' },
  { label: 'Countries', value: '50+' },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay for skeleton demo
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const featuredJobs = jobs.slice(0, 6);

  return (
    <>
      <HeroSection />

      {/* Stats bar */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {value}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineLightningBolt className="text-indigo-500 text-lg" />
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Featured
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
              Latest Job Opportunities
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Handpicked roles from top companies
            </p>
          </div>
          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            View all jobs
            <HiOutlineChevronRight />
          </Link>
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-md shadow-indigo-200 dark:shadow-indigo-900/30"
              >
                <HiOutlineBriefcase />
                Browse All {jobs.length} Jobs
              </Link>
            </div>
          </>
        )}
      </section>

      {/* CTA banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white p-8 sm:p-12 text-center">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to find your next role?</h2>
          <p className="text-indigo-200 mb-7 max-w-xl mx-auto">
            Join thousands of professionals who found their dream job through JobSphere. It's free, fast, and easy.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-bold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            <HiOutlineBriefcase />
            Explore Jobs Now
          </Link>
        </div>
      </section>
    </>
  );
}
