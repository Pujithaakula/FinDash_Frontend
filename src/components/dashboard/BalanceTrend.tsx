import React, { useState } from 'react';
import { BalanceTrendLine } from '../charts/BalanceTrendLine';
import { BalanceTrendGrid } from '../charts/BalanceTrendGrid';
import { BalanceTrendTooltip } from '../charts/BalanceTrendTooltip';
import { EmptyBalanceTrendState } from '../charts/EmptyBalanceTrendState';
import { useBalanceTrend, type BalanceTrendPoint } from '../../hooks/useBalanceTrend';
import type { Transaction } from '../../types';

interface BalanceTrendProps {
  transactions: Transaction[];
  className?: string;
}

export const BalanceTrend: React.FC<BalanceTrendProps> = ({
  transactions,
  className = ''
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<BalanceTrendPoint | null>(null);
  const { points, minBalance, maxBalance, isEmpty } = useBalanceTrend(transactions);

  const width = 600;
  const height = 300;
  const padding = 40;

  if (isEmpty) {
    return <EmptyBalanceTrendState className={className} />;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Tooltip */}
      {hoveredPoint && (
        <BalanceTrendTooltip
          point={hoveredPoint}
          x={((points.findIndex(p => p.id === hoveredPoint.id) / (points.length - 1)) * (width - padding * 2)) + padding}
          y={padding + ((maxBalance - hoveredPoint.cumulativeBalance) / (maxBalance - minBalance || 1000)) * (height - padding * 2)}
          width={width}
        />
      )}

      {/* Chart container */}
      <div 
        className="w-full h-80 flex items-center justify-center"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
        >
          {/* Grid */}
          <BalanceTrendGrid
            minBalance={minBalance}
            maxBalance={maxBalance}
            width={width}
            height={height}
            pointCount={points.length}
          />

          {/* Trend line */}
          <BalanceTrendLine
            points={points}
            minBalance={minBalance}
            maxBalance={maxBalance}
            width={width}
            height={height}
            hoveredPoint={hoveredPoint}
          />

          {/* Interactive areas */}
          {points.map((point, index) => {
            const x = padding + (index / (points.length - 1)) * (width - padding * 2);
            const sectionWidth = (width - padding * 2) / Math.max(points.length - 1, 1);
            
            return (
              <rect
                key={point.id}
                x={x - sectionWidth / 2}
                y={0}
                width={sectionWidth}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(point)}
              />
            );
          })}

          {/* X-axis labels */}
          {points.map((point, index) => {
            const x = padding + (index / (points.length - 1)) * (width - padding * 2);
            
            return (
              <text
                key={`label-${point.id}`}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fill="currentColor"
                className="text-xs text-slate-600 dark:text-white font-medium"
              >
                {point.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};