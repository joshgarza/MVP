import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

// if no location.state data, perform a GET request for workouts matching userId and date in params
const ClientWorkoutsDateView = ({
  userId,
  workoutStarted,
  setWorkoutStarted,
}) => {
  const location = useLocation();
  const params = useParams();
  const [workouts, setWorkouts] = useState(location.state.workout.workout);

  return (
    <>
      {workoutStarted ? (
        <Outlet />
      ) : (
        <>
          <div>Here are your workouts for {params.date}</div>
          <div className="flex flex-col items-start justify-center">
            {workouts.map((slot, i) => {
              return (
                <>
                  <li>{slot.exercise}</li>
                  {slot.sets.map((set, j) => {
                    return (
                      <div className="m-2">
                        <span>{set.reps} reps </span>
                        <span>@ {set.rir} RIR</span>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
          <Link
            to={location.state.workoutIdx.toString()}
            state={{ workout: location.state.workout }}
            onClick={() => setWorkoutStarted(true)}
            className="bg-slate-300 rounded-full p-2 m-2"
          >
            Start workout
          </Link>
        </>
      )}
    </>
  );
};

export default ClientWorkoutsDateView;
