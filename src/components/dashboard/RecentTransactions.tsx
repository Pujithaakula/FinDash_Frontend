import React from 'react';
import { CreditCard, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { TransactionList } from '../transactions';
import { useRecentTransactions } from '../../hooks/useRecentTransactions';
import { useNavigation } from '../../hooks/useNavigation';
import type { Transaction } from '../../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
  limit?: number;
  className?: string;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  limit = 4,
  className = ''
}) => {
  const { navigateTo } = useNavigation();
  const { transactions: recentTransactions } = useRecentTransactions(transactions, limit);

  const handleViewAll = () => {
    navigateTo('transactions');
  };

  return (
    <Card className={`shadow-md border-slate-200/60 dark:border-slate-700/60 flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="text-indigo-500" size={20} />
            Recent Transactions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your latest financial activity
          </p>
        </div>
        <button 
          onClick={handleViewAll}
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight size={16} />
        </button>
      </div>
      
      {/* Transaction List */}
      <div className="flex-1 flex flex-col justify-center">
        <TransactionList 
          transactions={recentTransactions}
          emptyMessage="No recent transactions"
        />
      </div>
    </Card>
  );
};