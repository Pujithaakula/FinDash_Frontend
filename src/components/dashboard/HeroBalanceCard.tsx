import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FormatCurrency } from '../ui/FormatCurrency';

interface HeroBalanceCardProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  className?: string;
}

export const HeroBalanceCard: React.FC<HeroBalanceCardProps> = ({
  balance,
  totalIncome,
  totalExpense,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      {/* Total Balance Hero Card */}
      <div className="lg:col-span-3 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-black rounded-3xl shadow-xl p-8 md:p-10 text-white border border-slate-800/50">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-8 md:mb-0">
            <div>
              <p className="text-indigo-200/70 font-medium text-sm mb-2 uppercase tracking-wider flex items-center gap-2">
                <Wallet size={16} /> Total Balance
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                <FormatCurrency amount={balance} />
              </h2>
            </div>
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-semibold text-indigo-100 hidden sm:block">
              Updated Live
            </div>
          </div>
          
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                <ArrowUpRight size={24} strokeWidth={2.5}/>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Income</p>
                <p className="text-xl font-bold text-white"><FormatCurrency amount={totalIncome} /></p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400">
                <ArrowDownRight size={24} strokeWidth={2.5}/>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Expenses</p>
                <p className="text-xl font-bold text-white"><FormatCurrency amount={totalExpense} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};