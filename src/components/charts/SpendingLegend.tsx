import React from 'react';
import { FormatCurrency } from '../ui/FormatCurrency';
import { getCategoryColor } from '../../lib/categoryUtils';
import type { SpendingBreakdownItem } from '../../hooks/useSpendingBreakdown';

interface SpendingLegendProps {
  items: SpendingBreakdownItem[];
  hoveredItem: SpendingBreakdownItem | null;
  onItemHover: (item: SpendingBreakdownItem | null) => void;
  maxItems?: number;
}

export const SpendingLegend: React.FC<SpendingLegendProps> = ({
  items,
  hoveredItem,
  onItemHover,
  maxItems = 5
}) => {
  const displayItems = items.slice(0, maxItems);

  return (
    <div className="w-full space-y-1.5">
      {displayItems.map((item) => {
        const bgColorClass = getCategoryColor(item.name);
        const isHovered = hoveredItem?.name === item.name;
        
        return (
          <div 
            key={item.name} 
            className={`flex items-center justify-between group cursor-pointer transition-colors p-2 -mx-2 rounded-xl ${
              isHovered 
                ? 'bg-slate-50 dark:bg-slate-800/80' 
                : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
            }`}
            onMouseEnter={() => onItemHover(item)}
            onMouseLeave={() => onItemHover(null)}
          >
            <div className="flex items-center gap-3">
              <div 
                className={`w-3 h-3 rounded-full ${bgColorClass} shadow-sm transition-transform ${
                  isHovered ? 'scale-125' : 'group-hover:scale-125'
                }`}
              />
              <span 
                className={`text-sm font-medium transition-colors ${
                  isHovered 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <span 
                className={`text-sm font-bold mr-2 transition-colors ${
                  isHovered 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                <FormatCurrency amount={item.value} />
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ({item.percentage.toFixed(0)}%)
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};