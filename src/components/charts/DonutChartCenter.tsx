import React from 'react';
import { FormatCurrency } from '../ui/FormatCurrency';
import type { SpendingBreakdownItem } from '../../hooks/useSpendingBreakdown';

interface DonutChartCenterProps {
  hoveredItem: SpendingBreakdownItem | null;
  total: number;
}

export const DonutChartCenter: React.FC<DonutChartCenterProps> = ({
  hoveredItem,
  total
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none transition-all duration-300">
      {hoveredItem ? (
        <div className="animate-in zoom-in-95 fade-in duration-200">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            {hoveredItem.name}
          </span>
          <span className="block text-xl font-bold text-slate-900 dark:text-white leading-tight">
            <FormatCurrency amount={hoveredItem.value} />
          </span>
          <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
            {hoveredItem.percentage.toFixed(1)}%
          </span>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 fade-in duration-200">
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total</span>
          <span className="block text-xl font-bold text-slate-900 dark:text-white leading-tight">
            <FormatCurrency amount={total} />
          </span>
        </div>
      )}
    </div>
  );
};