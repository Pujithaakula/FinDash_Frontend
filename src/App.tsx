import { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { OnboardingView } from './components/views/OnboardingView';
import { DashboardView } from './components/views/DashboardView';
import { InsightsView } from './components/views/InsightsView';
import { TransactionsView } from './components/views/TransactionsView';
import { Header } from './components/layout/Header';
import { MobileNavigation } from './components/layout/MobileNavigation';

function AppContent() {
  const { state, actions } = useApp();
  const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRestoreDemoData = () => {
    actions.restoreDemoData();
    setIsDataMenuOpen(false);
  };

  const handleChangeProfileName = () => {
    actions.setUserName('');
    setIsDataMenuOpen(false);
  };

  const handleClearAllData = () => {
    actions.clearAllData();
    setIsDataMenuOpen(false);
  };

  const handleLogout = () => {
    actions.setUserName('');
    setIsMobileMenuOpen(false);
  };

  if (!state.userName) {
    return <OnboardingView onComplete={actions.setUserName} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans">
      <Header
        userName={state.userName}
        darkMode={state.darkMode}
        role={state.role}
        activeTab={state.activeTab}
        isDataMenuOpen={isDataMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleDarkMode={actions.toggleDarkMode}
        onSetRole={actions.setRole}
        onSetActiveTab={actions.setActiveTab}
        onToggleDataMenu={() => setIsDataMenuOpen(!isDataMenuOpen)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onRestoreDemoData={handleRestoreDemoData}
        onChangeProfileName={handleChangeProfileName}
        onClearAllData={handleClearAllData}
        onLogout={handleLogout}
      />

      <MobileNavigation
        activeTab={state.activeTab}
        onSetActiveTab={actions.setActiveTab}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {state.activeTab === 'dashboard' && <DashboardView />}
        {state.activeTab === 'insights' && <InsightsView />}
        {state.activeTab === 'transactions' && <TransactionsView />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;