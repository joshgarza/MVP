import React, { useState } from "react";
import WorkoutCategories from "./WorkoutCategories";
import WorkoutAssignment from "./WorkoutAssignment";
import ExerciseAssignment from "./ExerciseAssignment";
import SetBuilder from "./SetBuilder";
import SetFieldEditor from "./SetFieldEditor";
import { Link, useParams } from "react-router-dom";

const workoutBuilderScreens = [
  "WorkoutCategories",
  "WorkoutAssignment",
  "ExerciseAssignment",
  "SetBuilder",
  "SetFieldEditor",
];

const workoutTemplate = [
  {
    name: "squat",
    sets: [
      {
        set: 0,
        amsap: false,
        fields: [
          { name: "reps", value: 10 },
          { name: "rpe", value: 8 },
        ],
      },
    ],
  },
];

const WorkoutBuilder = () => {
  const { userId, date } = useParams();
  const [screen, setScreen] = useState(0);
  const [category, setCategory] = useState("");
  const [workout, setWorkout] = useState([]);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [fields, setFields] = useState([
    {
      name: "reps",
      value: "AMRAP",
      toggled: true,
      options: ["AMRAP", ...Array(20).keys()],
    },
    {
      name: "rpe",
      value: 8,
      toggled: true,
      options: [
        10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5,
        1,
      ],
    },
    { name: "backoff %", value: null, toggled: true },
    { name: "e1rm%", value: null, toggled: false },
    { name: "% of max", value: null, toggled: false },
    { name: "weight", value: null, toggled: false },
  ]);

  const updateFields = (idx) => {
    const copyFields = [...fields];
    copyFields[idx].toggled = !copyFields[idx].toggled;

    setFields(copyFields);
  };

  const resetFieldValues = () => {
    const copyFields = [...fields];

    copyFields.forEach((field, idx) => {
      if (field.name === "reps") {
        field.value = "AMRAP";
      } else if (field.name === "rpe") {
        field.value = 8;
      } else {
        field.value = null;
      }
    });

    setFields(copyFields);
  };
  const pushExerciseTemplate = () => {
    const copyWorkout = [...workout];

    copyWorkout.push({ name: "", sets: [] });
    setWorkout(copyWorkout);
  };

  const deleteExercise = (idx) => {
    const copyWorkout = [...workout];

    console.log(workout, copyWorkout);
    copyWorkout.splice(idx, 1);
    console.log(workout, copyWorkout);

    setWorkout(copyWorkout);
    console.log(workout, copyWorkout);
  };

  const renderScreen = (idx) => {
    const screenTitle = workoutBuilderScreens[idx];

    // eslint-disable-next-line default-case
    switch (screenTitle) {
      case "WorkoutCategories":
        return (
          <WorkoutCategories
            screen={screen}
            setScreen={setScreen}
            setCategory={setCategory}
          />
        );
      case "WorkoutAssignment":
        return (
          <WorkoutAssignment
            screen={screen}
            setScreen={setScreen}
            category={category}
            workout={workout}
            setCurrentExerciseIdx={setCurrentExerciseIdx}
            deleteExercise={deleteExercise}
            pushExerciseTemplate={pushExerciseTemplate}
          />
        );
      case "ExerciseAssignment":
        return (
          <ExerciseAssignment
            screen={screen}
            setScreen={setScreen}
            workout={workout}
            category={category}
            setWorkout={setWorkout}
            currentExerciseIdx={currentExerciseIdx}
            deleteExercise={deleteExercise}
          />
        );
      case "SetBuilder":
        return (
          <SetBuilder
            screen={screen}
            setScreen={setScreen}
            fields={fields}
            setFields={setFields}
            resetFieldValues={resetFieldValues}
            workout={workout}
            setWorkout={setWorkout}
            currentExerciseIdx={currentExerciseIdx}
          />
        );
      case "SetFieldEditor":
        return (
          <SetFieldEditor
            screen={screen}
            setScreen={setScreen}
            fields={fields}
            updateFields={updateFields}
            currentExerciseIdx={currentExerciseIdx}
            workout={workout}
          />
        );
    }
  };

  return <div>{renderScreen(screen)}</div>;
};

export default WorkoutBuilder;
