const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Turns resume-style dates ("Jan 2018", "April 2020", "2012", "Present") into a
 * sortable number. Parsed by hand so results are identical in every browser.
 */
export const parseResumeDate = (value?: string | null): number => {
  if (!value) return 0;
  if (/present|current|now/i.test(value)) return Number.MAX_SAFE_INTEGER;

  const year = Number((value.match(/\d{4}/) || ['0'])[0]);
  const monthIndex = MONTHS.findIndex((m) => value.toLowerCase().includes(m));

  return year * 12 + (monthIndex === -1 ? 0 : monthIndex);
};

/** Most recent first: ongoing roles on top, then by end date, then by start date. */
export const byMostRecent = <T extends { startDate?: string | null; endDate?: string | null }>(a: T, b: T) =>
  parseResumeDate(b.endDate) - parseResumeDate(a.endDate) ||
  parseResumeDate(b.startDate) - parseResumeDate(a.startDate);

export const isCurrent = (endDate?: string | null) => parseResumeDate(endDate) === Number.MAX_SAFE_INTEGER;
