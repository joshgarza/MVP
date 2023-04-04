import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

const ClientDashboard = () => {

  const textStyle = "text-lg text-white"
  const cardTitleStyle = "text-sm text-gray-200"
  const cardStyle = "row-span-2 bg-[#007e8f]/80 border rounded-3xl w-full my-[.125rem] p-2"

  return (
    <div className="h-[88%] w-full grid grid-rows-9 my-3 text">
      <div className="">
        <div className="font-medium text-xs text-blue-500">TODAY, APR 03</div>
        <div className="font-medium text-3xl">Hello, Josh!</div>
      </div>
      <div className={`${cardStyle} flex flex-col`}>
        <div className={cardTitleStyle}>
          Next Workout:
        </div>
        <div className="relative inset-2">
          <div className={textStyle}>
            Squat
          </div>
          <div className={textStyle}>
            Press
          </div>
          <div className={textStyle}>
            Deadlift
          </div>
        </div>
      </div>
      <div className={`${cardStyle} flex flex-col gap-2`}>
        <div className={`${cardTitleStyle} w-full flex items-start justify-start`}>
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
        <div className="absolute bottom-0 right-2 text-5xl text-blue-400"><AiFillPlusCircle/></div>
      </div>
    </div>
  )
}

export default ClientDashboard;