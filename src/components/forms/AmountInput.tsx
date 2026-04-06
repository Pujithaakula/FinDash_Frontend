import React from 'react';

interface AmountInputProps {
  type: 'income' | 'expense';
  amount: string;
  onChange: (amount: string) => void;
  error?: string;
  className?: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  type,
  amount,
  onChange,
  error,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-4 ${className}`}>
      <span className={`text-sm font-bold mb-2 tracking-wider uppercase ${
        type === 'expense' ? 'text-rose-500' : 'text-emerald-500'
      }`}>
        {type === 'expense' ? 'Amount Spent' : 'Amount Received'}
      </span>
      
      <div className="flex items-center text-5xl font-extrabold text-slate-900 dark:text-white">
        <span className="text-slate-300 dark:text-slate-600 mr-2">$</span>
        <input
          type="number" 
          step="0.01" 
          min="0.01" 
          value={amount} 
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none text-center w-full max-w-[220px] placeholder-slate-200 dark:placeholder-slate-800 p-0"
          placeholder="0.00"
          autoFocus
        />
      </div>
      
      {error && (
        <p className="text-rose-500 text-sm mt-2 font-medium">{error}</p>
      )}
    </div>
  );
};