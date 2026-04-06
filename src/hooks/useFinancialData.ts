import { useMemo } from 'react';
import { type Transaction } from '../contexts/AppContext';

export interface FinancialInsights {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryBreakdown: Array<{ name: string; value: number; percentage: number }>;
  monthlyTrend: Array<{
    id: string;
    label: string;
    income: number;
    expense: number;
    balance: number;
  }>;
  insights: {
    topCategory: { name: string; value: number } | null;
    largestTransaction: Transaction | null;
    monthOverMonthStr: string;
  };
  advancedInsights: {
    savingsRate: number;
    aiMessage: string;
    mostFrequentCategoryName: string | null;
    mostFrequentCategoryCount: number;
    avgExpense: number;
    totalExpenseTransactions: number;
    topCategory: { name: string; value: number } | null;
    largestExpense: Transaction | null;
    weekendPct: number;
    weekdayPct: number;
    spenderPersona: string;
    dominanceRatio: number;
    dailyBurnRate: number;
  };
}

export function useFinancialData(transactions: Transaction[], userName: string): FinancialInsights {
  return useMemo(() => {
    let inc = 0;
    let exp = 0;
    const catTotals: Record<string, number> = {};
    const monthlyData: Record<string, { income: number; expense: number; label: string }> = {};
    const expenseTxs: Transaction[] = [];
    const catCounts: Record<string, number> = {};
    let weekendExp = 0;
    let weekdayExp = 0;

    transactions.forEach(t => {
      const amount = parseFloat(t.amount.toString());
      if (t.type === 'income') inc += amount;
      if (t.type === 'expense') {
        exp += amount;
        expenseTxs.push(t);
        catTotals[t.category] = (catTotals[t.category] || 0) + amount;
        catCounts[t.category] = (catCounts[t.category] || 0) + 1;
        
        const day = new Date(t.date + 'T00:00:00Z').getUTCDay();
        if (day === 0 || day === 6) {
          weekendExp += amount;
        } else {
          weekdayExp += amount;
        }
      }

      const dateKey = t.date.substring(0, 7);
      if (!monthlyData[dateKey]) {
        const d = new Date(t.date + 'T00:00:00Z');
        monthlyData[dateKey] = { 
          income: 0, 
          expense: 0, 
          label: d.toLocaleString('default', { month: 'short', year: '2-digit' }) 
        };
      }
      monthlyData[dateKey][t.type] += amount;
    });

    const sortedCategories = Object.entries(catTotals)
      .map(([name, value]) => ({ name, value, percentage: (value / exp) * 100 }))
      .sort((a, b) => b.value - a.value);

    const sortedMonths = Object.keys(monthlyData).sort();
    let cumulativeBalance = 0;
    
    const trend = sortedMonths.map(key => {
      const month = monthlyData[key];
      cumulativeBalance += (month.income - month.expense);
      return { 
        id: key, 
        label: month.label, 
        income: month.income,
        expense: month.expense, 
        balance: cumulativeBalance 
      };
    });

    const topCategory = sortedCategories.length > 0 ? sortedCategories[0] : null;
    const largestTransaction = [...transactions]
      .filter(t => t.type === 'expense')
      .sort((a, b) => b.amount - a.amount)[0];

    const savingsRate = inc > 0 ? ((inc - exp) / inc) * 100 : (exp > 0 ? -100 : 0);
    const mostFrequentCategoryName = Object.keys(catCounts).sort((a,b) => catCounts[b] - catCounts[a])[0];
    const mostFrequentCategoryCount = mostFrequentCategoryName ? catCounts[mostFrequentCategoryName] : 0;
    const avgExpense = exp > 0 ? exp / expenseTxs.length : 0;

    const txDates = transactions.map(t => new Date(t.date).getTime());
    const minDate = txDates.length > 0 ? Math.min(...txDates) : Date.now();
    const maxDate = txDates.length > 0 ? Math.max(...txDates) : Date.now();
    const daysDiff = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)));
    const dailyBurnRate = exp > 0 ? exp / daysDiff : 0;

    const weekendPct = exp > 0 ? (weekendExp / exp) * 100 : 0;
    const weekdayPct = exp > 0 ? (weekdayExp / exp) * 100 : 0;
    const spenderPersona = weekendPct > 50 ? 'Weekend Warrior' : 'Weekday Spender';
    const dominanceRatio = topCategory && exp > 0 ? (topCategory.value / exp) * 100 : 0;

    let aiMessage = `Hi ${userName || 'there'}, add more transactions to unlock personalized insights and financial guidance.`;
    if (savingsRate > 20) {
      aiMessage = `Excellent financial health, ${userName}! You are saving a solid, highly recommended portion of your income.`;
    } else if (savingsRate > 0 && savingsRate <= 20) {
      aiMessage = `You're spending within your means, ${userName}. Identifying small cutbacks could boost your savings rate.`;
    } else if (savingsRate < 0) {
      aiMessage = `Action required, ${userName}: Your expenses exceeded your income. Review your top spending areas below to course correct.`;
    }

    const currentMonthKey = sortedMonths[sortedMonths.length - 1];
    const prevMonthKey = sortedMonths[sortedMonths.length - 2];
    let monthOverMonthStr = "Not enough monthly data to compare yet.";
    if (currentMonthKey && prevMonthKey) {
      const currExp = monthlyData[currentMonthKey].expense;
      const prevExp = monthlyData[prevMonthKey].expense;
      if (prevExp > 0) {
        const diff = ((currExp - prevExp) / prevExp) * 100;
        monthOverMonthStr = `Spending is ${Math.abs(diff).toFixed(1)}% ${diff > 0 ? 'higher' : 'lower'} this month vs last month.`;
      }
    }

    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: inc - exp,
      categoryBreakdown: sortedCategories,
      monthlyTrend: trend,
      insights: {
        topCategory,
        largestTransaction,
        monthOverMonthStr
      },
      advancedInsights: {
        savingsRate,
        aiMessage,
        mostFrequentCategoryName,
        mostFrequentCategoryCount,
        avgExpense,
        totalExpenseTransactions: expenseTxs.length,
        topCategory,
        largestExpense: largestTransaction,
        weekendPct,
        weekdayPct,
        spenderPersona,
        dominanceRatio,
        dailyBurnRate
      }
    };
  }, [transactions, userName]);
}