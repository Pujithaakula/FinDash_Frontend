import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions';
import { useTransactionActions } from '../../hooks/useTransactionActions';
import { useToast } from '../../hooks/useToast';
import { Card } from '../ui/Card';
import { TransactionModal } from '../modals/TransactionModal';
import { Toast } from '../ui/Toast';
import {
  TransactionHeader,
  TransactionFilters,
  TransactionListView
} from '../transactions';

export const TransactionsView: React.FC = () => {
  const { state, actions } = useApp();
  const { toast, showToast, hideToast } = useToast();

  // Filter options for the hook
  const filterOptions = {
    searchQuery: state.searchQuery,
    filterType: state.filterType,
    selectedCategories: state.selectedCategories,
    sortBy: state.sortBy,
    dateRange: state.dateRange
  };

  // Get filtered transactions
  const { 
    filteredTransactions, 
    filteredTotals, 
    groupedTransactions, 
    isFilteringActive 
  } = useFilteredTransactions(state.transactions, filterOptions);

  // Transaction actions
  const {
    isModalOpen,
    editingTransaction,
    handleExportCSV,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleSave,
    handleCloseModal
  } = useTransactionActions({
    isAdmin: state.role === 'admin',
    transactions: state.transactions,
    onAddTransaction: actions.addTransaction,
    onUpdateTransaction: actions.updateTransaction,
    onDeleteTransaction: actions.deleteTransaction,
    showToast
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Viewer Mode Notice */}
      {state.role === 'viewer' && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 p-4 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} className="shrink-0" />
          <p>You are viewing in <strong>Viewer mode</strong>. Editing and Adding capabilities are disabled.</p>
        </div>
      )}

      {/* Header */}
      <TransactionHeader
        transactionCount={filteredTransactions.length}
        isAdmin={state.role === 'admin'}
        onExport={handleExportCSV}
        onAddNew={handleAddNew}
      />

      {/* Main Content Card */}
      <Card className="p-0 overflow-hidden shadow-md border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        
        {/* Filters */}
        <TransactionFilters
          searchQuery={state.searchQuery}
          onSearchChange={actions.setSearchQuery}
          filterType={state.filterType}
          onTypeChange={actions.setFilterType}
          dateRange={state.dateRange}
          onDateRangeChange={actions.setDateRange}
          sortBy={state.sortBy}
          onSortChange={actions.setSortBy}
          selectedCategories={state.selectedCategories}
          onCategoryToggle={actions.toggleCategoryFilter}
          onClearCategories={() => actions.setSelectedCategories([])}
          isFilteringActive={isFilteringActive}
          filteredCount={filteredTransactions.length}
          filteredTotals={filteredTotals}
        />

        {/* Transaction List */}
        <TransactionListView
          groupedTransactions={groupedTransactions}
          isAdmin={state.role === 'admin'}
          hasSearchQuery={!!state.searchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClearSearch={() => actions.setSearchQuery('')}
        />
      </Card>

      {/* Transaction Modal */}
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSave} 
        initialData={editingTransaction}
      />

      {/* Toast Notifications */}
      {toast && <Toast message={toast} onClose={hideToast} />}
    </div>
  );
};