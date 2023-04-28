import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiRequests } from "../../../util/apiRequests.js";
import Exercise from "./Exercise";
import WorkoutSummary from "./WorkoutSummary";
import WorkoutButtons from "./WorkoutButtons";
import SummaryButtons from "./SummaryButtons";
import useTimer from "../../../util/useTimer";
import { useSwipeable } from "react-swipeable";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId, workoutStarted, setWorkoutStarted }) => {
  const location = useLocation();
  const params = useParams();
  const [workout, setWorkout] = useState(location.state.workout);
  const [workoutResult, setWorkoutResult] = useState(workout);
  const [screen, setScreen] = useState(0);
  const { formatElapsedTime, handleStart, handlePauseResume } = useTimer(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!location.state) {
      console.log("no state info");
    } else {
      setIsLoading(false);
    }
  }, []);

  const updateResult = (e, exerciseIdx, set) => {
    const { name, value } = e.target;

    const copyWorkoutResult = [...workout];
    copyWorkoutResult[exerciseIdx].sets[set][name] = value;
    setWorkoutResult(copyWorkoutResult);

    processChange(copyWorkoutResult[exerciseIdx].sets[set]);
  };

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const saveInput = (set) => {
    apiRequests
      .updateWorkoutResult(set)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const processChange = useCallback(debounce(saveInput), []);

  const handleSwipeLeft = () => {
    if (screen < workout.length - 1) {
      setScreen(screen + 1);
    }
  };

  const handleSwipeRight = () => {
    if (screen > 0) {
      setScreen(screen - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
  });

  return (
    <div {...handlers} className="w-full h-[80%] relative">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="relative">
            <div className="flex items-center justify-center p-4">
              Workout Timer: {formatElapsedTime()}
            </div>
          </div>
          {screen === workout.length ? (
            <>
              <WorkoutSummary workoutResult={workoutResult} />
              <SummaryButtons
                screen={screen}
                setScreen={setScreen}
                handlePauseResume={handlePauseResume}
                setStartTime={handleStart}
                setWorkoutStarted={setWorkoutStarted}
              />
            </>
          ) : (
            <>
              <Exercise
                workout={workout}
                screen={screen}
                updateResult={updateResult}
              />
              <WorkoutButtons
                screen={screen}
                setScreen={setScreen}
                workoutLength={workout.length}
                handlePauseResume={handlePauseResume}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClientWorkoutView;
