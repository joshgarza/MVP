import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";

// if no location.state data, perform a GET request for workouts matching userId and date in params
const ClientWorkoutsDateView = ({
  userId,
  workoutStarted,
  setWorkoutStarted,
}) => {
  const location = useLocation();
  const params = useParams();
  const [workouts, setWorkouts] = useState(location.state?.workout);
  const [workoutIdx, setWorkoutIdx] = useState(location.state?.workoutIdx);
  const date = location.state?.dateString;

  // console.log(location);
  return (
    <>
      {workoutStarted ? (
        <Outlet />
      ) : (
        <div className="flex flex-col h-[85%] justify-between">
          <div>
            <div className="flex flex-col items-center justify-center">
              <div>Here is your workout for</div>
              <div>{date}</div>
            </div>
            <div className="flex flex-col items-start justify-center mt-5 mx-2">
              Workout #{workoutIdx + 1}
              {workouts.map((slot, i) => {
                return (
                  <div className="mx-2 p-2">
                    <li key={i} className="p-2">
                      {slot.exercise}
                    </li>
                    {slot.sets.map((set, j) => {
                      return (
                        <div className="mx-2 my-1">
                          <span>{set.reps} reps </span>
                          <span>@ {set.rir} RIR</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              to={location.state.workoutIdx.toString()}
              state={{ workout: location.state.workout }}
              onClick={() => setWorkoutStarted(true)}
              className="flex items-center justify-center w-[60%] font-semibold bg-slate-300 rounded-full p-2 mx-2"
            >
              Start workout
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientWorkoutsDateView;
