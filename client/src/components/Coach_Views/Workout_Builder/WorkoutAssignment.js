import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

const WorkoutAssignment = ({ screen, setScreen, category, workout }) => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="">
        <div
          className="flex flex-row items-center space-x-2 px-2 py-4 text-teal-600 font-semibold text-xl"
          onClick={() => setScreen(screen - 1)}
        >
          <AiOutlineLeft />
          <span>Back to categories</span>
        </div>
      </div>
      <div className="m-4">
        <h1 className="flex flex-row items-center justify-center space-x-4 mx-5 py-2 bg-slate-600  rounded-t-xl text-3xl text-neutral-200 font-semibold">
          {category} Workout
        </h1>
        <div className="flex flex-row items-center justify-center h-96 shadow px-4 border rounded-xl relative">
          {workout.length === 0 ? (
            <div
              className="flex flex-row items-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
              onClick={() => setScreen(screen + 1)}
            >
              <GrAddCircle />
              <span>Add exercise</span>
            </div>
          ) : (
            <div className="relative flex flex-col items-center h-full w-full py-12">
              <div className="font-semibold text-3xl">Workout renders here</div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/2">
                <div
                  className="flex flex-row items-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
                  onClick={() => setScreen(screen + 1)}
                >
                  <GrAddCircle />
                  <span>Add exercise</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutAssignment;
