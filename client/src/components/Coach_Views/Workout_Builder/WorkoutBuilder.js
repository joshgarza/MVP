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

const WorkoutBuilder = () => {
  const { userId, date } = useParams();
  const [screen, setScreen] = useState(0);
  const [category, setCategory] = useState("");
  const [workout, setWorkout] = useState([]);
  const [fields, setFields] = useState([
    { name: "reps", toggled: true, options: ["AMRAP", ...Array(10).keys()] },
    {
      name: "rpe",
      toggled: true,
      options: [
        10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5,
        1,
      ],
    },
    { name: "backoff %", toggled: true, options: [...Array(10).keys()] },
    { name: "e1rm%", toggled: false },
    { name: "% of max", toggled: false },
    { name: "weight", toggled: false },
  ]);

  const updateFields = (idx) => {
    console.log(fields[idx]);
    const copyFields = [...fields];
    console.log(copyFields);
    copyFields[idx].toggled = !copyFields[idx].toggled;

    setFields(copyFields);
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
          />
        );
      case "ExerciseAssignment":
        return (
          <ExerciseAssignment screen={screen} setScreen={setScreen} sets={[]} />
        );
      case "SetBuilder":
        return (
          <SetBuilder screen={screen} setScreen={setScreen} fields={fields} />
        );
      case "SetFieldEditor":
        return (
          <SetFieldEditor
            screen={screen}
            setScreen={setScreen}
            fields={fields}
            updateFields={updateFields}
          />
        );
    }
  };

  return <div>{renderScreen(screen)}</div>;
};

export default WorkoutBuilder;
