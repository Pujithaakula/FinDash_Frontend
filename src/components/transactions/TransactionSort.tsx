import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface TransactionSortProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export const TransactionSort: React.FC<TransactionSortProps> = ({
  sortBy,
  onSortChange
}) => {
  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'amount-desc', label: 'Highest Amount' },
    { value: 'amount-asc', label: 'Lowest Amount' }
  ];

  return (
    <div className="relative group flex-1 md:flex-initial min-w-0 md:min-w-[140px]">
      <select 
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium py-2.5 pl-3 sm:pl-4 pr-9 sm:pr-10 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-800 truncate"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ArrowUpDown size={14} className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  );
};