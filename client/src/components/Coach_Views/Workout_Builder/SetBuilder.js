import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineEdit } from "react-icons/ai";
import { GrAddCircle, GrFormSubtract } from "react-icons/gr";

const SetBuilder = ({ screen, setScreen, exercise = "Squat", fields }) => {
  const [setsToAdd, setSetsToAdd] = useState(1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div
      className="flex flex-col space-y-8 w-screen"
      style={{ position: isInputFocused ? "fixed" : "relative" }}
    >
      <div className="">
        <div
          className="flex flex-row items-center space-x-2 px-2 py-4 text-teal-600 font-semibold text-xl"
          onClick={() => setScreen(screen - 1)}
        >
          <AiOutlineLeft />
          <span>Back to {exercise}</span>
        </div>
      </div>
      <div className="m-4">
        <h1 className="flex flex-row items-center justify-center space-x-4 mx-5 py-2 bg-slate-600  rounded-t-xl text-3xl w-3/5 text-neutral-200 font-semibold">
          Set Builder
        </h1>
        <div className="flex flex-row items-center justify-center h-96 shadow px-4 border rounded-xl relative">
          <div className="h-full w-full py-8 text-2xl">
            {fields.map((field, idx) => {
              return (
                field.toggled && (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-between space-y-2"
                  >
                    <div>{field.name}</div>
                    {field.options ? (
                      <select className="border w-1/2">
                        {field.options.map((option, j) => {
                          return (
                            <option key={j} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <input
                        className="border w-1/2"
                        type="number"
                        pattern="[0-9]*"
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                      ></input>
                    )}
                  </div>
                )
              );
            })}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div
              className="flex flex-row items-center justify-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
              onClick={() => setScreen(screen + 1)}
            >
              <AiOutlineEdit />
              <span>Edit fields</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between space-x-4 text-2xl px-6">
        <div className="flex flex-row items-center justify-between space-x-8 border bg-slate-300 rounded-xl px-4 py-2 font-semibold w-52">
          <GrFormSubtract
            onClick={() => setSetsToAdd(Math.max(0, setsToAdd - 1))}
            size={30}
          />
          <span>{setsToAdd}</span>
          <GrAddCircle onClick={() => setSetsToAdd(setsToAdd + 1)} size={30} />
        </div>
        <div className="flex flex-row items-center justify-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold">
          Add set
        </div>
      </div>
    </div>
  );
};

export default SetBuilder;
