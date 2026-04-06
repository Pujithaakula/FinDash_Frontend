import React from 'react';
import { Flame, Filter, TrendingUp, AlertCircle } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';
import { CATEGORY_ICONS } from '../../constants/categories';

interface CategoryDominanceCardProps {
  topCategory: { name: string; value: number } | null;
  dominanceRatio: number;
}

export const CategoryDominanceCard: React.FC<CategoryDominanceCardProps> = ({
  topCategory,
  dominanceRatio
}) => {
  const getDominanceLevel = () => {
    if (dominanceRatio > 50) return { level: 'High', color: 'text-rose-600', icon: AlertCircle };
    if (dominanceRatio > 30) return { level: 'Moderate', color: 'text-amber-600', icon: TrendingUp };
    return { level: 'Balanced', color: 'text-emerald-600', icon: TrendingUp };
  };

  const dominanceLevel = getDominanceLevel();
  const DominanceIcon = dominanceLevel.icon;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-6 group hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white shadow-lg">
          <Flame size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Category Dominance</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your spending concentration</p>
        </div>
      </div>
      
      {topCategory ? (
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-24 h-24 transform -rotate-90">
                <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-700" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="45" 
                  stroke="url(#gradient)" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="282.74" 
                  strokeDashoffset={282.74 - (282.74 * dominanceRatio) / 100} 
                  className="transition-all duration-1000 ease-out" 
                  strokeLinecap="round" 
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {React.createElement(
                  CATEGORY_ICONS[topCategory.name as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.Other, 
                  { size: 20, className: "text-amber-600 dark:text-amber-500 mb-1" }
                )}
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {dominanceRatio.toFixed(0)}%
                </span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xl text-slate-900 dark:text-white mb-1 truncate">
                {topCategory.name}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                <FormatCurrency amount={topCategory.value}/> total spent
              </p>
              <div className="flex items-center gap-2">
                <DominanceIcon size={16} className={dominanceLevel.color} />
                <span className={`text-sm font-semibold ${dominanceLevel.color}`}>
                  {dominanceLevel.level} Concentration
                </span>
              </div>
            </div>
          </div>

          {/* Additional insights */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {dominanceRatio > 50 
                ? "High concentration - consider diversifying spending across categories"
                : dominanceRatio > 30 
                ? "Moderate concentration - this category dominates your budget"
                : "Well-balanced spending across multiple categories"
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-12 opacity-50 text-slate-500">
          <Filter size={32} className="mr-3" />
          <div>
            <p className="text-sm font-medium">No spending data</p>
            <p className="text-xs">Add transactions to see insights</p>
          </div>
        </div>
      )}
    </div>
  );
};