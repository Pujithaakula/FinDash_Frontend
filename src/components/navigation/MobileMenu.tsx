import React from 'react';
import { 
  Menu, 
  X, 
  User, 
  Shield, 
  Eye, 
  Moon, 
  Sun, 
  RefreshCw, 
  UserCircle, 
  Trash2,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  userName: string;
  role: 'admin' | 'viewer';
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSetRole: (role: 'admin' | 'viewer') => void;
  onRestoreDemoData: () => void;
  onChangeProfileName: () => void;
  onClearAllData: () => void;
  onLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  userName,
  role,
  darkMode,
  onToggleDarkMode,
  onSetRole,
  onRestoreDemoData,
  onChangeProfileName,
  onClearAllData,
  onLogout
}) => {
  const handleAction = (action: () => void) => {
    action();
    onToggle();
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={onToggle}
        className="sm:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
          onClick={onToggle}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-out sm:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Menu</h2>
            <button
              onClick={onToggle}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile Section */}
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{userName}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Personal Account</p>
                </div>
              </div>
              
              {/* Role Badge */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                role === 'admin' 
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}>
                {role === 'admin' ? <Shield size={16} /> : <Eye size={16} />}
                <span className="text-sm font-semibold">
                  {role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
                </span>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Switch Role
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAction(() => onSetRole('admin'))}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    role === 'admin'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <Shield size={20} className={role === 'admin' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
                  <span className={`text-sm font-semibold ${
                    role === 'admin' ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    Admin
                  </span>
                </button>
                <button
                  onClick={() => handleAction(() => onSetRole('viewer'))}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    role === 'viewer'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <Eye size={20} className={role === 'viewer' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
                  <span className={`text-sm font-semibold ${
                    role === 'viewer' ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    Viewer
                  </span>
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <button
                onClick={onToggleDarkMode}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={20} className="text-indigo-500" /> : <Sun size={20} className="text-amber-500" />}
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Data Management (Admin Only) */}
            {role === 'admin' && (
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Data Management
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleAction(onRestoreDemoData)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                  >
                    <RefreshCw size={18} className="text-indigo-500" />
                    <span className="font-medium">Restore Demo Data</span>
                  </button>
                  <button
                    onClick={() => handleAction(onChangeProfileName)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                  >
                    <UserCircle size={18} className="text-indigo-500" />
                    <span className="font-medium">Change Profile Name</span>
                  </button>
                  <button
                    onClick={() => handleAction(onClearAllData)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 size={18} />
                    <span className="font-medium">Clear All Data</span>
                  </button>
                </div>
              </div>
            )}

            {/* Account Actions */}
            <div className="p-4">
              <button
                onClick={() => handleAction(onChangeProfileName)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors mb-2"
              >
                <User size={18} className="text-slate-500" />
                <span className="font-medium">Edit Profile</span>
              </button>
              <button
                onClick={() => handleAction(onLogout)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              FinDash v1.0 • {role === 'admin' ? 'Admin' : 'Viewer'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
