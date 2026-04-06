/**
 * Formats a date string to a short, readable format
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Apr 5")
 */
export const formatShortDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const [year, month, day] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Formats a date string to a full readable format
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "April 5, 2026")
 */
export const formatFullDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const [year, month, day] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric' 
  });
};