import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';

interface DateRange {
  start: string;
  end: string;
}

interface TransactionDateFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export const TransactionDateFilter: React.FC<TransactionDateFilterProps> = ({
  dateRange,
  onDateRangeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatShortDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDateRangeText = () => {
    if (dateRange.start && dateRange.end) {
      if (dateRange.start === dateRange.end) return formatShortDate(dateRange.start);
      return `${formatShortDate(dateRange.start)} - ${formatShortDate(dateRange.end)}`;
    }
    if (dateRange.start) return `From ${formatShortDate(dateRange.start)}`;
    if (dateRange.end) return `Until ${formatShortDate(dateRange.end)}`;
    return 'All Time';
  };

  const clearDateRange = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateRangeChange({ start: '', end: '' });
  };

  const hasDateFilter = dateRange.start || dateRange.end;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-xl border transition-all h-full ${
          hasDateFilter
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400'
            : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <Calendar size={16} />
        {getDateRangeText()}
        {hasDateFilter && (
          <div 
            className="ml-1 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 bg-indigo-100/50 dark:bg-indigo-500/20 rounded-full p-0.5 transition-colors"
            onClick={clearDateRange}
          >
            <X size={12} strokeWidth={3} />
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full mt-2 right-0 sm:left-0 z-30 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Filter by Date</h4>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  From
                </label>
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={e => onDateRangeChange({ ...dateRange, start: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200 transition-shadow"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  To (Optional)
                </label>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={e => onDateRangeChange({ ...dateRange, end: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200 transition-shadow"
                />
              </div>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
              <button 
                onClick={() => { 
                  onDateRangeChange({ start: '', end: '' }); 
                  setIsOpen(false); 
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                Clear
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};