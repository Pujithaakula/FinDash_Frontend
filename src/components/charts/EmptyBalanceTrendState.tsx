import React from 'react';
import { TrendingUp } from 'lucide-react';

interface EmptyBalanceTrendStateProps {
  message?: string;
  className?: string;
}

export const EmptyBalanceTrendState: React.FC<EmptyBalanceTrendStateProps> = ({
  message = "No balance data available. Add some transactions to see your balance trend.",
  className = ''
}) => {
  return (
    <div className={`text-slate-400 text-sm py-16 text-center flex flex-col items-center justify-center ${className}`}>
      <TrendingUp size={48} className="mb-4 opacity-30"/>
      <p className="max-w-xs">{message}</p>
    </div>
  );
};