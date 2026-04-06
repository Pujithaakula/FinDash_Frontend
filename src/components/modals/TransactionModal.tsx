import React from 'react';
import { X } from 'lucide-react';
// import { Dialog } from '../ui/Dialog';
import { TransactionForm } from '../forms';
import type { Transaction } from '../../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction | null;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}) => {
  if (!isOpen) return null;

  const handleSubmit = (data: Omit<Transaction, 'id'>) => {
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-4 sm:p-0 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {initialData ? 'Edit Transaction' : 'New Transaction'}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
};