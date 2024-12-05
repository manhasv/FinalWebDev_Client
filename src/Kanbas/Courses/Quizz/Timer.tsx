import { useEffect, useState } from "react";
import Time from "./Time";

export default function Timer({ startTime }: { startTime: number }) {
  const [elapsedTimeS, setElapsedTimeS] = useState(0);

  const updateTimer = async () => {
    setElapsedTimeS(Math.floor((Date.now() - startTime) / 1000));
    setTimeout(updateTimer, 250);
  };

  useEffect(() => {
    updateTimer();
  }, []);

  return <Time elapsedS={elapsedTimeS} />;
}
