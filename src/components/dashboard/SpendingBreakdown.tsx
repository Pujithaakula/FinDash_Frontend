import React, { useState } from 'react';
import { DonutChartCore } from '../charts/DonutChartCore';
import { DonutChartCenter } from '../charts/DonutChartCenter';
import { SpendingLegend } from '../charts/SpendingLegend';
import { EmptySpendingState } from '../charts/EmptySpendingState';
import { useSpendingBreakdown, type SpendingBreakdownItem } from '../../hooks/useSpendingBreakdown';
import type { Transaction } from '../../types';

interface SpendingBreakdownProps {
  transactions: Transaction[];
  className?: string;
}

export const SpendingBreakdown: React.FC<SpendingBreakdownProps> = ({
  transactions,
  className = ''
}) => {
  const [hoveredItem, setHoveredItem] = useState<SpendingBreakdownItem | null>(null);
  const { items, total, isEmpty } = useSpendingBreakdown(transactions);

  if (isEmpty) {
    return <EmptySpendingState className={className} />;
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative mb-8">
        <DonutChartCore
          data={items}
          total={total}
          hoveredItem={hoveredItem}
          onItemHover={setHoveredItem}
        />
        <DonutChartCenter
          hoveredItem={hoveredItem}
          total={total}
        />
      </div>
      
      <SpendingLegend
        items={items}
        hoveredItem={hoveredItem}
        onItemHover={setHoveredItem}
      />
    </div>
  );
};