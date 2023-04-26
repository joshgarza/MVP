import React from "react";
import ExerciseTable from "./ExerciseTable";

const WorkoutSummary = ({ workoutResult }) => {
  return (
    <>
      <div className="flex items-center justify-center">Workout Summary</div>
      {workoutResult.map((slot, i) => {
        return (
          <ExerciseTable
            key={i}
            exercise={slot.exercise}
            sets={slot.sets}
            readOnly={false}
          />
        );
      })}
    </>
  );
};

export default WorkoutSummary;
