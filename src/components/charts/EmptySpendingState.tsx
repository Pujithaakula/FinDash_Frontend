import React from 'react';
import { Filter } from 'lucide-react';

interface EmptySpendingStateProps {
  message?: string;
  className?: string;
}

export const EmptySpendingState: React.FC<EmptySpendingStateProps> = ({
  message = "No expenses recorded yet.",
  className = ''
}) => {
  return (
    <div className={`text-slate-400 text-sm py-10 text-center flex flex-col items-center justify-center ${className}`}>
      <Filter size={32} className="mb-2 opacity-50"/>
      {message}
    </div>
  );
};