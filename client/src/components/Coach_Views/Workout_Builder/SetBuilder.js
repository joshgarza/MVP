import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineEdit } from "react-icons/ai";
import { GrAddCircle, GrFormSubtract } from "react-icons/gr";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

const SetBuilder = ({
  screen,
  setScreen,
  fields,
  setFields,
  resetFieldValues,
  currentExerciseIdx,
  workout,
  setWorkout,
}) => {
  const [setsToAdd, setSetsToAdd] = useState(1);
  const [amsap, setAmsap] = useState(false);

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    const copyFields = [...fields];

    if (value === "") {
      copyFields[idx].value = null;
    } else if ((name === "reps") & (value === "AMRAP")) {
      copyFields[idx].value = value;
    } else if (name === "rpe") {
      copyFields[idx].value = parseFloat(value);
    } else {
      copyFields[idx].value = parseInt(value);
    }

    setFields(copyFields);
  };

  const submitSets = () => {
    const fieldsToPush = fields
      .filter((field, idx) => {
        return field.toggled && field.value !== null;
      })
      .map((field) => {
        return { name: field.name, value: field.value };
      });

    const copyWorkout = [...workout];
    const sets = copyWorkout[currentExerciseIdx].sets;

    if (amsap) {
      copyWorkout[currentExerciseIdx].sets.push({
        set: sets.length,
        amsap: true,
        fields: fieldsToPush,
      });
    } else {
      for (let i = 0; i < setsToAdd; i++) {
        copyWorkout[currentExerciseIdx].sets.push({
          set: sets.length,
          amsap: false,
          fields: fieldsToPush,
        });
      }
    }

    setWorkout(copyWorkout);
  };

  return (
    <div className="flex flex-col space-y-4 w-screen">
      <div className="">
        <div
          className="flex flex-row items-center space-x-2 px-2 py-4 text-teal-600 font-semibold text-xl"
          onClick={() => setScreen(screen - 1)}
        >
          <AiOutlineLeft />
          <span>Back to {workout[currentExerciseIdx].name}</span>
        </div>
      </div>
      <div className="mx-4">
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
                      <select
                        className="border w-1/2"
                        name={field.name}
                        defaultValue={field.name === "reps" ? "AMRAP" : 8}
                        onChange={(e) => handleChange(e, idx)}
                      >
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
                        name={field.name}
                        value={field.value === null ? "" : field.value}
                        onChange={(e) => handleChange(e, idx)}
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
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center space-x-4 py-2">
          <p>AMSAP</p>
          <span onClick={() => setAmsap(!amsap)}>
            {amsap ? <BsToggleOn size={40} /> : <BsToggleOff size={40} />}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between space-x-4 text-2xl px-6 w-full">
          {amsap ? (
            <span className="text-lg underline">As many sets as possible</span>
          ) : (
            <div className="flex flex-row items-center justify-between space-x-8 border bg-slate-300 rounded-xl px-4 py-2 font-semibold w-52">
              <GrFormSubtract
                onClick={() => setSetsToAdd(Math.max(0, setsToAdd - 1))}
                size={30}
              />
              <span>{setsToAdd}</span>
              <GrAddCircle
                onClick={() => setSetsToAdd(setsToAdd + 1)}
                size={30}
              />
            </div>
          )}
          <div
            className="flex flex-row items-center justify-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
            onClick={() => {
              submitSets();
              resetFieldValues();
              setScreen(screen - 1);
            }}
          >
            Add set
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetBuilder;
