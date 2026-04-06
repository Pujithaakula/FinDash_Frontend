import React from 'react';
import { Sparkles, ArrowUpRight, ArrowDownRight, Activity, TrendingUp } from 'lucide-react';

interface AIFinancialHeroProps {
  userName: string;
  savingsRate: number;
  monthlyTrend: string;
}

export const AIFinancialHero: React.FC<AIFinancialHeroProps> = ({
  userName,
  savingsRate,
  monthlyTrend
}) => {
  const firstName = userName.split(' ')[0] || 'there';
  
  const getPersonalizedMessage = () => {
    if (savingsRate > 20) return `Exceptional financial health, ${firstName}`;
    if (savingsRate > 0) return `Building momentum, ${firstName}`;
    if (savingsRate < -10) return `Attention needed, ${firstName}`;
    return `Let's optimize, ${firstName}`;
  };

  const getAIDescription = () => {
    if (savingsRate > 20) return "You're saving excellently - keep it up! Your financial discipline is paying off with strong savings growth.";
    if (savingsRate > 0) return "Good progress on your financial journey. Small optimizations could boost your savings rate even further.";
    return "Review spending patterns to improve balance. Focus on identifying areas where you can reduce expenses.";
  };

  const getSavingsColor = () => {
    if (savingsRate > 20) return 'text-emerald-400';
    if (savingsRate > 0) return 'text-blue-400';
    return 'text-rose-400';
  };

  const getTrendIcon = () => {
    const rate = savingsRate;
    if (rate > 0) return ArrowUpRight;
    return ArrowDownRight;
  };

  const getFinancialHealthScore = () => {
    if (savingsRate > 20) return { score: 'Excellent', color: 'text-emerald-400' };
    if (savingsRate > 10) return { score: 'Good', color: 'text-blue-400' };
    if (savingsRate > 0) return { score: 'Fair', color: 'text-yellow-400' };
    return { score: 'Needs Attention', color: 'text-rose-400' };
  };

  const TrendIcon = getTrendIcon();
  const healthScore = getFinancialHealthScore();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-black rounded-3xl shadow-xl p-8 md:p-10 text-white border border-slate-800/50">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 justify-between items-start">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={16} className="animate-pulse" /> 
            AI Financial Intelligence
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {getPersonalizedMessage()}
          </h1>
          
          <p className="text-lg text-indigo-200/80 font-medium leading-relaxed mb-6">
            {getAIDescription()}
          </p>

          {/* Financial Health Score */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className={healthScore.color} />
              <span className="text-sm text-indigo-200/70 font-medium">Financial Health:</span>
              <span className={`text-lg font-bold ${healthScore.color}`}>{healthScore.score}</span>
            </div>
          </div>
        </div>
        
        {/* Right Metrics */}
        <div className="flex flex-col gap-6 w-full lg:w-auto lg:min-w-[280px]">
          {/* Savings Rate */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <p className="text-indigo-200/70 font-bold text-sm uppercase tracking-wider mb-2">
              Savings Rate
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-4xl font-extrabold ${getSavingsColor()}`}>
                {Math.abs(savingsRate).toFixed(1)}%
              </span>
              <TrendIcon size={24} className={getSavingsColor()} />
            </div>
            <p className="text-xs text-indigo-200/60 mt-2">
              {savingsRate > 0 ? 'Above break-even' : 'Below break-even'}
            </p>
          </div>
          
          {/* Monthly Trend */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <p className="text-indigo-200/70 font-bold text-sm uppercase tracking-wider mb-2">
              Monthly Trend
            </p>
            <div className="flex items-center gap-3 mb-2">
              <Activity size={20} className="text-blue-400" />
              <span className="text-white font-semibold text-lg">
                {monthlyTrend.includes('lower') ? 'Spending Down' : 
                 monthlyTrend.includes('higher') ? 'Spending Up' : 'Stable'}
              </span>
            </div>
            <p className="text-xs text-indigo-200/60 leading-relaxed">
              {monthlyTrend}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};