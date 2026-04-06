import { useMemo } from 'react';
import type { Transaction } from '../types';

export interface FinancialInsight {
  id: string;
  title: string;
  value: string;
  description: string;
  type: 'positive' | 'neutral' | 'warning';
  icon: 'trend' | 'category' | 'frequency' | 'savings';
}

export interface FinancialInsightsData {
  insights: FinancialInsight[];
  primaryInsight: FinancialInsight | null;
  isEmpty: boolean;
}

export const useFinancialInsights = (transactions: Transaction[]): FinancialInsightsData => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        insights: [],
        primaryInsight: null,
        isEmpty: true
      };
    }

    const insights: FinancialInsight[] = [];
    
    // Calculate basic metrics
    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    
    // 1. Savings Rate Insight
    if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      let type: 'positive' | 'neutral' | 'warning' = 'neutral';
      let description = 'Your current savings rate';
      
      if (savingsRate > 20) {
        type = 'positive';
        description = 'Excellent savings rate!';
      } else if (savingsRate < 0) {
        type = 'warning';
        description = 'Spending exceeds income';
      }
      
      insights.push({
        id: 'savings-rate',
        title: 'Savings Rate',
        value: `${Math.abs(savingsRate).toFixed(1)}%`,
        description,
        type,
        icon: 'savings'
      });
    }

    // 2. Top Spending Category
    if (expenses.length > 0) {
      const categoryTotals: Record<string, number> = {};
      expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });
      
      const topCategory = Object.entries(categoryTotals)
        .sort(([,a], [,b]) => b - a)[0];
      
      if (topCategory) {
        const percentage = ((topCategory[1] / totalExpenses) * 100).toFixed(0);
        insights.push({
          id: 'top-category',
          title: 'Top Category',
          value: topCategory[0],
          description: `${percentage}% of your expenses`,
          type: 'neutral',
          icon: 'category'
        });
      }
    }

    // 3. Transaction Frequency
    if (transactions.length > 0) {
      const avgPerDay = transactions.length / 30; // Assuming 30-day period
      let description = 'transactions per day';
      let type: 'positive' | 'neutral' | 'warning' = 'neutral';
      
      if (avgPerDay > 3) {
        type = 'warning';
        description = 'High transaction frequency';
      } else if (avgPerDay < 1) {
        type = 'positive';
        description = 'Low transaction frequency';
      }
      
      insights.push({
        id: 'frequency',
        title: 'Activity',
        value: `${avgPerDay.toFixed(1)}/day`,
        description,
        type,
        icon: 'frequency'
      });
    }

    // 4. Monthly Trend
    const currentMonth = new Date().toISOString().substring(0, 7);
    const currentMonthExpenses = expenses
      .filter(t => t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
    
    if (currentMonthExpenses > 0) {
      const dailyAverage = currentMonthExpenses / new Date().getDate();
      insights.push({
        id: 'daily-average',
        title: 'Daily Average',
        value: `$${dailyAverage.toFixed(0)}`,
        description: 'This month\'s spending',
        type: 'neutral',
        icon: 'trend'
      });
    }

    // Select primary insight (most important one)
    const primaryInsight = insights.find(i => i.type === 'warning') || 
                          insights.find(i => i.type === 'positive') || 
                          insights[0] || null;

    return {
      insights,
      primaryInsight,
      isEmpty: false
    };
  }, [transactions]);
};