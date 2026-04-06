import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORY_ICONS } from '../../constants/categories';

interface TransactionCategoryFilterProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearCategories: () => void;
}

export const TransactionCategoryFilter: React.FC<TransactionCategoryFilterProps> = ({
  selectedCategories,
  onCategoryToggle,
  onClearCategories
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="flex items-center gap-1.5 pr-3 mr-1 border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
        <Filter size={14} className="text-slate-400" />
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Categories
        </span>
      </div>
      
      {Object.keys(CATEGORY_ICONS).map(category => {
        const isSelected = selectedCategories.includes(category);
        const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
        
        return (
          <button
            key={category}
            onClick={() => onCategoryToggle(category)}
            className={`snap-start flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              isSelected 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm hover:bg-indigo-700' 
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Icon size={14} strokeWidth={isSelected ? 2.5 : 2} />
            {category}
          </button>
        );
      })}
      
      {selectedCategories.length > 0 && (
        <button 
          onClick={onClearCategories}
          className="snap-start flex-shrink-0 ml-1 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 px-3 py-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
};