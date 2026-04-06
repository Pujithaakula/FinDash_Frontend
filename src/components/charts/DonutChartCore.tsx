import React from 'react';
import { getCategoryTextColor } from '../../lib/categoryUtils';
import type { SpendingBreakdownItem } from '../../hooks/useSpendingBreakdown';

interface DonutChartCoreProps {
  data: SpendingBreakdownItem[];
  total: number;
  hoveredItem: SpendingBreakdownItem | null;
  onItemHover: (item: SpendingBreakdownItem | null) => void;
  size?: number;
  strokeWidth?: number;
  hoverStrokeWidth?: number;
}

export const DonutChartCore: React.FC<DonutChartCoreProps> = ({
  data,
  total,
  hoveredItem,
  onItemHover,
  size = 200,
  strokeWidth = 24,
  hoverStrokeWidth = 30
}) => {
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="relative w-48 h-48" onMouseLeave={() => onItemHover(null)}>
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full h-full -rotate-90 drop-shadow-md overflow-visible"
      >
        {/* Background circle */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={radius} 
          fill="none" 
          className="stroke-slate-100 dark:stroke-slate-700/50" 
          strokeWidth={strokeWidth} 
        />
        
        {/* Data segments */}
        {data.map((item) => {
          const isHovered = hoveredItem?.name === item.name;
          const isDimmed = hoveredItem && !isHovered;
          
          const dashLength = Math.max(0, ((item.value / total) * circumference) - 2); 
          const strokeDasharray = `${dashLength} ${circumference}`;
          const strokeDashoffset = -1 * (cumulative / total) * circumference;
          cumulative += item.value;
          
          const textColorClass = getCategoryTextColor(item.name);
          
          return (
            <circle 
              key={item.name} 
              cx={cx} 
              cy={cy} 
              r={radius} 
              fill="none"
              className={`stroke-current ${textColorClass} transition-all duration-300 ease-out cursor-pointer outline-none ${isHovered ? 'drop-shadow-lg' : ''}`}
              style={{ 
                opacity: isDimmed ? 0.3 : 1,
                strokeWidth: isHovered ? hoverStrokeWidth : strokeWidth
              }}
              strokeDasharray={strokeDasharray} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round"
              onMouseEnter={() => onItemHover(item)}
            />
          );
        })}
      </svg>
    </div>
  );
};