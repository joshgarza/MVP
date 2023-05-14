import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";

const ExerciseAssignment = ({
  screen,
  setScreen,
  workout,
  category,
  setWorkout,
  currentExerciseIdx,
  deleteExercise,
}) => {
  const [exercise, setExercise] = useState(
    workout[currentExerciseIdx]?.name || ""
  );

  const updateExerciseName = (e, idx) => {
    const { value } = e.target;
    const copyWorkout = [...workout];

    copyWorkout.length === currentExerciseIdx
      ? copyWorkout.push({ name: value, sets: [] })
      : (copyWorkout[currentExerciseIdx].name = value);

    setExercise(value);
    setWorkout(copyWorkout);
  };

  const deleteSet = (idx) => {
    const copyWorkout = [...workout];

    copyWorkout[currentExerciseIdx].sets.splice(idx, 1);
    setWorkout(copyWorkout);
  };

  const renderSetShorthand = (exerciseSet) => {
    const { set, fields, amsap } = exerciseSet;
    console.log(amsap);
    let setStr = `Set ${set + 1}: `;
    let amsapStr = "";
    if (amsap === true) amsapStr = "for AMSAP";

    const fieldFormatMap = {
      weight: (value) => `${value}lbs x `,
      reps: (value) => (value === "AMRAP" ? `${value} ` : `${value} reps `),
      rpe: (value) => `@ RPE ${value} `,
      "backoff %": (value) => `@ -${value}% `,
      "e1rm%": (value) => `@ ${value}% e1RM `,
      "% of max": (value) => `@ ${value}% max `,
    };

    const priority = [
      "weight",
      "reps",
      "rpe",
      "backoff %",
      "e1rm%",
      "% of max",
    ];
    fields.sort((a, b) => priority.indexOf(a.name) - priority.indexOf(b.name));

    for (const field of fields) {
      if (fieldFormatMap[field.name] && field.value !== null) {
        setStr += `${fieldFormatMap[field.name](field.value)}`;
      }
    }

    return setStr.trim() + " " + amsapStr;
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="">
        <div
          className="flex flex-row items-center space-x-2 px-2 py-4 text-teal-600 font-semibold text-xl"
          onClick={() => {
            exercise === "" && deleteExercise();
            setScreen(screen - 1);
          }}
        >
          <AiOutlineLeft />
          <span>Back to {category} workout</span>
        </div>
      </div>
      <div className="m-4">
        <div className="  mx-5 py-2 bg-slate-600  rounded-t-xl text-xl w-[90%]">
          <div className="flex flex-row items-center justify-center space-x-2 px-2">
            <h1 className="text-neutral-200 font-semibold">Exercise:</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(
                  "do something with form submit for exercise name. ExerciseAssignment Line 38"
                );
              }}
            >
              <input
                className="px-2 w-4/5"
                placeholder="exercise name"
                value={exercise}
                name="exerciseName"
                onChange={(e) => updateExerciseName(e, currentExerciseIdx)}
              />
            </form>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center h-96 shadow px-4 border rounded-xl relative">
          {workout[currentExerciseIdx].sets.length > 0 ? (
            <div className="relative flex flex-col items-center h-full w-full py-12">
              <div className="overflow-auto w-full">
                {workout[currentExerciseIdx].sets.map((set, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row justify-between font-semibold text-xl"
                  >
                    <p>{renderSetShorthand(set)}</p>
                    <GrSubtractCircle onClick={() => deleteSet(idx)} />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/2">
                <div
                  className="flex flex-row items-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
                  onClick={() => setScreen(screen + 1)}
                >
                  <GrAddCircle />
                  <span>Add set</span>
                </div>
              </div>
            </div>
          ) : exercise.length > 0 ? (
            <div
              className="flex flex-row items-center space-x-4 border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
              onClick={() => setScreen(screen + 1)}
            >
              <GrAddCircle />
              <span>Add set</span>
            </div>
          ) : (
            <div>Add an exercise name</div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div
          className="border bg-slate-300 rounded-xl px-4 py-2 font-semibold"
          onClick={() => {
            exercise === "" && deleteExercise(currentExerciseIdx);
            setScreen(screen - 1);
          }}
        >
          Submit Exercise
        </div>
      </div>
    </div>
  );
};

export default ExerciseAssignment;
