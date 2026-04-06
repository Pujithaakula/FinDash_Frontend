import React from 'react';
import { Wallet } from 'lucide-react';

export const Brand: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-indigo-600 p-2 rounded-lg">
        <Wallet className="text-white" size={20} />
      </div>
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
        FinDash
      </h1>
    </div>
  );
};