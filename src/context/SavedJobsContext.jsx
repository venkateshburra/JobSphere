import { createContext, useContext, useEffect, useState } from 'react';

const SavedJobsContext = createContext();

export function SavedJobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedJobs')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const toggleSaveJob = (job) => {
    setSavedJobs((prev) => {
      const exists = prev.find((j) => j.id === job.id);
      return exists ? prev.filter((j) => j.id !== job.id) : [...prev, job];
    });
  };

  const isJobSaved = (jobId) => savedJobs.some((j) => j.id === jobId);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, toggleSaveJob, isJobSaved }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  return useContext(SavedJobsContext);
}
