import React from 'react';

interface TransactionTypeToggleProps {
  type: 'income' | 'expense';
  onChange: (type: 'income' | 'expense') => void;
  className?: string;
}

export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  type,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl ${className}`}>
      <button 
        type="button" 
        onClick={() => onChange('expense')} 
        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
          type === 'expense' 
            ? 'bg-white dark:bg-slate-700 shadow-sm text-rose-500' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
      >
        Expense
      </button>
      <button 
        type="button" 
        onClick={() => onChange('income')} 
        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
          type === 'income' 
            ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-500' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
      >
        Income
      </button>
    </div>
  );
};