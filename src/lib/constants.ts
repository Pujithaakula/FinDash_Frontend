export const APP_NAME = 'FinDash';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  USER_NAME: 'finance_user_name',
  TRANSACTIONS: 'finance_transactions',
  DARK_MODE: 'finance_dark_mode'
} as const;

export const BUDGET_LIMIT = 3000;

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  SHORT: 'MMM dd'
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280
} as const;