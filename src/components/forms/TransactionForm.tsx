import React from 'react';
import { TransactionTypeToggle } from './TransactionTypeToggle';
import { AmountInput } from './AmountInput';
import { DateSelector } from './DateSelector';
import { CategorySelector } from './CategorySelector';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTransactionForm } from '../../hooks/useTransactionForm';
import type { Transaction } from '../../types';

interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  initialData?: Transaction | null;
  submitLabel?: string;
  className?: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  // onCancel,
  initialData,
  submitLabel,
  className = ''
}) => {
  const {
    formData,
    errors,
    isValid,
    updateField,
    validateForm,
    getSubmissionData
  } = useTransactionForm(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(getSubmissionData());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Transaction Type Toggle */}
      <TransactionTypeToggle
        type={formData.type}
        onChange={(type) => updateField('type', type)}
      />

      {/* Amount Input */}
      <AmountInput
        type={formData.type}
        amount={formData.amount}
        onChange={(amount) => updateField('amount', amount)}
        error={errors.amount}
      />

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Description Input */}
        <div className="relative group">
          <Input
            type="text" 
            value={formData.description} 
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="What was this for?" 
            className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 outline-none text-[15px] font-medium transition-all group-hover:border-slate-300 dark:group-hover:border-slate-600"
            error={errors.description}
          />
        </div>

        {/* Date Selector */}
        <DateSelector
          date={formData.date}
          onChange={(date) => updateField('date', date)}
        />

        {/* Category Selector */}
        <CategorySelector
          category={formData.category}
          onChange={(category) => updateField('category', category)}
        />
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={!isValid}
        className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-[16px] shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
      >
        {submitLabel || (initialData ? 'Update Transaction' : 'Save Transaction')}
      </Button>
    </form>
  );
};