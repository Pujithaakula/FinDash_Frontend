import React, { useState } from 'react';
import { 
  BarChart3, 
  Wallet,
  TrendingUp,
  Eye,
  Shield,
  Sparkles
} from 'lucide-react';
import { useApp, type Transaction } from '../../contexts/AppContext';
import { useFinancialData } from '../../hooks/useFinancialData';
import { useToast } from '../../hooks/useToast';
import { useNavigation } from '../../hooks/useNavigation';
import { Card } from '../ui/Card';
import { TransactionModal } from '../modals/TransactionModal';
import { 
  HeroBalanceCard, 
  SpendingBreakdown, 
  BalanceTrend, 
  RecentTransactions, 
  FinancialInsights,
  QuickActions,
  BudgetProgress
} from '../dashboard';
import { Toast } from '../ui/Toast';

export const DashboardView: React.FC = () => {
  const { state, actions } = useApp();
  const { toast, showToast, hideToast } = useToast();
  const { navigateTo } = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const financialData = useFinancialData(state.transactions, state.userName);
  const isAdmin = state.role === 'admin';

  const handleExportCSV = () => {
    if (!isAdmin) return;
    
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...state.transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'finance_export.csv';
    link.click();
    showToast('Data exported successfully');
  };

  const handleSaveTransaction = (txData: any) => {
    if (!isAdmin) return;
    
    if (editingTransaction) {
      actions.updateTransaction(editingTransaction.id, txData);
      showToast('Transaction updated successfully');
    } else {
      actions.addTransaction(txData);
      showToast('New transaction added');
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Role Badge */}
      <div className={`${isAdmin 
        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800' 
        : 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800'
      } border p-4 rounded-2xl flex items-center justify-between gap-3 text-sm animate-in fade-in slide-in-from-top-2`}>
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <>
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
                <Shield size={20} />
              </div>
              <div>
                <p className="font-bold text-indigo-900 dark:text-indigo-200">Admin Mode Active</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-400">Full access to all features and data management</p>
              </div>
            </>
          ) : (
            <>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white shadow-lg">
                <Eye size={20} />
              </div>
              <div>
                <p className="font-bold text-blue-900 dark:text-blue-200">Viewer Mode</p>
                <p className="text-xs text-blue-700 dark:text-blue-400">Read-only access with enhanced insights and analytics</p>
              </div>
            </>
          )}
        </div>
        {!isAdmin && (
          <Sparkles size={20} className="text-blue-500 dark:text-blue-400 animate-pulse" />
        )}
      </div>

      {/* Financial Summary Cards */}
      <HeroBalanceCard 
        balance={financialData.balance}
        totalIncome={financialData.totalIncome}
        totalExpense={financialData.totalExpense}
      />

      {/* Admin: Quick Action Buttons */}
      {isAdmin && (
        <QuickActions
          onAddNew={() => { setEditingTransaction(null); setIsModalOpen(true); }}
          onViewHistory={() => navigateTo('transactions')}
          onViewInsights={() => navigateTo('insights')}
          onExport={handleExportCSV}
        />
      )}

      {/* Viewer: Enhanced Insights Banner */}
      {!isAdmin && (
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl shadow-xl p-6 text-white animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI-Powered Insights</h3>
              <p className="text-blue-100 text-sm">Discover patterns and optimize your finances</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-blue-100 mb-1">Savings Rate</p>
              <p className="text-2xl font-bold">{financialData.advancedInsights.savingsRate.toFixed(1)}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-blue-100 mb-1">Daily Burn</p>
              <p className="text-2xl font-bold">${financialData.advancedInsights.dailyBurnRate.toFixed(0)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-blue-100 mb-1">Transactions</p>
              <p className="text-2xl font-bold">{state.transactions.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 shadow-md border-slate-200/60 dark:border-slate-700/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
               <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="text-indigo-500" size={20} />
                    Balance Trend
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {isAdmin ? 'Your balance over time' : 'Comprehensive balance analysis'}
                  </p>
               </div>
            </div>
            <BalanceTrend transactions={state.transactions} />
         </Card>

         <Card className="shadow-md border-slate-200/60 dark:border-slate-700/60">
             <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Wallet className="text-indigo-500" size={20} />
                  Spending Breakdown
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {isAdmin ? 'Where your money goes' : 'Category distribution'}
                </p>
             </div>
             <SpendingBreakdown transactions={state.transactions} />
         </Card>
      </div>

      {/* Bottom Row - Different for Admin vs Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions Widget */}
        <RecentTransactions 
          transactions={state.transactions}
          className="lg:col-span-2"
        />

        {/* Admin: Financial Insights | Viewer: Budget Progress */}
        {isAdmin ? (
          <Card className="shadow-md border-slate-200/60 dark:border-slate-700/60 flex flex-col">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="text-indigo-500" size={20} />
                Financial Insights
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Key insights from your data</p>
            </div>
            
            <div className="flex-1">
              <FinancialInsights transactions={state.transactions} />
            </div>
          </Card>
        ) : (
          <BudgetProgress
            totalExpense={financialData.totalExpense}
            totalIncome={financialData.totalIncome}
          />
        )}
        
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTransaction(null); }} 
        onSave={handleSaveTransaction} 
        initialData={editingTransaction}
      />

      {toast && <Toast message={toast} onClose={hideToast} />}
    </div>
  );
};