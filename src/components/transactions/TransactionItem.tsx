import React from 'react';
import { FormatCurrency } from '../ui/FormatCurrency';
import { getCategoryColor, getCategoryIcon } from '../../lib/categoryUtils';
import { formatShortDate } from '../../lib/dateUtils';
import type { Transaction } from '../../types';

interface TransactionItemProps {
  transaction: Transaction;
  className?: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  className = ''
}) => {
  const IconComponent = getCategoryIcon(transaction.category);
  const colorClass = getCategoryColor(transaction.category);
  const isIncome = transaction.type === 'income';

  return (
    <div className={`flex items-center justify-between py-3.5 group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl transition-colors ${className}`}>
      <div className="flex items-center gap-4 min-w-0">
        {/* Category Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${colorClass.replace('bg-', 'bg-opacity-10 dark:bg-opacity-20 text-').replace('text-opacity-10', '')} ${colorClass.replace('bg-', 'text-')}`}>
          <IconComponent size={18} strokeWidth={1.5} />
        </div>
        
        {/* Transaction Details */}
        <div className="flex flex-col truncate pr-4">
          <span className="font-semibold text-slate-900 dark:text-slate-100 text-[15px] truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {transaction.description}
          </span>
          <span className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
            {formatShortDate(transaction.date)} • {transaction.category}
          </span>
        </div>
      </div>
      
      {/* Amount */}
      <div className="text-right shrink-0">
        <span className={`block font-bold text-[15px] ${
          isIncome 
            ? 'text-emerald-500 dark:text-emerald-400' 
            : 'text-slate-900 dark:text-white'
        }`}>
          {isIncome ? '+' : '-'}<FormatCurrency amount={transaction.amount} />
        </span>
      </div>
    </div>
  );
};