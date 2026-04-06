import React from 'react';

type TabType = 'dashboard' | 'insights' | 'transactions';

interface NavigationMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

const navigationItems: Array<{ id: TabType; label: string }> = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'insights', label: 'Insights' },
  { id: 'transactions', label: 'Transactions' }
];

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  activeTab,
  onTabChange,
  variant = 'desktop',
  className = ''
}) => {
  if (variant === 'mobile') {
    return (
      <div className={`md:hidden flex border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden ${className}`}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex-1 min-w-[100px] py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === item.id
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <nav className={`hidden md:flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1 ${className}`}>
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === item.id
              ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};