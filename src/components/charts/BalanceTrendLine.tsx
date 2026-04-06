import React from 'react';
import type { BalanceTrendPoint } from '../../hooks/useBalanceTrend';

interface BalanceTrendLineProps {
  points: BalanceTrendPoint[];
  minBalance: number;
  maxBalance: number;
  width: number;
  height: number;
  hoveredPoint: BalanceTrendPoint | null;
}

export const BalanceTrendLine: React.FC<BalanceTrendLineProps> = ({
  points,
  minBalance,
  maxBalance,
  width,
  height,
  hoveredPoint
}) => {
  if (points.length < 2) return null;

  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  const range = maxBalance - minBalance || 1000;

  // Calculate path points
  const pathPoints = points.map((point, index) => {
    const x = padding + (index / (points.length - 1)) * chartWidth;
    const y = padding + ((maxBalance - point.cumulativeBalance) / range) * chartHeight;
    return { x, y, point };
  });

  // Create smooth curve path
  const createSmoothPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (i === 1) {
        // First curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else if (i === points.length - 1) {
        // Last curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        // Middle curves with smooth transitions
        const prevDx = curr.x - prev.x;
        const prevDy = curr.y - prev.y;
        const nextDx = next.x - curr.x;
        const nextDy = next.y - curr.y;
        
        const cp1x = prev.x + prevDx * 0.5;
        const cp1y = prev.y + prevDy * 0.5;
        const cp2x = curr.x - nextDx * 0.3;
        const cp2y = curr.y - nextDy * 0.3;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };

  const linePath = createSmoothPath(pathPoints);
  
  // Create gradient area path
  const areaPath = linePath + ` L ${pathPoints[pathPoints.length - 1].x} ${height - padding} L ${pathPoints[0].x} ${height - padding} Z`;

  return (
    <g>
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(99, 102, 241)" />
          <stop offset="50%" stopColor="rgb(139, 92, 246)" />
          <stop offset="100%" stopColor="rgb(99, 102, 241)" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path
        d={areaPath}
        fill="url(#balanceGradient)"
        className="transition-all duration-300"
      />

      {/* Main trend line */}
      <path
        d={linePath}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
      />

      {/* Data points */}
      {pathPoints.map(({ x, y, point }, _index) => {
        const isHovered = hoveredPoint?.id === point.id;
        const isPositive = point.cumulativeBalance >= 0;
        
        return (
          <g key={point.id}>
            {/* Hover highlight */}
            {isHovered && (
              <circle
                cx={x}
                cy={y}
                r="12"
                fill="rgb(99, 102, 241)"
                opacity="0.2"
                className="animate-pulse"
              />
            )}
            
            {/* Data point */}
            <circle
              cx={x}
              cy={y}
              r={isHovered ? "6" : "4"}
              fill={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-200 cursor-pointer drop-shadow-sm"
            />
          </g>
        );
      })}
    </g>
  );
};