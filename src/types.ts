export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface AppState {
  userName: string;
  transactions: Transaction[];
  darkMode: boolean;
  role: 'admin' | 'viewer';
  activeTab: 'dashboard' | 'insights' | 'transactions';
  searchQuery: string;
  filterType: 'all' | 'income' | 'expense';
  selectedCategories: string[];
  sortBy: string;
  dateRange: { start: string; end: string };
}

export interface FinancialData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrend: MonthlyTrend[];
  insights: Insights;
  advancedInsights: AdvancedInsights;
}

export interface CategoryBreakdown {
  name: string;
  value: number;
  percentage: number;
}

export interface MonthlyTrend {
  id: string;
  label: string;
  income: number;
  expense: number;
  balance: number;
}

export interface Insights {
  topCategory: CategoryBreakdown | null;
  largestTransaction: Transaction | null;
  monthOverMonthStr: string;
}

export interface AdvancedInsights {
  savingsRate: number;
  aiMessage: string;
  mostFrequentCategoryName: string | null;
  mostFrequentCategoryCount: number;
  avgExpense: number;
  totalExpenseTransactions: number;
  topCategory: CategoryBreakdown | null;
  largestExpense: Transaction | null;
  weekendPct: number;
  weekdayPct: number;
  spenderPersona: string;
  dominanceRatio: number;
  dailyBurnRate: number;
}

export type CategoryType = 'Housing' | 'Food' | 'Transport' | 'Utilities' | 'Entertainment' | 'Health' | 'Salary' | 'Freelance' | 'Other';