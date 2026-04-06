import React from 'react';
import { TrendingUp, Flame, Activity, Sparkles, Info } from 'lucide-react';
import type { FinancialInsight } from '../../hooks/useFinancialInsights';

interface InsightCardProps {
  insight: FinancialInsight;
}

const getInsightIcon = (iconType: string) => {
  switch (iconType) {
    case 'trend': return TrendingUp;
    case 'category': return Flame;
    case 'frequency': return Activity;
    case 'savings': return Sparkles;
    default: return TrendingUp;
  }
};

const getInsightColor = (type: 'positive' | 'neutral' | 'warning') => {
  switch (type) {
    case 'positive': return 'from-emerald-500 to-green-600';
    case 'warning': return 'from-rose-500 to-red-600';
    default: return 'from-indigo-500 to-blue-600';
  }
};

const getInsightRecommendation = (insight: FinancialInsight) => {
  switch (insight.id) {
    case 'savings-rate':
      if (insight.type === 'positive') return 'Keep up the excellent work!';
      if (insight.type === 'warning') return 'Consider reducing expenses';
      return 'Try to increase income or cut costs';
    case 'top-category':
      return 'Monitor this category closely';
    case 'frequency':
      if (insight.type === 'warning') return 'Consider consolidating purchases';
      return 'Good transaction discipline';
    case 'daily-average':
      return 'Track daily spending patterns';
    default:
      return 'Keep monitoring this metric';
  }
};

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const IconComponent = getInsightIcon(insight.icon);
  const gradientColor = getInsightColor(insight.type);
  const recommendation = getInsightRecommendation(insight);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/60 dark:border-slate-700/60 group p-6">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientColor} text-white shadow-lg`}>
            <IconComponent size={24} />
          </div>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {insight.value}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
          {insight.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
          {insight.description}
        </p>
        
        {/* Additional insight recommendation */}
        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <Info size={16} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};