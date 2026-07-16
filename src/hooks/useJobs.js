import { useState, useMemo } from 'react';
import jobs from '../data/jobs.json';

const JOBS_PER_PAGE = 9;

export function useJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: '',
    salaryRange: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some((s) => s.toLowerCase().includes(query));

      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesJobType =
        !filters.jobType || job.jobType === filters.jobType;

      const matchesExperience =
        !filters.experience || job.experience === filters.experience;

      return matchesSearch && matchesLocation && matchesJobType && matchesExperience;
    });
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(start, start + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const resetFilters = () => {
    setFilters({ location: '', jobType: '', experience: '', salaryRange: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return {
    jobs: paginatedJobs,
    allFilteredJobs: filteredJobs,
    totalJobs: filteredJobs.length,
    searchQuery,
    filters,
    currentPage,
    totalPages,
    handleSearch,
    handleFilterChange,
    resetFilters,
    setCurrentPage,
    JOBS_PER_PAGE,
  };
}
