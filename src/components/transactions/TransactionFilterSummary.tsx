import React from 'react';
import { Filter } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';

interface FilterTotals {
  income: number;
  expense: number;
}

interface TransactionFilterSummaryProps {
  isFilteringActive: boolean;
  filteredCount: number;
  filteredTotals: FilterTotals;
}

export const TransactionFilterSummary: React.FC<TransactionFilterSummaryProps> = ({
  isFilteringActive,
  filteredCount,
  filteredTotals
}) => {
  if (!isFilteringActive || filteredCount === 0) {
    return null;
  }

  return (
    <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-3 animate-in fade-in slide-in-from-top-2">
      <span className="text-xs sm:text-sm font-medium text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
        <Filter size={14} className="flex-shrink-0" /> 
        <span className="truncate">Showing totals for {filteredCount} filtered items</span>
      </span>
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold flex-wrap">
        {filteredTotals.income > 0 && (
          <span className="text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
            Income: <FormatCurrency amount={filteredTotals.income} />
          </span>
        )}
        {filteredTotals.expense > 0 && (
          <span className="text-rose-600 dark:text-rose-400 whitespace-nowrap">
            Expenses: <FormatCurrency amount={filteredTotals.expense} />
          </span>
        )}
      </div>
    </div>
  );
};