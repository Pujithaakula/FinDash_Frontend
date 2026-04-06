import React from 'react';

interface DateSelectorProps {
  date: string;
  onChange: (date: string) => void;
  className?: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  date,
  onChange,
  className = ''
}) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const getButtonClass = (targetDate: string) => {
    const isSelected = date === targetDate;
    return `flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
      isSelected 
        ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400' 
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
    }`;
  };

  const getDateInputClass = () => {
    const isCustomDate = date !== today && date !== yesterday;
    return `w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all border outline-none h-full appearance-none ${
      isCustomDate 
        ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400' 
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
    }`;
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button 
        type="button" 
        onClick={() => onChange(today)} 
        className={getButtonClass(today)}
      >
        Today
      </button>
      
      <button 
        type="button" 
        onClick={() => onChange(yesterday)} 
        className={getButtonClass(yesterday)}
      >
        Yesterday
      </button>
      
      <div className="flex-1 relative">
        <input 
          type="date" 
          value={date} 
          onChange={(e) => onChange(e.target.value)} 
          className={getDateInputClass()}
        />
      </div>
    </div>
  );
};