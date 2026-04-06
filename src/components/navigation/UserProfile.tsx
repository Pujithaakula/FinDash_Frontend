import React, { useState } from 'react';
import { LogOut } from 'lucide-react';

interface UserProfileProps {
  userName: string;
  onLogout: () => void;
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  onLogout,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`hidden sm:flex items-center gap-2.5 relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-2 py-1 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">
          {userName}
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden">
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-3"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};