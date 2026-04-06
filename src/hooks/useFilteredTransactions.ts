import { useMemo } from 'react';
import { type Transaction } from '../contexts/AppContext';

interface FilterOptions {
  searchQuery: string;
  filterType: 'all' | 'income' | 'expense';
  selectedCategories: string[];
  sortBy: string;
  dateRange: { start: string; end: string };
}

export function useFilteredTransactions(transactions: Transaction[], filters: FilterOptions) {
  const { searchQuery, filterType, selectedCategories, sortBy, dateRange } = filters;

  const filteredTransactions = useMemo(() => {
    let result = transactions
      .filter(t => filterType === 'all' || t.type === filterType)
      .filter(t => selectedCategories.length === 0 || selectedCategories.includes(t.category))
      .filter(t => {
        if (dateRange.start && t.date < dateRange.start) return false;
        if (dateRange.end && t.date > dateRange.end) return false;
        return true;
      })
      .filter(t => 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (sortBy === 'date-desc') result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sortBy === 'date-asc') result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sortBy === 'amount-desc') result.sort((a, b) => b.amount - a.amount);
    if (sortBy === 'amount-asc') result.sort((a, b) => a.amount - b.amount);

    return result;
  }, [transactions, searchQuery, filterType, selectedCategories, sortBy, dateRange]);

  const filteredTotals = useMemo(() => {
    return filteredTransactions.reduce((acc, curr) => {
      if (curr.type === 'income') acc.income += curr.amount;
      else acc.expense += curr.amount;
      return acc;
    }, { income: 0, expense: 0 });
  }, [filteredTransactions]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    filteredTransactions.forEach(tx => {
      const dateObj = new Date(tx.date + 'T00:00:00Z');
      const dateStr = dateObj.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        timeZone: 'UTC'
      });
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(tx);
    });
    return groups;
  }, [filteredTransactions]);

  const isFilteringActive = searchQuery !== '' || filterType !== 'all' || selectedCategories.length > 0 || dateRange.start !== '' || dateRange.end !== '';

  return {
    filteredTransactions,
    filteredTotals,
    groupedTransactions,
    isFilteringActive
  };
}