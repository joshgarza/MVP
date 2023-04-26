import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import ClientWorkoutsDateView from "./ClientWorkoutsDateView";

// this component should render a list of workouts when path ends in /workout
const ClientWorkouts = () => {
  const location = useLocation();

  return (
    <>
      <Outlet />
    </>
  );
};

export default ClientWorkouts;
