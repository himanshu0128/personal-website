const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const isCurrent = (date?: string | null): boolean => !date || date.trim().toLowerCase() === 'present';

/** Turns loose resume dates like "Dec 2015", "April 2020", "2005" or "Present" into a sortable number. */
export const toSortValue = (date?: string | null): number => {
  if (isCurrent(date)) return Number.POSITIVE_INFINITY;
  const value = date!.trim().toLowerCase();
  const year = Number(value.match(/\d{4}/)?.[0] ?? 0);
  const month = MONTHS.findIndex((name) => value.startsWith(name));
  return year * 12 + Math.max(month, 0);
};

interface Dated {
  startDate?: string | null;
  endDate?: string | null;
}

/** Sort comparator: ongoing / most recently ended first, ties broken by latest start. */
export const byMostRecent = (a: Dated, b: Dated): number =>
  toSortValue(b.endDate) - toSortValue(a.endDate) || toSortValue(b.startDate) - toSortValue(a.startDate);
