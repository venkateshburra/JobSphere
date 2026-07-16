/**
 * Format a date string to a relative or absolute label.
 * @param {string} dateStr - ISO date string
 */
export function formatPostedDate(dateStr) {
  const posted = new Date(dateStr);
  const now = new Date();
  const diffMs = now - posted;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return posted.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Get color class for job type badge
 */
export function getJobTypeColor(jobType) {
  const map = {
    'Full-time': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    'Part-time': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    Remote: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
    Hybrid: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    Contract: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    Internship: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
  };
  return map[jobType] || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
}

/**
 * Truncate text to a max length
 */
export function truncate(text, maxLen = 120) {
  if (!text) return '';
  return text.length <= maxLen ? text : text.slice(0, maxLen) + '...';
}

/**
 * Validate an email address
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate a phone number (basic)
 */
export function isValidPhone(phone) {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
}
