import React from 'react';
import { AlertTriangle, Calendar, Tag, TrendingDown } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';
import { CATEGORY_ICONS } from '../../constants/categories';
import type { Transaction } from '../../types';

interface BigHitCardProps {
  largestExpense: Transaction | null;
}

export const BigHitCard: React.FC<BigHitCardProps> = ({ largestExpense }) => {
  const formatShortDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getImpactLevel = (amount: number) => {
    if (amount > 500) return { level: 'High Impact', color: 'text-rose-600' };
    if (amount > 200) return { level: 'Moderate Impact', color: 'text-amber-600' };
    return { level: 'Low Impact', color: 'text-emerald-600' };
  };

  const getAdvice = (amount: number) => {
    if (amount > 500) return "Consider if this large expense was necessary and plan for similar future costs.";
    if (amount > 200) return "Monitor expenses in this range to prevent budget overruns.";
    return "This expense level is manageable within most budgets.";
  };

  return (
    <div className="bg-gradient-to-br from-rose-50/50 to-red-50/50 dark:from-rose-950/20 dark:to-red-950/20 rounded-2xl shadow-lg border border-rose-200 dark:border-rose-900/50 p-6 group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-500 to-red-600 rounded-r-full"></div>
      
      <div className="pl-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl text-white shadow-lg">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-rose-700 dark:text-rose-400">The Big Hit</h3>
            <p className="text-sm text-rose-600/70 dark:text-rose-400/70">Largest single expense</p>
          </div>
        </div>
        
        {largestExpense ? (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-rose-100 dark:border-rose-900">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  <FormatCurrency amount={largestExpense.amount} />
                </span>
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                  {React.createElement(
                    CATEGORY_ICONS[largestExpense.category as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.Other, 
                    { size: 20, className: "text-rose-600 dark:text-rose-400" }
                  )}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                {largestExpense.description}
              </p>
              
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-slate-500" />
                  <span className="px-2 py-1 rounded-full text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 font-medium">
                    {largestExpense.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-500" />
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {formatShortDate(largestExpense.date)}
                  </span>
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown size={16} className={getImpactLevel(largestExpense.amount).color} />
                <span className={`text-sm font-semibold ${getImpactLevel(largestExpense.amount).color}`}>
                  {getImpactLevel(largestExpense.amount).level}
                </span>
              </div>
            </div>

            {/* Advice */}
            <div className="bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30 rounded-xl p-4 border border-rose-100 dark:border-rose-800/30">
              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                💡 {getAdvice(largestExpense.amount)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 opacity-50 text-rose-500">
            <AlertTriangle size={32} className="mr-3" />
            <div>
              <p className="text-sm font-medium">No expenses recorded</p>
              <p className="text-xs">Add transactions to see insights</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};