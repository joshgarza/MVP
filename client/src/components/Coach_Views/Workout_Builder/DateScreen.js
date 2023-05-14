import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequests } from "../../../util/apiRequests";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineLeft } from "react-icons/ai";
import { formatDate } from "../../../util/formatDate";

const DateScreen = () => {
  const { userId, date } = useParams();
  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    apiRequests.getWorkoutByDate(userId, date).then((res) => {
      console.log(res);
      // setWorkoutList([2]);
      setWorkoutList(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      <div className="">
        <Link
          to="/coach/calendar"
          className="flex flex-row items-center space-x-2 px-2 py-4 text-teal-600 font-semibold text-xl"
        >
          <AiOutlineLeft />
          <span>Back to calendar</span>
        </Link>
      </div>
      <div className="m-4">
        <h1 className="flex flex-row items-center justify-center space-x-4 mx-5 py-2 bg-slate-600  rounded-t-xl text-3xl w-3/5 text-neutral-200 font-semibold">
          {formatDate(date)}
        </h1>
        <div className="flex flex-row items-center justify-center h-96 shadow px-4 border rounded-xl relative">
          {workoutList.length === 0 ? (
            <Link
              to={`/coach/workoutbuilder/${userId}/${date}`}
              className="flex flex-row items-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
            >
              <GrAddCircle />
              <span>Add workout</span>
            </Link>
          ) : (
            <div className="relative flex flex-col items-center h-full w-full py-12">
              <div className="font-semibold text-3xl">Strength Workout</div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/2">
                <Link
                  to={`/coach/workoutbuilder/${userId}/${date}`}
                  className="flex flex-row items-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
                >
                  <GrAddCircle />
                  <span>Add workout</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateScreen;
