import { CATEGORY_COLORS, CATEGORY_TEXT_COLORS, CATEGORY_ICONS } from '../constants/categories';
import type { CategoryType } from '../constants/categories';

export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category as CategoryType] || CATEGORY_COLORS.Other;
};

export const getCategoryTextColor = (category: string): string => {
  return CATEGORY_TEXT_COLORS[category as CategoryType] || CATEGORY_TEXT_COLORS.Other;
};

export const getCategoryIcon = (category: string) => {
  return CATEGORY_ICONS[category as CategoryType] || CATEGORY_ICONS.Other;
};