import { useState } from 'react';
import type { Transaction } from '../types';

interface UseTransactionActionsProps {
  isAdmin: boolean;
  transactions: Transaction[];
  onAddTransaction: (data: any) => void;
  onUpdateTransaction: (id: string, data: any) => void;
  onDeleteTransaction: (id: string) => void;
  showToast: (message: string) => void;
}

export const useTransactionActions = ({
  isAdmin,
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  showToast
}: UseTransactionActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleExportCSV = () => {
    if (!isAdmin) return;
    
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'finance_export.csv';
    link.click();
    showToast('Data exported successfully');
  };

  const handleAddNew = () => {
    if (!isAdmin) return;
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    if (!isAdmin) return;
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    onDeleteTransaction(id);
    showToast('Transaction deleted');
  };

  const handleSave = (txData: any) => {
    if (!isAdmin) return;
    
    if (editingTransaction) {
      onUpdateTransaction(editingTransaction.id, txData);
      showToast('Transaction updated successfully');
    } else {
      onAddTransaction(txData);
      showToast('New transaction added');
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return {
    isModalOpen,
    editingTransaction,
    handleExportCSV,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleSave,
    handleCloseModal
  };
};