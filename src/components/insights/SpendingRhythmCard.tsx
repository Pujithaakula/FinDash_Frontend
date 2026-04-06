import React from 'react';
import { CalendarDays, Briefcase, Sun, Clock } from 'lucide-react';

interface SpendingRhythmCardProps {
  weekdayPct: number;
  weekendPct: number;
  spenderPersona: string;
}

export const SpendingRhythmCard: React.FC<SpendingRhythmCardProps> = ({
  weekdayPct,
  weekendPct,
  spenderPersona
}) => {
  const getPersonaInsight = () => {
    if (weekendPct > 60) return "You tend to spend more on weekends - leisure and social activities drive your expenses.";
    if (weekdayPct > 70) return "Your spending is work-week focused - commuting, meals, and business expenses dominate.";
    return "You maintain balanced spending throughout the week with no strong pattern.";
  };

  const getRecommendation = () => {
    if (weekendPct > 60) return "Consider budgeting for weekend activities to avoid overspending.";
    if (weekdayPct > 70) return "Look for ways to optimize work-related expenses.";
    return "Your balanced spending pattern is healthy for budgeting.";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-6 group hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white shadow-lg">
          <CalendarDays size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Spending Rhythm</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {spenderPersona}
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Briefcase size={16} className="text-blue-600 dark:text-blue-400"/>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Weekdays (Mon-Fri)
                </span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {weekdayPct.toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${weekdayPct}%` }} 
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Sun size={16} className="text-purple-600 dark:text-purple-400"/>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Weekends (Sat-Sun)
                </span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {weekendPct.toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${weekendPct}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-start gap-2 mb-2">
              <Clock size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                {getPersonaInsight()}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              💡 {getRecommendation()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};