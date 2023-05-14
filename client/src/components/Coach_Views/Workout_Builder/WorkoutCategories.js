import React from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { formatDate } from "../../../util/formatDate";

const categoryList = ["Strength", "HIIT", "Timed"];

const WorkoutCategories = ({ screen, setScreen, setCategory }) => {
  const { userId, date } = useParams();
  return (
    <div className="flex flex-col space-y-8">
      <div className="">
        <Link
          to={`/coach/workouts/${userId}/${date}`}
          className="flex flex-row items-center space-x-2 px-2 py-4 text-teal-600 font-semibold text-xl"
        >
          <AiOutlineLeft />
          <span>Back to workouts</span>
        </Link>
      </div>
      <div className="m-4">
        <h1 className="flex flex-row items-center justify-center space-x-4 mx-5 py-2 bg-slate-600  rounded-t-xl text-3xl w-4/5 text-neutral-200 font-semibold">
          Workout Categories
        </h1>
        <div className="flex flex-row items-center justify-center h-96 shadow px-8 border rounded-xl relative">
          <div className="flex flex-col space-y-12 text-4xl font-semibold">
            {categoryList.map((category, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-slate-400 rounded-xl px-8 py-2 flex items-center justify-center"
                  onClick={() => {
                    setCategory(category);
                    setScreen(screen + 1);
                  }}
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCategories;
