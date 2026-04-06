import React from 'react';
import { ChevronDown } from 'lucide-react';

type RoleType = 'admin' | 'viewer';

interface RoleSwitcherProps {
  role: RoleType;
  onRoleChange: (role: RoleType) => void;
  className?: string;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  role,
  onRoleChange,
  className = ''
}) => {
  return (
    <div className={`hidden sm:flex items-center gap-1.5 text-sm bg-slate-100 dark:bg-slate-900 p-1 rounded-xl ${className}`}>
      <span className="pl-2 pr-1 text-slate-500 dark:text-slate-400 font-medium">
        Role:
      </span>
      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value as RoleType)}
        className="bg-transparent font-bold text-indigo-600 dark:text-indigo-400 outline-none cursor-pointer border-none py-1 pr-2 rounded appearance-none"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
      <ChevronDown size={14} className="text-slate-400 mr-2 pointer-events-none -ml-2" />
    </div>
  );
};