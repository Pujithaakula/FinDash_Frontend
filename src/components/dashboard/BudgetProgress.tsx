import React from 'react';
import { Target, TrendingDown, AlertCircle } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';

interface BudgetProgressProps {
  totalExpense: number;
  totalIncome: number;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({
  totalExpense,
  totalIncome
}) => {
  const spendingRate = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  const isOverBudget = spendingRate > 100;
  const remaining = totalIncome - totalExpense;

  const getStatusColor = () => {
    if (spendingRate > 100) return 'text-rose-600 dark:text-rose-400';
    if (spendingRate > 80) return 'text-amber-600 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const getProgressColor = () => {
    if (spendingRate > 100) return 'bg-rose-500';
    if (spendingRate > 80) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white shadow-lg">
            <Target size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Budget Status</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Income vs Expenses</p>
          </div>
        </div>
        {isOverBudget && (
          <AlertCircle size={24} className="text-rose-500 animate-pulse" />
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Spending Rate
          </span>
          <span className={`text-lg font-bold ${getStatusColor()}`}>
            {spendingRate.toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
          <div 
            className={`h-full ${getProgressColor()} rounded-full transition-all duration-1000 ease-out relative`}
            style={{ width: `${Math.min(spendingRate, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1 uppercase tracking-wider">
            Income
          </p>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            <FormatCurrency amount={totalIncome} />
          </p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30 rounded-xl p-4 border border-rose-100 dark:border-rose-800/30">
          <p className="text-xs font-bold text-rose-700 dark:text-rose-400 mb-1 uppercase tracking-wider">
            Expenses
          </p>
          <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400">
            <FormatCurrency amount={totalExpense} />
          </p>
        </div>
      </div>

      {/* Remaining Budget */}
      <div className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown size={16} className={remaining >= 0 ? 'text-emerald-500' : 'text-rose-500'} />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {remaining >= 0 ? 'Remaining' : 'Over Budget'}
            </span>
          </div>
          <span className={`text-lg font-bold ${remaining >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            <FormatCurrency amount={Math.abs(remaining)} />
          </span>
        </div>
      </div>
    </div>
  );
};
