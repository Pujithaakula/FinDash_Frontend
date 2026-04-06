import React from 'react';
import { TransactionSearch } from './TransactionSearch';
import { TransactionTypeFilter } from './TransactionTypeFilter';
import { TransactionDateFilter } from './TransactionDateFilter';
import { TransactionSort } from './TransactionSort';
import { TransactionCategoryFilter } from './TransactionCategoryFilter';
import { TransactionFilterSummary } from './TransactionFilterSummary';

interface DateRange {
  start: string;
  end: string;
}

interface FilterTotals {
  income: number;
  expense: number;
}

interface TransactionFiltersProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  
  // Type Filter
  filterType: 'all' | 'income' | 'expense';
  onTypeChange: (type: 'all' | 'income' | 'expense') => void;
  
  // Date Filter
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  
  // Sort
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  
  // Category Filter
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearCategories: () => void;
  
  // Summary
  isFilteringActive: boolean;
  filteredCount: number;
  filteredTotals: FilterTotals;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterType,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  sortBy,
  onSortChange,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
  isFilteringActive,
  filteredCount,
  filteredTotals
}) => {
  return (
    <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700 flex flex-col gap-4 sm:gap-5 bg-white dark:bg-slate-800">
      {/* Search and Controls Row */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <TransactionSearch
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:flex-nowrap">
          <TransactionTypeFilter
            selectedType={filterType}
            onTypeChange={onTypeChange}
          />
          
          <TransactionDateFilter
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
          
          <TransactionSort
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
        </div>
      </div>

      {/* Category Filters */}
      <TransactionCategoryFilter
        selectedCategories={selectedCategories}
        onCategoryToggle={onCategoryToggle}
        onClearCategories={onClearCategories}
      />
      
      {/* Filter Summary */}
      <TransactionFilterSummary
        isFilteringActive={isFilteringActive}
        filteredCount={filteredCount}
        filteredTotals={filteredTotals}
      />
    </div>
  );
};