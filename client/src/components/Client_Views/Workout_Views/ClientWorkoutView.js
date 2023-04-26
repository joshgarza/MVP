import React, { useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiRequests } from "../../../util/apiRequests.js";
import Exercise from "./Exercise";
import WorkoutSummary from "./WorkoutSummary";
import WorkoutButtons from "./WorkoutButtons";
import SummaryButtons from "./SummaryButtons";
import useTimer from "../../../util/useTimer";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId, workoutStarted, setWorkoutStarted }) => {
  const location = useLocation();
  const params = useParams();
  const [workout, setWorkout] = useState(location.state.workout);
  const [workoutResult, setWorkoutResult] = useState(workout);
  const [screen, setScreen] = useState(0);
  const { formatElapsedTime, handleStart, handlePauseResume } = useTimer(true);

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
    console.log(set);
    apiRequests
      .updateWorkoutResult(set)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const processChange = useCallback(debounce(saveInput), []);

  return (
    <div className="w-full">
      <div className="relative h-full">
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
    </div>
  );
};

export default ClientWorkoutView;
