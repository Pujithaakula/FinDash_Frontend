import React from 'react';
import { 
  Brand, 
  NavigationMenu, 
  UserProfile, 
  ThemeToggle, 
  RoleSwitcher, 
  DataManagementMenu,
  MobileMenu
} from '../navigation';

interface HeaderProps {
  userName: string;
  darkMode: boolean;
  role: 'admin' | 'viewer';
  activeTab: 'dashboard' | 'insights' | 'transactions';
  isDataMenuOpen: boolean;
  isMobileMenuOpen: boolean;
  onToggleDarkMode: () => void;
  onSetRole: (role: 'admin' | 'viewer') => void;
  onSetActiveTab: (tab: 'dashboard' | 'insights' | 'transactions') => void;
  onToggleDataMenu: () => void;
  onToggleMobileMenu: () => void;
  onRestoreDemoData: () => void;
  onChangeProfileName: () => void;
  onClearAllData: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  darkMode,
  role,
  activeTab,
  isDataMenuOpen,
  isMobileMenuOpen,
  onToggleDarkMode,
  onSetRole,
  onSetActiveTab,
  onToggleDataMenu,
  onToggleMobileMenu,
  onRestoreDemoData,
  onChangeProfileName,
  onClearAllData,
  onLogout
}) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Brand />

        <div className="flex items-center gap-3 sm:gap-5">
          <NavigationMenu 
            activeTab={activeTab} 
            onTabChange={onSetActiveTab} 
            variant="desktop" 
          />

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

          <RoleSwitcher 
            role={role} 
            onRoleChange={onSetRole} 
          />

          <UserProfile userName={userName} onLogout={onLogout} />

          {role === 'admin' && (
            <DataManagementMenu
              isOpen={isDataMenuOpen}
              onToggle={onToggleDataMenu}
              onRestoreDemoData={onRestoreDemoData}
              onChangeProfileName={onChangeProfileName}
              onClearAllData={onClearAllData}
              onLogout={onLogout}
              className="hidden sm:block"
            />
          )}

          <ThemeToggle 
            darkMode={darkMode} 
            onToggle={onToggleDarkMode} 
            className="hidden sm:block"
          />

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={onToggleMobileMenu}
            userName={userName}
            role={role}
            darkMode={darkMode}
            onToggleDarkMode={onToggleDarkMode}
            onSetRole={onSetRole}
            onRestoreDemoData={onRestoreDemoData}
            onChangeProfileName={onChangeProfileName}
            onClearAllData={onClearAllData}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};