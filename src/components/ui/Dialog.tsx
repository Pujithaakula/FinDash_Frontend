import React from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-4 sm:p-0 animate-in fade-in duration-200">
      <div className={`bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300 ${className}`}>
        {title && (
          <div className="px-6 pt-6 pb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <button 
              onClick={onClose} 
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-full transition-colors"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
        )}
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};