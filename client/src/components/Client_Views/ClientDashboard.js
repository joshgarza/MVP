import React from "react";
import { AiFillPlusCircle, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

// State needed:
// - next workout (pass to Link state and set to: /workouts/:workout_id)
// - all tasks (Link to: /tasks -> /tasks/:task_id)
const ClientDashboard = () => {
  const textStyle = "text-lg text-white";
  const cardTitleStyle = "text-base text-gray-200";
  const cardStyle =
    "row-span-2 bg-[#007e8f]/80 border rounded-3xl w-full my-[.125rem] p-2";

  return (
    <div className="h-[86%] w-full grid grid-rows-9 my-3 text">
      <div className="">
        <div className="font-medium text-sm text-blue-500">TODAY, APR 03</div>
        <div className="font-medium text-3xl">Hello, Josh!</div>
      </div>
      <div className={`${cardStyle} flex flex-col relative`}>
        <div className={cardTitleStyle}>Next Workout:</div>
        <div className="relative inset-2">
          <div className={textStyle}>Squat</div>
          <div className={textStyle}>Press</div>
          <div className={textStyle}>Deadlift</div>
        </div>
        <Link
          className="flex items-center justify-between absolute bottom-0 right-0 m-4 p-3 rounded-full bg-blue-400/40 text-white"
          to="/workouts/2"
        >
          <span className="mx-2">Go to workout</span>
          <AiOutlineArrowRight />
        </Link>
      </div>
      <div className={`${cardStyle} flex flex-col gap-2`}>
        <div
          className={`${cardTitleStyle} w-full flex items-start justify-start`}
        >
          Progress Summary
        </div>
        <div className="relative inset-2">
          <div className={textStyle}>Lifting streak: 14 days!</div>
          <div className={textStyle}>Tons moved: 20</div>
          <div className={textStyle}>Cats Lifted: 1483</div>
        </div>
      </div>
      <div className={`${cardStyle} flex flex-col gap-2 mb-8`}>
        <div className={cardTitleStyle}>Tasks</div>
        <div className="relative inset-2">
          <div className={textStyle}>Upload progress photo</div>
          <div className={textStyle}>Upload most recent bodyweight</div>
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
