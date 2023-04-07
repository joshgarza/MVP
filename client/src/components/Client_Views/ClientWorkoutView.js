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

  useEffect(() => {
    // let interval = setInterval(() => {
    //   let currTime = new Date();
    //   setElapsedTime((elapsedTime) => currTime - startTime);
    //   console.log(elapsedTime);
    // }, 1000);
  }, []);

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
        {screen === 0 ? (
          <div
            className="bg-blue-400/80 rounded-full"
            onClick={() => setScreen(screen + 1)}
          >
            Next screen
          </div>
        ) : screen !== workout.length - 1 ? (
          <>
            <div
              className="bg-blue-400/80 rounded-full"
              onClick={() => setScreen(screen - 1)}
            >
              Previous screen
            </div>
            <div
              className="bg-blue-400/80 rounded-full"
              onClick={() => setScreen(screen + 1)}
            >
              Next screen
            </div>
          </>
        ) : (
          <>
            <div
              className="bg-blue-400/80 rounded-full"
              onClick={() => setScreen(screen - 1)}
            >
              Previous screen
            </div>
            <Link
              to="/client"
              className="flex items-center justify-center absolute bottom-0 inset-x-0 m-8 bg-blue-400/80 rounded-full p-2"
              onClick={() => setWorkoutStarted(false)}
            >
              End Workout
            </Link>
          </>
        )}
        {/* {screen < workout.length - 1 && screen !== 0 ? (
          <>
            <div
              className="bg-blue-400/80 rounded-full"
              onClick={() => setScreen(screen - 1)}
            >
              Previous screen
            </div>
            <div
              className="bg-blue-400/80 rounded-full"
              onClick={() => setScreen(screen + 1)}
            >
              Next screen
            </div>
          </>
        ) : (
          <>
            <div
              className="bg-blue-400/80 rounded-full"
              onClick={() => setScreen(screen - 1)}
            >
              Previous screen
            </div>
            <Link
              to="/client"
              className="flex items-center justify-center absolute bottom-0 inset-x-0 m-8 bg-blue-400/80 rounded-full p-2"
              onClick={() => setWorkoutStarted(false)}
            >
              End Workout
            </Link>
          </>
        )}*/}
      </div>
    );
  };

  const removeNullProps = (set) => {
    const availableProps = {};

    Object.keys(set).forEach((key) => {
      return set[key] !== null && (availableProps[key] = set[key]);
    });

    return availableProps;
  };

  return <>{renderScreen(screen)}</>;
};

export default ClientWorkoutView;

// <div className="relative h-full">
//   <div className="flex items-center justify-center p-4">
//     Workout Timer: {formatElapsedTime()}
//   </div>
// </div>
