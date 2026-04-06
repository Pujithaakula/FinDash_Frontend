import React from 'react';

interface FormatCurrencyProps {
  amount: number;
}

export const FormatCurrency: React.FC<FormatCurrencyProps> = ({ amount }) => {
  const formatted = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);
  
  const parts = formatted.split('.');
  
  return (
    <span>
      {parts[0]}
      {parts[1] && <span className="text-[0.75em] opacity-50 font-medium">.{parts[1]}</span>}
    </span>
  );
};