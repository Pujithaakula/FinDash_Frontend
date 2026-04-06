import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface UserOnboardingFormProps {
  onSubmit: (userName: string) => void;
  className?: string;
}

export const UserOnboardingForm: React.FC<UserOnboardingFormProps> = ({
  onSubmit,
  className = ''
}) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(name.trim());
    setIsSubmitting(false);
  };

  const isValid = name.trim().length >= 2;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 ${className}`}>
      <div className="w-full max-w-md">
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <div className="p-8 text-center">
            {/* App Icon */}
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User size={32} className="text-white" strokeWidth={2} />
            </div>
            
            {/* Welcome Text */}
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to FinDash
            </h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Let's personalize your dashboard. What should we call you?
            </p>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                  maxLength={50}
                  autoFocus
                  disabled={isSubmitting}
                />
              </div>
              
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Setting up...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Continue to Dashboard
                    <ArrowRight size={18} />
                  </div>
                )}
              </Button>
            </form>
            
            {/* Validation Message */}
            {name.length > 0 && !isValid && (
              <p className="text-rose-400 text-sm mt-3">
                Name must be at least 2 characters long
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};