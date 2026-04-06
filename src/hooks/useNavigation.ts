import { useApp } from '../contexts/AppContext';

type TabType = 'dashboard' | 'insights' | 'transactions';

export const useNavigation = () => {
  const { actions } = useApp();

  const navigateTo = (tab: TabType) => {
    actions.setActiveTab(tab);
  };

  return {
    navigateTo
  };
};