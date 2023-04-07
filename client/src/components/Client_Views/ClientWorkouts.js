import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import ClientWorkoutsDate from "./ClientWorkoutsDate";

const ClientWorkouts = () => {
  const location = useLocation();
  // const { date, workoutList } = location.state;
  // const { workout } = workoutList;

  // console.log(workoutList.workout, "workoutlist data");

  return (
    <>
      <Outlet />
      {/* <div>{date}</div>
      <div>Workout Summary:</div>
      <div>
        {workoutList.workout.map((slot, i) => {
          return (
            <li>
              {slot.exercise}
              {slot.sets.map((set, j) => {
                return (
                  <li>
                    {set.reps} reps @ {set.rir} RIR
                  </li>
                );
              })}
            </li>
          );
        })}
      </div> */}
    </>
  );
};

export default ClientWorkouts;
