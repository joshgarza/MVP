import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId, workoutStarted, setWorkoutStarted }) => {
  const location = useLocation();
  const params = useParams();
  const [workout, setWorkout] = useState(location.state.workout);
  const [screen, setScreen] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [storedTime, setStoredTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && isPaused === false) {
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
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setStoredTime(elapsedTime);
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setElapsedTime(0);
  };

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

  const getWorkout = () => {
    // GET one workout based on userId from props, date and workoutIdx (workout_order) from params
    // axios.get()
  };

  const buttonStyle =
    "flex items-center justify-center w-[60%] font-semibold bg-slate-300 rounded-full p-2 mx-2";

  const renderScreen = (exerciseIdx) => {
    const { exercise, sets } = workout[exerciseIdx];

    return (
      <div>
        Exercise: {exercise}
        <div>
          {sets.map((set, i) => {
            const availableProps = removeNullProps(set);

            return Object.keys(availableProps).map((property, j) => {
              return (
                <div key={j}>
                  {property}: {availableProps[property]}
                </div>
              );
            });
          })}
        </div>
        <div
          className={`${buttonStyle} ${
            screen === workout.length - 1 && "hidden"
          }`}
          onClick={() => {
            setScreen(screen + 1);
          }}
        >
          Next screen
        </div>
        <div
          className={`${buttonStyle} ${screen === 0 && "hidden"}`}
          onClick={() => {
            setScreen(screen - 1);
          }}
        >
          Previous screen
        </div>
        <div
          className={`${buttonStyle}`}
          onClick={() => {
            handlePauseResume();
            setScreen(workout.length);
          }}
        >
          End Workout
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <>
        <div
          className={`${buttonStyle} ${screen === 0 && "hidden"}`}
          onClick={() => {
            handlePauseResume();
            setStartTime(new Date());
            setScreen(screen - 1);
          }}
        >
          Previous screen
        </div>
        <Link
          to="/client"
          className="flex items-center justify-center w-[60%] font-semibold bg-slate-300 rounded-full p-2 mx-2"
          onClick={() => setWorkoutStarted(false)}
        >
          Back Home
        </Link>
      </>
    );
  };

  const removeNullProps = (set) => {
    const availableProps = {};

    Object.keys(set).forEach((key) => {
      return set[key] !== null && (availableProps[key] = set[key]);
    });

    return availableProps;
  };

  return (
    <div>
      <div className="relative h-full">
        <div className="flex items-center justify-center p-4">
          Workout Timer: {formatElapsedTime()}
        </div>
      </div>
      {screen === workout.length ? renderSummary() : renderScreen(screen)}
    </div>
  );
};

export default ClientWorkoutView;
