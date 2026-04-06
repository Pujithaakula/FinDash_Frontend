import React from 'react';
import { Search } from 'lucide-react';

interface TransactionSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export const TransactionSearch: React.FC<TransactionSearchProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search descriptions..."
}) => {
  return (
    <div className="relative w-full md:max-w-xs lg:max-w-sm group">
      <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" size={18} />
      <input 
        type="text" 
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 transition-all shadow-sm"
      />
    </div>
  );
};