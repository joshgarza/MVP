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
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {}, []);

  const timeInterval = () => {
    let interval = setInterval(() => {
      let currTime = new Date();
      setElapsedTime((elapsedTime) => currTime - startTime);
    }, 1000);
  };

  const formatElapsedTime = () => {
    const diff = elapsedTime;
    const SEC = 1000,
      MIN = 60 * SEC,
      HRS = 60 * MIN;

    const hrs = Math.floor(diff / HRS);
    const min = Math.floor((diff % HRS) / MIN).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const sec = Math.floor((diff % MIN) / SEC).toLocaleString("en-US", {
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
    screen === workout.length && <div>Workout Summary</div>;

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
          onClick={() => setScreen(screen + 1)}
        >
          Next screen
        </div>
        <div
          className={`${buttonStyle} ${screen === 0 && "hidden"}`}
          onClick={() => setScreen(screen - 1)}
        >
          Previous screen
        </div>
        <div
          className={`${buttonStyle}`}
          onClick={() => setScreen(workout.length)}
        >
          End Workout
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    return <div>Workout summary</div>;
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
