import { createContext, useContext, useEffect, useState } from 'react';

const AppliedJobsContext = createContext();

export function AppliedJobsProvider({ children }) {
  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('appliedJobs')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  /**
   * Mark a job as applied. Stores job + application details + timestamp.
   * @param {object} job - The job object
   * @param {object} applicationData - Form data submitted (name, email, etc.)
   */
  const markAsApplied = (job, applicationData) => {
    setAppliedJobs((prev) => {
      const alreadyApplied = prev.find((j) => j.id === job.id);
      if (alreadyApplied) return prev; // prevent duplicate
      return [
        ...prev,
        {
          ...job,
          appliedAt: new Date().toISOString(),
          applicantName: applicationData.fullName,
          applicantEmail: applicationData.email,
          status: 'Under Review', // default status
        },
      ];
    });
  };

  const isJobApplied = (jobId) => appliedJobs.some((j) => j.id === jobId);

  const removeApplied = (jobId) =>
    setAppliedJobs((prev) => prev.filter((j) => j.id !== jobId));

  return (
    <AppliedJobsContext.Provider
      value={{ appliedJobs, markAsApplied, isJobApplied, removeApplied }}
    >
      {children}
    </AppliedJobsContext.Provider>
  );
}

export function useAppliedJobs() {
  return useContext(AppliedJobsContext);
}
