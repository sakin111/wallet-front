
import { useEffect, useState } from "react";
import Joyride, { STATUS } from "react-joyride"; 
import type { Step, CallBackProps} from "react-joyride"; 

interface TourProps {
  steps: Step[];
  runTour?: boolean;
  onFinish?: () => void;
}

export default function Tour({ steps, runTour = false, onFinish }: TourProps) {
  const [run, setRun] = useState(runTour);

  useEffect(() => {
    setRun(runTour);
  }, [runTour]);

const handleJoyrideCallback = (data: CallBackProps) => {
  const status = data.status as "skipped" | "finished" | "error"; 
  if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
    setRun(false);
    onFinish?.();
  }
};


  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: "#2563eb", 
          backgroundColor: "#1f2937", 
          textColor: "#f9fafb",
          arrowColor: "#1f2937",
          zIndex: 10000,
        },
        buttonClose: {
          display: "none",
        },
      }}
    />
  );
}