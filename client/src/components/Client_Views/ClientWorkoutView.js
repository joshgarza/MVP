import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId, workoustStarted, setWorkoutStarted }) => {
  const location = useLocation();
  const params = useParams();
  const [screen, setScreen] = useState();
  const [workout, setWorkout] = useState();

  useEffect(() => {
    location.state !== undefined
      ? setWorkout(location.state.workout)
      : getWorkout();
  }, []);

  const getWorkout = () => {
    // GET one workout based on userId from props, date and workoutIdx (workout_order) from params
    // axios.get()
  };

  return (
    <div>
      <div>Workout Timer: 5</div>
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
