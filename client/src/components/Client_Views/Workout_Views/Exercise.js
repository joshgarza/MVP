import React from "react";
import ExerciseTable from "./ExerciseTable";

const Exercise = ({ workout, screen, updateResult }) => {
  const exercise = workout[screen];
  return (
    <div className="exercise">
      <ExerciseTable
        exercise={exercise.exercise}
        sets={exercise.sets}
        updateResult={updateResult}
        screen={screen}
        readOnly={false}
      />
    </div>
  );
};

export default Exercise;
