import { useMemo } from 'react';
import type { Transaction } from '../types';

export interface BalanceTrendPoint {
  id: string;
  label: string;
  date: string;
  income: number;
  expense: number;
  balance: number;
  cumulativeBalance: number;
}

export interface BalanceTrendData {
  points: BalanceTrendPoint[];
  minBalance: number;
  maxBalance: number;
  totalRange: number;
  isEmpty: boolean;
}

export const useBalanceTrend = (transactions: Transaction[]): BalanceTrendData => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        points: [],
        minBalance: 0,
        maxBalance: 0,
        totalRange: 0,
        isEmpty: true
      };
    }

    // Group transactions by month
    const monthlyData: Record<string, { income: number; expense: number; date: string }> = {};

    transactions.forEach(transaction => {
      const dateKey = transaction.date.substring(0, 7); // YYYY-MM format
      
      if (!monthlyData[dateKey]) {
        monthlyData[dateKey] = { 
          income: 0, 
          expense: 0, 
          date: transaction.date.substring(0, 7) + '-01'
        };
      }
      
      if (transaction.type === 'income') {
        monthlyData[dateKey].income += transaction.amount;
      } else {
        monthlyData[dateKey].expense += transaction.amount;
      }
    });

    // Sort months chronologically and calculate cumulative balance
    const sortedMonths = Object.keys(monthlyData).sort();
    let cumulativeBalance = 0;
    
    const points: BalanceTrendPoint[] = sortedMonths.map(monthKey => {
      const monthData = monthlyData[monthKey];
      const monthlyBalance = monthData.income - monthData.expense;
      cumulativeBalance += monthlyBalance;
      
      // Format label (e.g., "Jan 26")
      const date = new Date(monthData.date + 'T00:00:00Z');
      const label = date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: '2-digit' 
      });

      return {
        id: monthKey,
        label,
        date: monthData.date,
        income: monthData.income,
        expense: monthData.expense,
        balance: monthlyBalance,
        cumulativeBalance
      };
    });

    // Calculate min/max for scaling
    const balances = points.map(p => p.cumulativeBalance);
    const minBalance = Math.min(...balances);
    const maxBalance = Math.max(...balances);
    const totalRange = maxBalance - minBalance;

    return {
      points,
      minBalance,
      maxBalance,
      totalRange: totalRange || 1000, // Prevent division by zero
      isEmpty: false
    };
  }, [transactions]);
};