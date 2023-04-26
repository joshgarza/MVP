import React from "react";

const WorkoutButtons = ({
  screen,
  setScreen,
  workoutLength,
  handlePauseResume,
}) => {
  const buttonStyle =
    "mx-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded";

  const handleEndWorkout = () => {
    handlePauseResume();
    setScreen(workoutLength);
  };
  return (
    <div className="workout-buttons my-4">
      <button
        className={`${buttonStyle} ${screen === 0 && "invisible"}`}
        onClick={() => setScreen(screen - 1)}
      >
        Previous Exercise
      </button>
      <button
        className={`${buttonStyle} ${
          screen === workoutLength - 1 && "invisible"
        }`}
        onClick={() => {
          setScreen(screen + 1);
          console.log(screen);
        }}
      >
        Next Exercise
      </button>
      <button
        className="mx-2 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
        onClick={handleEndWorkout}
      >
        End Workout
      </button>
    </div>
  );
};

export default WorkoutButtons;
