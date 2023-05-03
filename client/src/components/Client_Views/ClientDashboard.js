import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import dayjs from "dayjs";
import { workoutLookupTable } from "../../util/workoutLookupTable";
import { BsArrowReturnRight } from "react-icons/bs";
import { apiRequests } from "../../util/apiRequests";
import dayOfYear from "dayjs/plugin/dayOfYear";

// State needed:
// - next workout (pass to Link state and set to: /workouts/:workout_id)
// - all tasks (Link to: /tasks -> /tasks/:task_id)
const ClientDashboard = ({ userInfo, clientWorkouts, setClientWorkouts }) => {
  dayjs.extend(dayOfYear);
  const { logout, loading, setLoading, userObject } = useAuth();
  const [error, setError] = useState("");
  const [nextWorkout, setNextWorkout] = useState([]);
  const [nextWorkoutDate, setNextWorkoutDate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    apiRequests.getWorkouts(userObject.id).then((result) => {
      setClientWorkouts(result.data);
      findNextWorkout(result.data);
    });
  }, []);

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  const firstName = () => {
    if (userObject.name) {
      return (
        userObject.name.split(" ")[0].charAt(0).toUpperCase() +
        userObject.name.split(" ")[0].slice(1)
      );
    } else {
      return null;
    }
  };
  const findNextWorkout = (workoutList) => {
    const { workoutLookup, workoutDates } = workoutLookupTable(workoutList);
    const today = dayjs().toDate().toDateString();

    for (const date of workoutDates) {
      if (dayjs(date) >= dayjs(today)) {
        setNextWorkout(workoutLookup[date][0]);
        setNextWorkoutDate(date);
        break;
      }
    }
  };

  const renderNextWorkout = () => {
    if (clientWorkouts.length === 0) {
      return (
        <div className="p-4 text-white flex flex-col items-center justify-between text-xl gap-5">
          <span>No workouts scheduled!</span>
        </div>
      );
    } else {
      return (
        <>
          <div className="text-xl text-white flex flex-col items-center justify-evenly gap-4">
            <div className="underline">{nextWorkoutDate}</div>
            <div className="flex flex-col">
              {nextWorkout.map((slot, i) => (
                <div key={i}>{slot.exercise}</div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-white text-3xl">
            <Link
              to={`/client/workouts/${dayjs(nextWorkoutDate).format(
                "MM-DD-YYYY"
              )}`}
              state={{
                workout: nextWorkout,
                workoutIdx: 0,
                dateString: dayjs(nextWorkoutDate).toDate().toDateString(),
              }}
              className=""
            >
              <BsArrowReturnRight />
            </Link>
          </div>
        </>
      );
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-[86%] w-full grid grid-rows-9 text m-2 p-2">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="font-medium text-sm text-blue-500">
            {dayjs().toDate().toDateString()}
          </div>
          <div
            className="cursor-pointer shadow-md rounded bg-slate-700/60 text-white m-4 px-2 py-1"
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
      </div>
      <div className="relative">
        <div className="hidden absolute bottom-0 right-2 text-5xl text-blue-400">
          <AiFillPlusCircle />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
