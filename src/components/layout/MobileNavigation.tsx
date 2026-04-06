import React from 'react';
import { NavigationMenu } from '../navigation';

interface MobileNavigationProps {
  activeTab: 'dashboard' | 'insights' | 'transactions';
  onSetActiveTab: (tab: 'dashboard' | 'insights' | 'transactions') => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onSetActiveTab
}) => {
  return (
    <NavigationMenu 
      activeTab={activeTab} 
      onTabChange={onSetActiveTab} 
      variant="mobile" 
    />
  );
};