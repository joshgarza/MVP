import React, { useState } from "react";
import WorkoutCategories from "./WorkoutCategories";
import WorkoutAssignment from "./WorkoutAssignment";
import ExerciseAssignment from "./ExerciseAssignment";
import SetBuilder from "./SetBuilder";
import { Link, useParams } from "react-router-dom";

const workoutBuilderScreens = [
  "WorkoutCategories",
  "WorkoutAssignment",
  "ExerciseAssignment",
  "SetBuilder",
];

const WorkoutBuilder = () => {
  const { userId, date } = useParams();
  const [screen, setScreen] = useState(0);
  const [category, setCategory] = useState("");
  const [workout, setWorkout] = useState([]);

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
        return <SetBuilder screen={screen} setScreen={setScreen} />;
    }
  };

  return <div>{renderScreen(screen)}</div>;
};

export default WorkoutBuilder;
