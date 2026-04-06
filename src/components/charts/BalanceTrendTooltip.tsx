import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';
import type { BalanceTrendPoint } from '../../hooks/useBalanceTrend';

interface BalanceTrendTooltipProps {
  point: BalanceTrendPoint;
  x: number;
  y: number;
  width: number;
}

export const BalanceTrendTooltip: React.FC<BalanceTrendTooltipProps> = ({
  point,
  x,
  y,
  width
}) => {
  const isPositiveBalance = point.cumulativeBalance >= 0;
  const isPositiveChange = point.balance >= 0;
  
  // Position tooltip to avoid edges
  // const tooltipWidth = 200;
  let tooltipX = (x / width) * 100;
  
  if (tooltipX > 70) tooltipX = 70;
  if (tooltipX < 30) tooltipX = 30;
  
  const tooltipY = (y / 300) * 100;

  return (
    <div 
      className="absolute z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 pointer-events-none transition-all duration-200 min-w-[200px]"
      style={{
        left: `${tooltipX}%`,
        top: `${Math.max(0, tooltipY - 10)}%`,
        transform: 'translate(-50%, -100%)',
        marginTop: '-16px'
      }}
    >
      {/* Header */}
      <div className="text-center mb-3">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
          {point.label}
        </div>
        <div className="flex items-center justify-center gap-2">
          {isPositiveBalance ? (
            <TrendingUp size={16} className="text-emerald-500" />
          ) : (
            <TrendingDown size={16} className="text-rose-500" />
          )}
          <span className={`text-lg font-bold ${
            isPositiveBalance ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          }`}>
            <FormatCurrency amount={point.cumulativeBalance} />
          </span>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Total Balance
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className="space-y-2 border-t border-slate-100 dark:border-slate-700 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-sm">
            <ArrowUpRight size={14} /> Income
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <FormatCurrency amount={point.income} />
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 text-sm">
            <ArrowDownRight size={14} /> Expenses
          </span>
          <span className="text-rose-600 dark:text-rose-400 font-semibold text-sm">
            <FormatCurrency amount={point.expense} />
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700">
          <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">
            Net Change
          </span>
          <span className={`font-bold text-sm ${
            isPositiveChange ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          }`}>
            {isPositiveChange ? '+' : ''}<FormatCurrency amount={point.balance} />
          </span>
        </div>
      </div>

      {/* Tooltip arrow */}
      <div className="absolute w-3 h-3 bg-white dark:bg-slate-800 rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r border-slate-200 dark:border-slate-700"></div>
    </div>
  );
};