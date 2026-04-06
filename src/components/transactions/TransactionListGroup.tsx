import React from 'react';
import { TransactionListItem } from './TransactionListItem';
import type { Transaction } from '../../types';

interface TransactionListGroupProps {
  dateStr: string;
  transactions: Transaction[];
  isAdmin: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionListGroup: React.FC<TransactionListGroupProps> = ({
  dateStr,
  transactions,
  isAdmin,
  onEdit,
  onDelete
}) => {
  return (
    <div>
      {/* Date Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl px-6 py-2.5 sticky top-0 z-10 flex items-center">
        <h3 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {dateStr}
        </h3>
      </div>
      
      {/* Transaction Items */}
      <div className="flex flex-col">
        {transactions.map((transaction, index) => (
          <TransactionListItem
            key={transaction.id}
            transaction={transaction}
            index={index}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};