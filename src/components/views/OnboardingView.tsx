import React from 'react';
import { UserOnboardingForm } from '../forms';

interface OnboardingViewProps {
  onComplete: (name: string) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  return <UserOnboardingForm onSubmit={onComplete} />;
};