import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const ClientWorkoutsDate = () => {
  const location = useLocation();
  const params = useParams();
  const [startWorkout, setStartWorkout] = useState(false);

  console.log("params", params);

  return (
    <>
      {startWorkout ? (
        <Outlet />
      ) : (
        <>
          <div>Client workouts date</div>
          <Link
            to="0"
            state={{ workoutList: location.state.workoutList }}
            onClick={() => setStartWorkout(true)}
          >
            Go to workout
          </Link>
        </>
      )}
    </>
  );
};

export default ClientWorkoutsDate;
