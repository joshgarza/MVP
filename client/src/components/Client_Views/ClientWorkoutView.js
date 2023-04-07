import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId, workoustStarted, setWorkoutStarted }) => {
  const location = useLocation();
  const params = useParams();

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
