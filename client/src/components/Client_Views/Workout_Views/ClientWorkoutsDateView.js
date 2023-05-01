import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { apiRequests } from "../../../util/apiRequests";

// if no location.state data, perform a GET request for workouts matching userId and date in params
const ClientWorkoutsDateView = ({
  userId,
  workoutStarted,
  setWorkoutStarted,
}) => {
  const location = useLocation();
  const params = useParams();
  const [workouts, setWorkouts] = useState(location.state?.workout);
  const [workoutIdx, setWorkoutIdx] = useState(params.idx);
  const date = dayjs(params.date).toDate().toDateString();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!location.state) {
      apiRequests
        .getWorkoutByDate(userId, dayjs(params.date).toDate().toDateString())
        .then((result) => {
          const constructedWorkouts = constructWorkouts(result.data);
          setWorkouts(constructedWorkouts[date][0]);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (workouts) {
      setIsLoading(false);
    }
  }, [workouts]);

  const constructWorkouts = (workoutsList) => {
    const workoutCollection = {};

    workoutsList.forEach((set, i) => {
      const {
        id,
        date,
        workout_order,
        exercise_order,
        reps,
        rir,
        rpe,
        weight,
        backoff_percent,
      } = set;
      if (workoutCollection[date]) {
        // add to the date
        if (
          workoutCollection[date][workout_order][exercise_order] !== undefined
        ) {
          // add to exercise
          workoutCollection[date][workout_order][exercise_order].sets[set.set] =
            {
              id: id,
              set: set.set,
              reps: reps,
              rir: rir,
              rpe: rpe,
              weight: weight,
              backoff_percent: backoff_percent,
            };
        } else {
          // create exercise in table
          workoutCollection[date][workout_order][exercise_order] = {
            exercise: set.exercise,
            sets: [],
          };
          workoutCollection[date][workout_order][exercise_order].sets[set.set] =
            {
              id: id,
              set: set.set,
              reps: reps,
              rir: rir,
              rpe: rpe,
              weight: weight,
              backoff_percent: backoff_percent,
            };
        }
        // if (workoutCollection[date][workout_order][exercise_order])
      } else {
        workoutCollection[date] = [];
        workoutCollection[date][workout_order] = [];
        workoutCollection[date][workout_order][exercise_order] = {
          exercise: set.exercise,
          sets: [],
        };
        workoutCollection[date][workout_order][exercise_order].sets[set.set] = {
          id: id,
          set: set.set,
          reps: reps,
          rir: rir,
          rpe: rpe,
          weight: weight,
          backoff_percent: backoff_percent,
        };
      }
    });
    return workoutCollection;
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : workoutStarted ? (
        <Outlet />
      ) : (
        <div className="flex flex-col h-[85%] justify-between">
          <div>
            <div className="flex flex-col items-center justify-center">
              <div>Here is your workout for</div>
              <div>{date}</div>
            </div>
            <div className="flex flex-col items-start justify-center mt-5 mx-2">
              Workout #1
              {workouts &&
                workouts.map((slot, i) => {
                  return (
                    <div key={i} className="mx-2 p-2">
                      <li className="p-2">{slot.exercise}</li>
                      {slot.sets.map((set, j) => {
                        return (
                          <div key={j} className="mx-2 my-1">
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
              to={"0"}
              state={{ workout: workouts }}
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
