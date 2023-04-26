import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { apiRequests } from "../../util/apiRequests.js";
import dayjs from "dayjs";

// if no location.state data, perform a GET request for workouts matching userId, date, and workout_idx in params
const ClientWorkoutView = ({ userId, workoutStarted, setWorkoutStarted }) => {
  const location = useLocation();
  const params = useParams();
  const [workout, setWorkout] = useState(location.state.workout);
  const [workoutResult, setWorkoutResult] = useState(workout);
  const [screen, setScreen] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [storedTime, setStoredTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        let currTime = new Date();
        setElapsedTime((elapsedTime) => currTime - startTime + storedTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setStoredTime(elapsedTime);
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setElapsedTime(0);
  };

  const formatElapsedTime = () => {
    const SEC = 1000,
      MIN = 60 * SEC,
      HRS = 60 * MIN;

    const hrs = Math.floor(elapsedTime / HRS);
    const min = Math.floor((elapsedTime % HRS) / MIN).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const sec = Math.floor((elapsedTime % MIN) / SEC).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });

    return `${hrs}:${min}:${sec}`;
  };

  const getWorkout = () => {
    // GET one workout based on userId from props, date and workoutIdx (workout_order) from params
    // axios.get()
  };

  const buttonStyle =
    "flex items-center justify-center w-[60%] font-semibold bg-slate-300 rounded-full p-2 mx-2";

  const updateResult = (e, exerciseIdx, set) => {
    const { name, value } = e.target;

    const copyWorkoutResult = [...workout];
    copyWorkoutResult[exerciseIdx].sets[set][name] = value;
    setWorkoutResult(copyWorkoutResult);

    processChange(copyWorkoutResult[exerciseIdx].sets[set]);
  };

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const saveInput = (set) => {
    console.log(set);
    apiRequests
      .updateWorkoutResult(set)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  const processChange = useCallback(debounce(saveInput), []);

  const renderScreen = (exerciseIdx) => {
    return (
      <div>
        {renderWorkoutTable(exerciseIdx)}
        {renderWorkoutButtons()}
      </div>
    );
  };

  const renderWorkoutTable = (exerciseIdx) => {
    const { exercise, sets } = workout[exerciseIdx];
    const availableProps = new Set();

    sets.forEach((set) => {
      Object.keys(set).forEach((prop) => {
        set[prop] !== null && availableProps.add(prop);
      });
    });
    availableProps.add("weight");
    availableProps.delete("id");

    return (
      <div className="mx-2 px-2">
        <div className="flex items-center justify-center font-bold text-lg">
          {exercise}
        </div>
        <table className="table-fixed w-full">
          <thead>
            <tr>
              {/* for each property in a set, render the property name */}
              {[...availableProps].map((prop, i) => {
                return (
                  <th
                    key={i}
                    className={`border-b text-left font-bold ${
                      prop === "backoff_percent" ? "px-0" : "px-2"
                    }`}
                  >
                    {prop === "backoff_percent" ? (
                      <div className="flex items-start">
                        <span>backoff</span>
                        <span>%</span>
                      </div>
                    ) : (
                      prop
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="w-[60%]">
            {/* for each set, render a tr, for each property in a set, render a td within the tr */}
            {sets.map((set, i) => {
              return (
                <tr key={i}>
                  {[...availableProps].map((prop, j) => {
                    if (availableProps.has(prop)) {
                      return prop === "set" ? (
                        <td
                          key={j}
                          className="border-b border-slate-100 text-slate-500"
                        >
                          {set[prop] + 1}
                        </td>
                      ) : (
                        <td
                          key={j}
                          className="border-b border-slate-100 text-slate-500"
                        >
                          <input
                            className="w-full"
                            size="1"
                            type="number"
                            name={prop}
                            value={set[prop] || ""}
                            onChange={(e) => {
                              updateResult(e, exerciseIdx, i);
                            }}
                          ></input>
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderWorkoutButtons = () => {
    return (
      <div className="my-4">
        <div className="flex my-4">
          <div
            className={`${buttonStyle} ${screen === 0 && "invisible"}`}
            onClick={() => {
              setScreen(screen - 1);
            }}
          >
            Previous exercise
          </div>
          <div
            className={`${buttonStyle} ${
              screen === workout.length - 1 && "invisible"
            }`}
            onClick={() => {
              setScreen(screen + 1);
            }}
          >
            Next exercise
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className={`${buttonStyle}`}
            onClick={() => {
              handlePauseResume();
              setScreen(workout.length);
            }}
          >
            End Workout
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <>
        <div className="flex items-center justify-center">Workout Summary</div>
        {renderResults()}
        {renderSummaryButtons()}
      </>
    );
  };

  const renderResults = () => {
    return (
      <>
        {workoutResult.map((slot, i) => {
          return renderExerciseTable(slot);
        })}
      </>
    );
  };

  const renderExerciseTable = (slot) => {
    const { exercise, sets } = slot;

    const availableProps = new Set();

    sets.forEach((set) => {
      Object.keys(set).forEach((prop) => {
        set[prop] !== null && availableProps.add(prop);
      });
    });

    availableProps.add("weight");
    availableProps.delete("id");

    return (
      <div className="mx-2 px-2">
        <div className="flex items-center justify-center font-bold text-lg">
          {exercise}
        </div>
        <table className="table-fixed w-full">
          <thead>
            <tr>
              {/* for each property in a set, render the property name */}
              {[...availableProps].map((prop, i) => {
                return (
                  <th
                    key={i}
                    className={`border-b text-left font-bold ${
                      prop === "backoff_percent" ? "" : "px-2"
                    }`}
                  >
                    {prop === "backoff_percent" ? (
                      <div className="">
                        <span>backoff</span>
                        <span>%</span>
                      </div>
                    ) : (
                      prop
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="w-[60%]">
            {/* for each set, render a tr, for each property in a set, render a td within the tr */}
            {sets.map((set, i) => {
              const currSetProps = removeNullProps(set);
              return (
                <tr key={i}>
                  {Object.keys(currSetProps).map((prop, j) => {
                    if (availableProps.has(prop)) {
                      return prop === "set" ? (
                        <td
                          key={j}
                          className="border-b border-slate-100 text-slate-500"
                        >
                          {set[prop] + 1}
                        </td>
                      ) : (
                        <td
                          key={j}
                          className="border-b border-slate-100 text-slate-500"
                        >
                          {currSetProps[prop]}
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSummaryButtons = () => {
    return (
      <div className="flex my-4">
        <div
          className={`${buttonStyle} ${screen === 0 && "hidden"}`}
          onClick={() => {
            handlePauseResume();
            setStartTime(new Date());
            setScreen(screen - 1);
          }}
        >
          Resume Workout
        </div>
        <Link
          to="/client/dashboard"
          className="flex items-center justify-center w-[60%] font-semibold bg-slate-300 rounded-full p-2 mx-2"
          onClick={() => setWorkoutStarted(false)}
        >
          Submit Workout
        </Link>
      </div>
    );
  };

  const removeNullProps = (set) => {
    const availableProps = {};

    Object.keys(set).forEach((key) => {
      return set[key] !== null && (availableProps[key] = set[key]);
    });

    if (!availableProps.weight) {
      availableProps.weight = "";
    }

    return availableProps;
  };

  return (
    <div className="w-full">
      <div className="relative h-full">
        <div className="flex items-center justify-center p-4">
          Workout Timer: {formatElapsedTime()}
        </div>
      </div>
      {screen === workout.length ? renderSummary() : renderScreen(screen)}
    </div>
  );
};

export default ClientWorkoutView;
