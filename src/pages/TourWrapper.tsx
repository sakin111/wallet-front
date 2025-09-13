

import { useTour } from '@/hook/useTour';
import type { Step } from 'react-joyride';
import Tour from './Tour';

interface TourWrapperProps {
  tourId: string;
  steps: Step[];
  autoStart?: boolean;
  delay?: number;
  children?: React.ReactNode;
}

export function TourWrapper({ 
  tourId, 
  steps, 
  autoStart = false, 
  delay = 1000,
  children 
}: TourWrapperProps) {
  const { tourProps } = useTour({ tourId, steps, autoStart, delay });

  return (
    <>
      <Tour {...tourProps} />
      {children}
    </>
  );
}
