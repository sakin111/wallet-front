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
    const { status  } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      onFinish?.(); // callback to parent
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
          primaryColor: "#2563eb", // Tailwind blue-600
          backgroundColor: "#1f2937", // dark tooltip
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
