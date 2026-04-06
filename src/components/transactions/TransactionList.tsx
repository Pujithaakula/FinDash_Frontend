import React from 'react';
import { TransactionItem } from './TransactionItem';
import type { Transaction } from '../../types';

interface TransactionListProps {
  transactions: Transaction[];
  emptyMessage?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  emptyMessage = "No transactions"
}) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};