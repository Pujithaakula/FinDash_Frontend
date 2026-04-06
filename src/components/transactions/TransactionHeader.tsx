import React from 'react';
import { Download, Plus } from 'lucide-react';

interface TransactionHeaderProps {
  transactionCount: number;
  isAdmin: boolean;
  onExport: () => void;
  onAddNew: () => void;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  transactionCount,
  isAdmin,
  onExport,
  onAddNew
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold border border-slate-200 dark:border-slate-700">
          {transactionCount}
        </span>
      </div>
      
      {isAdmin && (
        <div className="flex gap-3 w-full sm:w-auto animate-in fade-in">
          <button 
            onClick={onExport}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-colors shadow-sm w-full sm:w-auto"
          >
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={onAddNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-colors shadow-sm w-full sm:w-auto"
          >
            <Plus size={18} />
            New
          </button>
        </div>
      )}
    </div>
  );
};