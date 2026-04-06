import React from 'react';
import { FormatCurrency } from '../ui/FormatCurrency';

interface BalanceTrendGridProps {
  minBalance: number;
  maxBalance: number;
  width: number;
  height: number;
  pointCount: number;
}

export const BalanceTrendGrid: React.FC<BalanceTrendGridProps> = ({
  minBalance,
  maxBalance,
  width,
  height,
  pointCount
}) => {
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  
  // Create horizontal grid lines (balance levels)
  const gridLines = [];
  const steps = 4;
  const range = maxBalance - minBalance || 1000;
  
  for (let i = 0; i <= steps; i++) {
    const value = minBalance + (range * i / steps);
    const y = padding + ((maxBalance - value) / range) * chartHeight;
    
    gridLines.push(
      <g key={i}>
        <line
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
          className="text-slate-200 dark:text-slate-700/50"
        />
        <text
          x={padding - 8}
          y={y + 4}
          textAnchor="end"
          className="text-xs text-slate-500 dark:text-slate-400 font-medium"
        >
          <FormatCurrency amount={value} />
        </text>
      </g>
    );
  }

  // Create vertical grid lines (time periods)
  const verticalLines = [];
  const timeSteps = Math.min(pointCount - 1, 6);
  
  for (let i = 0; i <= timeSteps; i++) {
    const x = padding + (i / timeSteps) * chartWidth;
    
    verticalLines.push(
      <line
        key={`v-${i}`}
        x1={x}
        y1={padding}
        x2={x}
        y2={height - padding}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 4"
        className="text-slate-100 dark:text-slate-800/50"
      />
    );
  }

  return (
    <g>
      {/* Zero line (if in range) */}
      {minBalance <= 0 && maxBalance >= 0 && (
        <line
          x1={padding}
          y1={padding + ((maxBalance - 0) / range) * chartHeight}
          x2={width - padding}
          y2={padding + ((maxBalance - 0) / range) * chartHeight}
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-400 dark:text-slate-600"
        />
      )}
      
      {/* Horizontal grid lines */}
      {gridLines}
      
      {/* Vertical grid lines */}
      {verticalLines}
    </g>
  );
};