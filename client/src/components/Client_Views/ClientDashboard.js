import React, { useState } from "react";
import { AiFillPlusCircle, AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import dayjs from "dayjs";
import { workoutLookupTable } from "../../util/workoutLookupTable";
import { BsArrowReturnRight } from "react-icons/bs";

// State needed:
// - next workout (pass to Link state and set to: /workouts/:workout_id)
// - all tasks (Link to: /tasks -> /tasks/:task_id)
const ClientDashboard = ({ clearUserInfo, userInfo, clientWorkouts }) => {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const textStyle = "text-lg text-white";

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      clearUserInfo();
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  const firstName = () => {
    if (userInfo.name) {
      return (
        userInfo.name.split(" ")[0].charAt(0).toUpperCase() +
        userInfo.name.split(" ")[0].slice(1)
      );
    } else {
      return null;
    }
  };

  const renderNextWorkout = () => {
    // console.log(clientWorkouts);
    if (clientWorkouts.length === 0) {
      return (
        <div className="p-4 text-white flex flex-col items-center justify-between text-xl gap-5">
          <span>No workouts scheduled!</span>
        </div>
      );
    } else {
      const { workoutLookup, workoutDates } =
        workoutLookupTable(clientWorkouts);
      const today = dayjs().toDate().toDateString();
      let nextWorkout = {};
      let nextWorkoutDate;

      for (const date of workoutDates) {
        console.log(dayjs(date), dayjs(today));
        if (dayjs(date) >= dayjs(today)) {
          nextWorkout = workoutLookup[date][0];
          nextWorkoutDate = date;
          break;
        }
      }
      return (
        <div className="text-xl text-white flex flex-col items-center justify-evenly gap-4">
          <div className="underline">{nextWorkoutDate}</div>
          <div className="flex flex-col">
            {nextWorkout.map((slot) => (
              <div>{slot.exercise}</div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-[86%] w-full grid grid-rows-9 text m-2 p-2">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="font-medium text-sm text-blue-500">
            {dayjs().toDate().toDateString()}
          </div>
          <div
            className="shadow-md rounded bg-slate-700/60 text-white m-4 px-2 py-1"
            onClick={handleLogout}
          >
            Log Out
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium text-3xl">Hello, {firstName()}!</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-2 shadow-lg rounded-3xl bg-slate-500/40 mx-8 p-8 relative">
        <div className="text-white text-3xl p-3 mb-3">Next Workout:</div>
        {renderNextWorkout()}
        <div className="absolute bottom-4 right-4 text-white text-3xl">
          <BsArrowReturnRight />
        </div>
      </div>
      <div className="relative">
        <div className="absolute bottom-0 right-2 text-5xl text-blue-400">
          <AiFillPlusCircle />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
