import React from 'react';
import { Zap, Calendar, TrendingUp } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';

interface CashflowVelocityCardProps {
  dailyBurnRate: number;
  totalTransactions: number;
}

export const CashflowVelocityCard: React.FC<CashflowVelocityCardProps> = ({
  dailyBurnRate,
  totalTransactions
}) => {
  const getVelocityLevel = () => {
    if (dailyBurnRate > 100) return { level: 'High', color: 'text-rose-600' };
    if (dailyBurnRate > 50) return { level: 'Moderate', color: 'text-amber-600' };
    return { level: 'Low', color: 'text-emerald-600' };
  };

  const velocityLevel = getVelocityLevel();
  const avgTransactionSize = totalTransactions > 0 ? (dailyBurnRate * 30) / totalTransactions : 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-6 group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 text-indigo-50 dark:text-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
        <Zap size={120} strokeWidth={1} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Cashflow Velocity</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Daily spending rate</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                <FormatCurrency amount={dailyBurnRate} />
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">/day</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className={velocityLevel.color} />
              <span className={`text-sm font-semibold ${velocityLevel.color}`}>
                {velocityLevel.level} Velocity
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800/50">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={14} className="text-indigo-600 dark:text-indigo-400" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Monthly Rate</p>
              </div>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                <FormatCurrency amount={dailyBurnRate * 30} />
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-xl p-3 border border-purple-100 dark:border-purple-800/50">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Avg Transaction</p>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                <FormatCurrency amount={avgTransactionSize} />
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/50">
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              You've processed <strong className="text-indigo-600 dark:text-indigo-400">{totalTransactions}</strong> expense transactions. 
              {velocityLevel.level === 'High' && ' Consider reviewing high-frequency spending.'}
              {velocityLevel.level === 'Moderate' && ' Your spending pace is reasonable.'}
              {velocityLevel.level === 'Low' && ' You maintain good spending discipline.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};