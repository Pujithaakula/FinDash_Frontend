import React from 'react';
import { TransactionListGroup } from './TransactionListGroup';
import { TransactionEmptyState } from './TransactionEmptyState';
import type { Transaction } from '../../types';

interface GroupedTransactions {
  [dateStr: string]: Transaction[];
}

interface TransactionListProps {
  groupedTransactions: GroupedTransactions;
  isAdmin: boolean;
  hasSearchQuery: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onClearSearch: () => void;
}

export const TransactionListView: React.FC<TransactionListProps> = ({
  groupedTransactions,
  isAdmin,
  hasSearchQuery,
  onEdit,
  onDelete,
  onClearSearch
}) => {
  const hasTransactions = Object.keys(groupedTransactions).length > 0;

  return (
    <div className="max-h-[600px] overflow-y-auto custom-scrollbar bg-white dark:bg-slate-800">
      {hasTransactions ? (
        Object.entries(groupedTransactions).map(([dateStr, transactions]) => (
          <TransactionListGroup
            key={dateStr}
            dateStr={dateStr}
            transactions={transactions}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <TransactionEmptyState
          hasSearchQuery={hasSearchQuery}
          onClearSearch={onClearSearch}
        />
      )}
    </div>
  );
};