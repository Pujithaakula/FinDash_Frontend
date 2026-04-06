import { useMemo } from 'react';
import type { Transaction } from '../types';

export interface RecentTransactionsData {
  transactions: Transaction[];
  isEmpty: boolean;
}

export const useRecentTransactions = (
  transactions: Transaction[], 
  limit: number = 4
): RecentTransactionsData => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        transactions: [],
        isEmpty: true
      };
    }

    // Sort by date (newest first) and limit results
    const sortedTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return {
      transactions: sortedTransactions,
      isEmpty: false
    };
  }, [transactions, limit]);
};