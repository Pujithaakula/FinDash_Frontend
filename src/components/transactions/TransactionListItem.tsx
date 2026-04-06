import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../../constants/categories';
import type { Transaction } from '../../types';

interface TransactionListItemProps {
  transaction: Transaction;
  index: number;
  isAdmin: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
  index,
  isAdmin,
  onEdit,
  onDelete
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const IconComponent = CATEGORY_ICONS[transaction.category as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.Other;
  const colorClass = CATEGORY_COLORS[transaction.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.Other;
  const isIncome = transaction.type === 'income';
  const animDelay = `${index * 40}ms`;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div 
      style={{ animationDelay: animDelay, animationFillMode: 'both' }}
      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr] items-center px-4 sm:px-6 py-3.5 border-b border-slate-50 dark:border-slate-700/30 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors gap-3 sm:gap-4 animate-in slide-in-from-bottom-2 fade-in duration-300"
    >
      {/* Transaction Info */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${colorClass.replace('bg-', 'bg-opacity-10 dark:bg-opacity-20 text-').replace('text-opacity-10', '')} ${colorClass.replace('bg-', 'text-')}`}>
          <IconComponent size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col truncate pr-2 sm:pr-4">
          <span className="font-medium text-slate-800 dark:text-slate-100 text-sm sm:text-[15px] tracking-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {transaction.description}
          </span>
          <div className="flex sm:hidden items-center mt-0.5">
            <span className="text-xs sm:text-[13px] text-slate-400 dark:text-slate-500">
              {transaction.category}
            </span>
          </div>
        </div>
      </div>

      {/* Category (Desktop) */}
      <div className="hidden sm:flex items-center justify-start text-slate-400 dark:text-slate-500 text-[13px] gap-2">
        <IconComponent size={14} strokeWidth={1.5} className="opacity-70" />
        <span>{transaction.category}</span>
      </div>

      {/* Amount and Actions */}
      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <div className="text-right">
          <span className={`block font-semibold text-sm sm:text-[16px] tracking-tight ${isIncome ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
            {isIncome ? '+' : '-'}<FormatCurrency amount={transaction.amount} />
          </span>
        </div>
        
        {isAdmin && (
          <>
            {/* Desktop: Direct Edit/Delete Buttons */}
            <div className="hidden sm:flex justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit(transaction)}
                className="p-1.5 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 dark:text-slate-600 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                title="Edit Transaction"
              >
                <Edit2 size={16} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => onDelete(transaction.id)}
                className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:text-slate-600 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                title="Delete Transaction"
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile: 3-Dot Menu */}
            <div className="relative sm:hidden" ref={menuRef}>
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                title="More Options"
              >
                <MoreVertical size={18} strokeWidth={1.5} />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => {
                      onEdit(transaction);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                  >
                    <Edit2 size={16} strokeWidth={1.5} className="text-indigo-500" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(transaction.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors border-t border-slate-100 dark:border-slate-700"
                  >
                    <Trash2 size={16} strokeWidth={1.5} className="text-rose-500" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};