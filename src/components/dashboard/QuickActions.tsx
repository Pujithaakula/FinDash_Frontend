import React from 'react';
import { Plus, Receipt, TrendingUp, Download } from 'lucide-react';

interface QuickActionsProps {
  onAddNew: () => void;
  onViewHistory: () => void;
  onViewInsights: () => void;
  onExport: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddNew,
  onViewHistory,
  onViewInsights,
  onExport
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <button 
        onClick={onAddNew}
        className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-500/10 dark:to-indigo-600/10 rounded-2xl shadow-sm border border-indigo-200 dark:border-indigo-700 hover:shadow-lg hover:scale-105 transition-all group"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md">
          <Plus size={22} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Add New</span>
        <span className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Transaction</span>
      </button>
      
      <button 
        onClick={onViewHistory}
        className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 rounded-2xl shadow-sm border border-blue-200 dark:border-blue-700 hover:shadow-lg hover:scale-105 transition-all group"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md">
          <Receipt size={22} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">History</span>
        <span className="text-xs text-blue-600/70 dark:text-blue-400/70">All Records</span>
      </button>
      
      <button 
        onClick={onViewInsights}
        className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-600/10 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-700 hover:shadow-lg hover:scale-105 transition-all group"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md">
          <TrendingUp size={22} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Insights</span>
        <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70">AI Analysis</span>
      </button>
      
      <button 
        onClick={onExport}
        className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:scale-105 transition-all group"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md">
          <Download size={22} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Export</span>
        <span className="text-xs text-slate-600/70 dark:text-slate-400/70">CSV Data</span>
      </button>
    </div>
  );
};
