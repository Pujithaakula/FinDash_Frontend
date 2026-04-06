import React from 'react';

interface TransactionTypeFilterProps {
  selectedType: 'all' | 'income' | 'expense';
  onTypeChange: (type: 'all' | 'income' | 'expense') => void;
}

export const TransactionTypeFilter: React.FC<TransactionTypeFilterProps> = ({
  selectedType,
  onTypeChange
}) => {
  const types = [
    { value: 'all' as const, label: 'All' },
    { value: 'income' as const, label: 'Income' },
    { value: 'expense' as const, label: 'Expense' }
  ];

  return (
    <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-700/50">
      {types.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onTypeChange(value)}
          className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg capitalize transition-all duration-200 ${
            selectedType === value 
              ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};