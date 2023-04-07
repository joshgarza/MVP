import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId, workoustStarted, setWorkoutStarted }) => {
  const location = useLocation();
  const params = useParams();
  // const [screen, setScreen] = useState();
  // const [workout, setWorkout] = useState();
  const [startTime, setStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      let currTime = new Date();
      setElapsedTime((elapsedTime) => currTime - startTime);
      console.log(elapsedTime);
    }, 1000);
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

  return (
    <div>
      <div>Workout Timer: {formatElapsedTime()}</div>
      <Link
        to="/client"
        className="bg-blue-400/80 rounded-full p-2"
        onClick={() => setWorkoutStarted(false)}
      >
        End Workout
      </Link>
    </div>
  );
};

export default ClientWorkoutView;
