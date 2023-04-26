import { useState, useEffect } from "react";

const useTimer = (initialIsActive = true) => {
  const [startTime, setStartTime] = useState(new Date());
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [storedTime, setStoredTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        let currTime = new Date();
        setElapsedTime((elapsedTime) => currTime - startTime + storedTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, startTime, storedTime]);

  const formatElapsedTime = () => {
    const SEC = 1000,
      MIN = 60 * SEC,
      HRS = 60 * MIN;

    const hrs = Math.floor(elapsedTime / HRS);
    const min = Math.floor((elapsedTime % HRS) / MIN).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const sec = Math.floor((elapsedTime % MIN) / SEC).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });

    return `${hrs}:${min}:${sec}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setStartTime(new Date());
  };

  const handlePauseResume = () => {
    setStoredTime(elapsedTime);
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setElapsedTime(0);
  };

  return {
    elapsedTime,
    formatElapsedTime,
    isActive,
    isPaused,
    handleStart,
    handlePauseResume,
    handleReset,
  };
};

export default useTimer;
