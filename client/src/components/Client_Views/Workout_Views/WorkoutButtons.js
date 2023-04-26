import React from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

const WorkoutButtons = ({
  screen,
  setScreen,
  workoutLength,
  handlePauseResume,
}) => {
  const buttonStyle =
    "mx-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold rounded";

  const handleEndWorkout = () => {
    handlePauseResume();
    setScreen(workoutLength);
  };

  return (
    <div className="absolute bottom-4 inset-x-4 flex justify-between items-center">
      <button
        className={`${buttonStyle} ${screen === 0 && "invisible"}`}
        onClick={() => setScreen(screen - 1)}
      >
        <AiOutlineLeftCircle />
      </button>
      <button
        className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
        onClick={handleEndWorkout}
      >
        End Workout
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
        <AiOutlineRightCircle />
      </button>
    </div>
  );
};

export default WorkoutButtons;
