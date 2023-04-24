import React, { useState, useEffect } from "react";
import { generateCalendar } from "../../util/calendar.js";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BsDot } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const ClientCalendar = ({ clientWorkouts, userInfo }) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(dayOfYear);
  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(today);
  const [dates, setDates] = useState(
    generateCalendar(today.date(), today.month(), today.year())
  );
  const [changeWeekTouched, setChangeWeekTouched] = useState([
    { name: "prev", touched: false },
    { name: "next", touched: false },
  ]);
  const [clientWorkoutResults, setClientWorkoutResults] = useState([]);
  const [workoutLookupTable, setWorkoutLookupTable] = useState({});
  const [workoutResultLookupTable, setWorkoutResultLookupTable] = useState({});
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${apiBaseURL}/api/workoutResults/${userInfo.id}`)
      .then((result) => {
        console.log(result, "result from getWorkoutResults");
        setClientWorkoutResults(result.data);
        setWorkoutResultLookupTable(constructWorkouts(result.data));
        setWorkoutLookupTable(constructWorkouts(clientWorkouts));
      });
    console.log(clientWorkoutResults, "in cal");
  }, []);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const handlePreviousWeek = (idx) => {
    const prevWeek = selectedDate.dayOfYear(selectedDate.dayOfYear() - 7);
    const firstDayOfDates = dates[0];

    if (firstDayOfDates.date.toDate() > prevWeek.toDate()) {
      setSelectedDate(prevWeek);
      setDates(
        generateCalendar(prevWeek.date(), prevWeek.month(), prevWeek.year())
      );
    } else {
      setSelectedDate(prevWeek);
    }
    const copyChangeWeekTouched = [...changeWeekTouched];
    copyChangeWeekTouched[idx].touched = false;

    setChangeWeekTouched(copyChangeWeekTouched);
  };

  const handleNextWeek = (idx) => {
    const nextWeek = selectedDate.dayOfYear(selectedDate.dayOfYear() + 7);
    const lastDayOfDates = dates[dates.length - 1];

    if (lastDayOfDates.date.toDate() < nextWeek.toDate()) {
      setSelectedDate(nextWeek);
      setDates(
        generateCalendar(nextWeek.date(), nextWeek.month(), nextWeek.year())
      );
    } else {
      setSelectedDate(nextWeek);
    }
    const copyChangeWeekTouched = [...changeWeekTouched];
    copyChangeWeekTouched[idx].touched = false;

    setChangeWeekTouched(copyChangeWeekTouched);
  };

  const handleTouchStart = (idx) => {
    const copyChangeWeekTouched = [...changeWeekTouched];
    copyChangeWeekTouched[idx].touched = true;

    setChangeWeekTouched(copyChangeWeekTouched);
  };

  const handleSetToday = () => {
    const firstDayOfDates = dates[0];
    const lastDayOfDates = dates[dates.length - 1];

    if (
      lastDayOfDates.date.toDate() < today.toDate() ||
      firstDayOfDates.date.toDate() > today.toDate()
    ) {
      setSelectedDate(today);
      setDates(generateCalendar(today.date(), today.month(), today.year()));
    } else {
      setSelectedDate(today);
    }
  };

  const constructWorkouts = (workoutsList) => {
    const workoutCollection = {};

    workoutsList.forEach((set, i) => {
      const {
        id,
        date,
        workout_order,
        exercise_order,
        reps,
        rir,
        rpe,
        weight,
        backoff_percent,
      } = set;
      if (workoutCollection[date]) {
        // add to the date
        if (
          workoutCollection[date][workout_order][exercise_order] !== undefined
        ) {
          // add to exercise
          workoutCollection[date][workout_order][exercise_order].sets[set.set] =
            {
              id: id,
              set: set.set,
              reps: reps,
              rir: rir,
              rpe: rpe,
              weight: weight,
              backoff_percent: backoff_percent,
            };
        } else {
          // create exercise in table
          workoutCollection[date][workout_order][exercise_order] = {
            exercise: set.exercise,
            sets: [],
          };
          workoutCollection[date][workout_order][exercise_order].sets[set.set] =
            {
              id: id,
              set: set.set,
              reps: reps,
              rir: rir,
              rpe: rpe,
              weight: weight,
              backoff_percent: backoff_percent,
            };
        }
        // if (workoutCollection[date][workout_order][exercise_order])
      } else {
        workoutCollection[date] = [];
        workoutCollection[date][workout_order] = [];
        workoutCollection[date][workout_order][exercise_order] = {
          exercise: set.exercise,
          sets: [],
        };
        workoutCollection[date][workout_order][exercise_order].sets[set.set] = {
          id: id,
          set: set.set,
          reps: reps,
          rir: rir,
          rpe: rpe,
          weight: weight,
          backoff_percent: backoff_percent,
        };
      }
    });
    return workoutCollection;
  };

  return (
    <div className="grid-rows-8">
      <div className="flex items-center justify-between m-2 p-2">
        <div>{selectedDate.toDate().toDateString()}</div>
        <div className="flex items-center gap-8">
          <div
            className="p-3"
            onTouchStart={() => {
              handleTouchStart(0);
            }}
            onTouchEnd={() => {
              handlePreviousWeek(0);
            }}
          >
            <GrFormPrevious
              className={`rounded-full text-xl m-2 ${
                changeWeekTouched[0].touched
                  ? "bg-[#868fb3] text-white"
                  : "bg-white"
              }`}
            />
          </div>
          <div
            className=""
            onTouchEnd={() => {
              handleSetToday();
            }}
          >
            Today
          </div>
          <div
            className="p-3"
            onTouchStart={() => {
              handleTouchStart(1);
            }}
            onTouchEnd={() => {
              handleNextWeek(1);
            }}
          >
            <GrFormNext
              className={`rounded-full text-xl m-2 ${
                changeWeekTouched[1].touched
                  ? "bg-[#868fb3] text-white"
                  : "bg-white"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 mx-4">
        {days.map((day, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-center mb-1 pb-1"
            >
              {day}
            </div>
          );
        })}
        {dates.map((date, idx) => {
          return (
            <div
              key={idx}
              className={`flex items-center justify-center border-t-2 mb-2 p-2`}
              onTouchEnd={() => {
                setSelectedDate(date.date);
              }}
            >
              <div
                className={`flex flex-col items-center justify-center w-full h-full mb-2`}
              >
                <h1
                  className={`flex items-center justify-center rounded-full text-lg px-1 ${
                    selectedDate.toDate().toDateString() === date.dateString
                      ? "bg-[#868fb3] text-white"
                      : "bg-white"
                  }`}
                >
                  {date.day}
                </h1>
                {workoutLookupTable[date.dateString] ? (
                  <BsDot className="text-3xl text-red-400" />
                ) : (
                  <BsDot className="text-3xl invisible" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Workout shorthand goes below */}
      <div>
        {workoutResultLookupTable[selectedDate.toDate().toDateString()] ? (
          workoutResultLookupTable[selectedDate.toDate().toDateString()].map(
            (workout, i) => {
              return (
                <div key={i} className="flex flex-col gap-2 mx-3">
                  <div>Workout {i + 1}</div>
                  {workout.map((slot, j) => {
                    return <li key={j}>{slot.exercise}</li>;
                  })}
                  <div className="flex items-center justify-center">
                    <Link
                      to={`/client/workouts/${selectedDate.format(
                        "MM-DD-YYYY"
                      )}`}
                      state={{
                        workout: workout,
                        workoutIdx: i,
                        dateString: selectedDate.toDate().toDateString(),
                      }}
                      className="flex items-center justify-center w-[50%] font-semibold bg-blue-400/80 rounded-full p-2"
                    >
                      View workout
                    </Link>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <div>
            No workout scheduled for {selectedDate.toDate().toDateString()}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default ClientCalendar;
