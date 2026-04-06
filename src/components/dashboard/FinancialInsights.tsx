import React from 'react';
import { TrendingUp, PieChart, Activity, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useFinancialInsights } from '../../hooks/useFinancialInsights';
import type { Transaction } from '../../types';

interface FinancialInsightsProps {
  transactions: Transaction[];
  className?: string;
}

const getInsightIcon = (iconType: string) => {
  switch (iconType) {
    case 'trend':
      return TrendingUp;
    case 'category':
      return PieChart;
    case 'frequency':
      return Activity;
    case 'savings':
      return Wallet;
    default:
      return TrendingUp;
  }
};

const getInsightColor = (type: 'positive' | 'neutral' | 'warning') => {
  switch (type) {
    case 'positive':
      return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10';
    case 'warning':
      return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10';
    default:
      return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10';
  }
};

const getStatusIcon = (type: 'positive' | 'neutral' | 'warning') => {
  switch (type) {
    case 'positive':
      return CheckCircle2;
    case 'warning':
      return AlertCircle;
    default:
      return TrendingUp;
  }
};

export const FinancialInsights: React.FC<FinancialInsightsProps> = ({ 
  transactions, 
  className = '' 
}) => {
  const { insights, primaryInsight, isEmpty } = useFinancialInsights(transactions);

  if (isEmpty) {
    return (
      <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="text-slate-400" size={24} />
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
          Add some transactions to see insights
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Primary Insight */}
      {primaryInsight && (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl ${getInsightColor(primaryInsight.type)}`}>
              {React.createElement(getInsightIcon(primaryInsight.icon), { size: 20 })}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                {primaryInsight.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {primaryInsight.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {primaryInsight.value}
            </span>
            {React.createElement(getStatusIcon(primaryInsight.type), { 
              size: 16, 
              className: `${primaryInsight.type === 'positive' ? 'text-emerald-500' : 
                         primaryInsight.type === 'warning' ? 'text-rose-500' : 
                         'text-slate-400'}`
            })}
          </div>
        </div>
      )}

      {/* Additional Insights */}
      {insights.length > 1 && (
        <div className="grid grid-cols-1 gap-3">
          {insights.slice(1, 3).map((insight) => (
            <div 
              key={insight.id}
              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
            >
              <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                {React.createElement(getInsightIcon(insight.icon), { size: 16 })}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white text-sm truncate">
                  {insight.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {insight.description}
                </p>
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {insight.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};