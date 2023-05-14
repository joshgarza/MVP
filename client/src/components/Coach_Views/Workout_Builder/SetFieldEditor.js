import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";

const SetFieldEditor = ({ screen, setScreen, fields, updateFields }) => {
  console.log(fields);

  return (
    <div className="flex flex-col space-y-8">
      <div className="">
        <div
          className="flex flex-row items-center space-x-2 px-2 py-4 text-teal-600 font-semibold text-xl"
          onClick={() => setScreen(screen - 1)}
        >
          <AiOutlineLeft />
          <span>Back to Set Builder</span>
        </div>
      </div>
      <div className="m-4">
        <h1 className="flex flex-row items-center justify-center space-x-4 mx-5 py-2 bg-slate-600  rounded-t-xl text-3xl w-3/5 text-neutral-200 font-semibold">
          Field Editor
        </h1>
        <div className="flex flex-row items-center justify-center h-96 shadow px-4 border rounded-xl relative">
          <div className="h-full w-full py-8 text-2xl">
            {fields.map((field, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-row items-center justify-between space-y-2"
                >
                  <div>{field.name}</div>
                  <div onClick={() => updateFields(idx)}>
                    {field.toggled ? <GrSubtractCircle /> : <GrAddCircle />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default SetFieldEditor;
