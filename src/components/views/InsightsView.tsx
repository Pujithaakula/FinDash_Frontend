import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useFinancialData } from '../../hooks/useFinancialData';
import { useFinancialInsights } from '../../hooks/useFinancialInsights';
import {
  AIFinancialHero,
  InsightCard,
  CategoryDominanceCard,
  CashflowVelocityCard,
  SpendingRhythmCard,
  BigHitCard
} from '../insights';

export const InsightsView: React.FC = () => {
  const { state } = useApp();
  const financialData = useFinancialData(state.transactions, state.userName);
  const { insights } = useFinancialInsights(state.transactions);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* AI Financial Intelligence Hero */}
      <AIFinancialHero 
        userName={state.userName}
        savingsRate={financialData.advancedInsights.savingsRate}
        monthlyTrend={financialData.insights.monthOverMonthStr}
      />

      {/* Key Insights Grid - Compact 3 Column */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.slice(0, 3).map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {/* Detailed Analytics Grid - Compact 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CategoryDominanceCard 
          topCategory={financialData.advancedInsights.topCategory}
          dominanceRatio={financialData.advancedInsights.dominanceRatio}
        />
        
        <CashflowVelocityCard 
          dailyBurnRate={financialData.advancedInsights.dailyBurnRate}
          totalTransactions={financialData.advancedInsights.totalExpenseTransactions}
        />
        
        <SpendingRhythmCard 
          weekdayPct={financialData.advancedInsights.weekdayPct}
          weekendPct={financialData.advancedInsights.weekendPct}
          spenderPersona={financialData.advancedInsights.spenderPersona}
        />
        
        <BigHitCard 
          largestExpense={financialData.advancedInsights.largestExpense}
        />
      </div>
    </div>
  );
};