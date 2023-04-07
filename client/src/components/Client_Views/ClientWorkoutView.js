import React from "react";
import { useLocation, useParams } from "react-router-dom";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId }) => {
  const location = useLocation();
  const params = useParams();

  return <div>Workout timer:</div>;
};

export default ClientWorkoutView;
