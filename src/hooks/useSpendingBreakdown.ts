import { useMemo } from 'react';
import type { Transaction } from '../types';

export interface SpendingBreakdownItem {
  name: string;
  value: number;
  percentage: number;
}

export interface SpendingBreakdownData {
  items: SpendingBreakdownItem[];
  total: number;
  isEmpty: boolean;
}

export const useSpendingBreakdown = (transactions: Transaction[]): SpendingBreakdownData => {
  return useMemo(() => {
    // Filter only expense transactions
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) {
      return {
        items: [],
        total: 0,
        isEmpty: true
      };
    }

    // Group by category and calculate totals
    const categoryTotals = expenses.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    // Calculate total expenses
    const total = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

    // Convert to breakdown items with percentages
    const items: SpendingBreakdownItem[] = Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value,
        percentage: (value / total) * 100
      }))
      .sort((a, b) => b.value - a.value); // Sort by value descending

    return {
      items,
      total,
      isEmpty: false
    };
  }, [transactions]);
};