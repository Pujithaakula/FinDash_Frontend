import {
  Home,
  Utensils,
  Car,
  Zap,
  Film,
  Activity,
  Briefcase,
  Laptop,
  Package
} from 'lucide-react';

export const CATEGORY_COLORS = {
  Housing: 'bg-indigo-500',
  Food: 'bg-emerald-500',
  Transport: 'bg-amber-500',
  Utilities: 'bg-cyan-500',
  Entertainment: 'bg-rose-500',
  Health: 'bg-fuchsia-500',
  Salary: 'bg-teal-500',
  Freelance: 'bg-blue-500',
  Other: 'bg-slate-500'
} as const;

export const CATEGORY_ICONS = {
  Housing: Home,
  Food: Utensils,
  Transport: Car,
  Utilities: Zap,
  Entertainment: Film,
  Health: Activity,
  Salary: Briefcase,
  Freelance: Laptop,
  Other: Package
} as const;

export const CATEGORY_TEXT_COLORS = {
  Housing: 'text-indigo-500 dark:text-indigo-400',
  Food: 'text-emerald-500 dark:text-emerald-400',
  Transport: 'text-amber-500 dark:text-amber-400',
  Utilities: 'text-cyan-500 dark:text-cyan-400',
  Entertainment: 'text-rose-500 dark:text-rose-400',
  Health: 'text-fuchsia-500 dark:text-fuchsia-400',
  Salary: 'text-teal-500 dark:text-teal-400',
  Freelance: 'text-blue-500 dark:text-blue-400',
  Other: 'text-slate-500 dark:text-slate-400'
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;