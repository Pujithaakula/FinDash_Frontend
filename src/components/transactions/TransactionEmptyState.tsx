import React from 'react';
import { Filter } from 'lucide-react';

interface TransactionEmptyStateProps {
  hasSearchQuery: boolean;
  onClearSearch: () => void;
}

export const TransactionEmptyState: React.FC<TransactionEmptyStateProps> = ({
  hasSearchQuery,
  onClearSearch
}) => {
  return (
    <div className="py-20 text-center flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Filter className="text-slate-400 dark:text-slate-500" size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
        No transactions found
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-4">
        We couldn't find any transactions matching your current filters or search query.
      </p>
      {hasSearchQuery && (
        <button 
          onClick={onClearSearch}
          className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
        >
          Clear search
        </button>
      )}
    </div>
  );
};