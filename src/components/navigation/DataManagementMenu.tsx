import React from 'react';
import { Database, RefreshCw, UserCircle, Trash2, LogOut } from 'lucide-react';

interface DataManagementMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onRestoreDemoData: () => void;
  onChangeProfileName: () => void;
  onClearAllData: () => void;
  onLogout: () => void;
  className?: string;
}

export const DataManagementMenu: React.FC<DataManagementMenuProps> = ({
  isOpen,
  onToggle,
  onRestoreDemoData,
  onChangeProfileName,
  onClearAllData,
  onLogout,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
        aria-label="Manage Data"
      >
        <Database size={20} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onToggle}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Data Sandbox
              </span>
            </div>
            
            <button
              onClick={onRestoreDemoData}
              className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-3"
            >
              <RefreshCw size={16} /> Restore Demo Data
            </button>
            
            <button
              onClick={onChangeProfileName}
              className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-3 border-t border-slate-100 dark:border-slate-700"
            >
              <UserCircle size={16} /> Change Profile Name
            </button>
            
            <button
              onClick={onClearAllData}
              className="w-full text-left px-4 py-3 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors flex items-center gap-3 border-t border-slate-100 dark:border-slate-700"
            >
              <Trash2 size={16} /> Clear All Data
            </button>

            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-3 border-t border-slate-100 dark:border-slate-700"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};