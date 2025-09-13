// hooks/useTour.ts
import { useState, useCallback, useEffect } from 'react';
import type { Step } from 'react-joyride';

interface UseTourOptions {
  tourId: string;
  steps: Step[];
  autoStart?: boolean;
  delay?: number;
}

interface UseTourReturn {

  isRunning: boolean;
  

  startTour: () => void;
  stopTour: () => void;
  resetTour: () => void;
  
  // Tour status
  hasSeenTour: boolean;
  

  tourProps: {
    steps: Step[];
    runTour: boolean;
    onFinish: () => void;
  };
}

export function useTour({ 
  tourId, 
  steps, 
  autoStart = false, 
  delay = 1000 
}: UseTourOptions): UseTourReturn {
  const [isRunning, setIsRunning] = useState(false);
  const storageKey = `tour_${tourId}_completed`;


  const hasSeenTour = localStorage.getItem(storageKey) === 'true';


  const startTour = useCallback(() => {
    setIsRunning(true);
  }, []);


  const stopTour = useCallback(() => {
    setIsRunning(false);
    localStorage.setItem(storageKey, 'true');
  }, [storageKey]);


  const resetTour = useCallback(() => {
    localStorage.removeItem(storageKey);
    setIsRunning(true);
  }, [storageKey]);


  useEffect(() => {
    if (autoStart && !hasSeenTour) {
      const timer = setTimeout(() => {
        startTour();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [autoStart, hasSeenTour, delay, startTour]);


  const tourProps = {
    steps,
    runTour: isRunning,
    onFinish: stopTour,
  };

  return {
    isRunning,
    startTour,
    stopTour,
    resetTour,
    hasSeenTour,
    tourProps,
  };
}

