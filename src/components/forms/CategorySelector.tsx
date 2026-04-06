import React from 'react';
import { CATEGORY_ICONS, CATEGORY_TEXT_COLORS } from '../../constants/categories';

interface CategorySelectorProps {
  category: string;
  onChange: (category: string) => void;
  className?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  onChange,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-1">
        Category
      </label>
      
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-2 px-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {Object.keys(CATEGORY_ICONS).map(cat => {
          const Icon = CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS];
          const isSelected = category === cat;
          const textColor = CATEGORY_TEXT_COLORS[cat as keyof typeof CATEGORY_TEXT_COLORS] || 'text-slate-500';
          
          return (
            <button 
              key={cat} 
              type="button" 
              onClick={() => onChange(cat)} 
              className={`snap-center flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl min-w-[80px] border-2 transition-all duration-200 ${
                isSelected 
                  ? `border-current ${textColor} bg-slate-50 dark:bg-slate-800 shadow-sm` 
                  : 'border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-70 hover:opacity-100'
              }`}
            >
              <Icon size={24} strokeWidth={isSelected ? 2 : 1.5} />
              <span className="text-[11px] font-semibold">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};