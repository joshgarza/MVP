import dayjs from "dayjs";

export const workoutLookupTable = (workoutList) => {
  const constructedWorkouts = constructWorkouts(workoutList);
  const workoutDates = Object.keys(constructedWorkouts);
  workoutDates.push("Wed Apr 19 2023");
  // console.log(workoutDates);
  // console.log(workoutDates.sort((a, b) => dayjs(a) - dayjs(b)));
  return {
    workoutLookup: constructedWorkouts,
    workoutDates: workoutDates.sort((a, b) => dayjs(a) - dayjs(b)),
  };
};

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
        workoutCollection[date][workout_order][exercise_order].sets[set.set] = {
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
