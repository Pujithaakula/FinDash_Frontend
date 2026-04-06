import { useState, useEffect } from 'react';
import type { Transaction } from '../types';

export interface TransactionFormData {
  type: 'income' | 'expense';
  amount: string;
  description: string;
  category: string;
  date: string;
}

export interface TransactionFormState extends TransactionFormData {
  isValid: boolean;
  errors: {
    amount?: string;
    description?: string;
  };
}

export const useTransactionForm = (initialData?: Transaction | null) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<TransactionFormData>({
    type: 'expense',
    amount: '',
    description: '',
    category: 'Food',
    date: today
  });

  const [errors, setErrors] = useState<{ amount?: string; description?: string }>({});

  // Initialize form with data when provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type,
        amount: initialData.amount.toString(),
        description: initialData.description,
        category: initialData.category,
        date: initialData.date
      });
    } else {
      setFormData({
        type: 'expense',
        amount: '',
        description: '',
        category: 'Food',
        date: today
      });
    }
    setErrors({});
  }, [initialData, today]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: { amount?: string; description?: string } = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update form field
  const updateField = <K extends keyof TransactionFormData>(
    field: K,
    value: TransactionFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: 'Food',
      date: today
    });
    setErrors({});
  };

  // Get form data for submission
  const getSubmissionData = (): Omit<Transaction, 'id'> => ({
    type: formData.type,
    amount: parseFloat(formData.amount),
    description: formData.description.trim(),
    category: formData.category,
    date: formData.date
  });

  const isValid = formData.amount && 
                  parseFloat(formData.amount) > 0 && 
                  formData.description.trim().length > 0;

  return {
    formData,
    errors,
    isValid,
    updateField,
    validateForm,
    resetForm,
    getSubmissionData
  };
};