import React from "react";
import { Link } from "react-router-dom";

const SummaryButtons = ({
  screen,
  setScreen,
  handlePauseResume,
  setStartTime,
  setWorkoutStarted,
}) => {
  const buttonStyle =
    "flex items-center justify-center w-[60%] font-semibold bg-slate-300 rounded-full p-2 mx-2";

  return (
    <div className="flex my-4">
      <div
        className={`${buttonStyle} ${screen === 0 && "hidden"}`}
        onClick={() => {
          handlePauseResume();
          setStartTime();
          setScreen(screen - 1);
        }}
      >
        Resume Workout
      </div>
      <Link
        to="/client/dashboard"
        className="flex items-center justify-center w-[60%] font-semibold bg-slate-300 rounded-full p-2 mx-2"
        onClick={() => setWorkoutStarted(false)}
      >
        Submit Workout
      </Link>
    </div>
  );
};

export default SummaryButtons;
