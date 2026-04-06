import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Types
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

// Initial data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-04-05', description: 'Groceries', amount: 200, category: 'Food', type: 'expense' },
  { id: '2', date: '2026-04-01', description: 'TechCorp Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '3', date: '2026-03-15', description: 'Car Repair', amount: 600, category: 'Transport', type: 'expense' },
  { id: '4', date: '2026-03-01', description: 'TechCorp Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '5', date: '2026-02-14', description: 'Valentine Dinner', amount: 200, category: 'Food', type: 'expense' },
  { id: '6', date: '2026-02-01', description: 'TechCorp Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '7', date: '2026-01-20', description: 'Gym Membership', amount: 50, category: 'Health', type: 'expense' },
  { id: '8', date: '2026-01-01', description: 'TechCorp Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '9', date: '2025-12-24', description: 'Holiday Gifts', amount: 800, category: 'Entertainment', type: 'expense' },
  { id: '10', date: '2025-12-01', description: 'TechCorp Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '11', date: '2025-11-10', description: 'Freelance Project', amount: 1200, category: 'Freelance', type: 'income' },
  { id: '12', date: '2025-11-01', description: 'TechCorp Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: '13', date: '2025-10-20', description: 'Utilities', amount: 100, category: 'Utilities', type: 'expense' },
  { id: '14', date: '2025-10-15', description: 'Rent', amount: 1500, category: 'Housing', type: 'expense' },
  { id: '15', date: '2025-10-01', description: 'TechCorp Salary', amount: 5200, category: 'Salary', type: 'income' }
];

// Action types
type AppAction =
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: { id: string; data: Partial<Transaction> } }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'SET_ROLE'; payload: 'admin' | 'viewer' }
  | { type: 'SET_ACTIVE_TAB'; payload: 'dashboard' | 'insights' | 'transactions' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTER_TYPE'; payload: 'all' | 'income' | 'expense' }
  | { type: 'SET_SELECTED_CATEGORIES'; payload: string[] }
  | { type: 'SET_SORT_BY'; payload: string }
  | { type: 'SET_DATE_RANGE'; payload: { start: string; end: string } }
  | { type: 'RESET_FILTERS' };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        )
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTER_TYPE':
      return { ...state, filterType: action.payload };
    case 'SET_SELECTED_CATEGORIES':
      return { ...state, selectedCategories: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'RESET_FILTERS':
      return {
        ...state,
        searchQuery: '',
        filterType: 'all',
        selectedCategories: [],
        dateRange: { start: '', end: '' }
      };
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    setUserName: (name: string) => void;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateTransaction: (id: string, data: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    toggleDarkMode: () => void;
    setRole: (role: 'admin' | 'viewer') => void;
    setActiveTab: (tab: 'dashboard' | 'insights' | 'transactions') => void;
    setSearchQuery: (query: string) => void;
    setFilterType: (type: 'all' | 'income' | 'expense') => void;
    setSelectedCategories: (categories: string[]) => void;
    toggleCategoryFilter: (category: string) => void;
    setSortBy: (sortBy: string) => void;
    setDateRange: (range: { start: string; end: string }) => void;
    resetFilters: () => void;
    restoreDemoData: () => void;
    clearAllData: () => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage values
  const [userName, setUserNameLS] = useLocalStorage('finance_user_name', '');
  const [transactions, setTransactionsLS] = useLocalStorage('finance_transactions', INITIAL_TRANSACTIONS);
  const [darkMode, setDarkModeLS] = useLocalStorage('finance_dark_mode', true); // Dark mode as default

  const initialState: AppState = {
    userName,
    transactions,
    darkMode,
    role: 'admin',
    activeTab: 'dashboard',
    searchQuery: '',
    filterType: 'all',
    selectedCategories: [],
    sortBy: 'date-desc',
    dateRange: { start: '', end: '' }
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync with localStorage and apply dark mode class
  useEffect(() => {
    setUserNameLS(state.userName);
  }, [state.userName, setUserNameLS]);

  useEffect(() => {
    setTransactionsLS(state.transactions);
  }, [state.transactions, setTransactionsLS]);

  useEffect(() => {
    setDarkModeLS(state.darkMode);
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode, setDarkModeLS]);

  // Action creators
  const actions = {
    setUserName: (name: string) => dispatch({ type: 'SET_USER_NAME', payload: name }),
    
    addTransaction: (transactionData: Omit<Transaction, 'id'>) => {
      const transaction: Transaction = {
        ...transactionData,
        id: Date.now().toString()
      };
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    },
    
    updateTransaction: (id: string, data: Partial<Transaction>) => {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, data } });
    },
    
    deleteTransaction: (id: string) => {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    },
    
    toggleDarkMode: () => {
      dispatch({ type: 'SET_DARK_MODE', payload: !state.darkMode });
    },
    
    setRole: (role: 'admin' | 'viewer') => {
      dispatch({ type: 'SET_ROLE', payload: role });
    },
    
    setActiveTab: (tab: 'dashboard' | 'insights' | 'transactions') => {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
    },
    
    setSearchQuery: (query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    },
    
    setFilterType: (type: 'all' | 'income' | 'expense') => {
      dispatch({ type: 'SET_FILTER_TYPE', payload: type });
    },
    
    setSelectedCategories: (categories: string[]) => {
      dispatch({ type: 'SET_SELECTED_CATEGORIES', payload: categories });
    },
    
    toggleCategoryFilter: (category: string) => {
      const newCategories = state.selectedCategories.includes(category)
        ? state.selectedCategories.filter(c => c !== category)
        : [...state.selectedCategories, category];
      dispatch({ type: 'SET_SELECTED_CATEGORIES', payload: newCategories });
    },
    
    setSortBy: (sortBy: string) => {
      dispatch({ type: 'SET_SORT_BY', payload: sortBy });
    },
    
    setDateRange: (range: { start: string; end: string }) => {
      dispatch({ type: 'SET_DATE_RANGE', payload: range });
    },
    
    resetFilters: () => {
      dispatch({ type: 'RESET_FILTERS' });
    },
    
    restoreDemoData: () => {
      dispatch({ type: 'SET_TRANSACTIONS', payload: INITIAL_TRANSACTIONS });
    },
    
    clearAllData: () => {
      dispatch({ type: 'SET_TRANSACTIONS', payload: [] });
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}