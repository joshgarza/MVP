import { generateCalendar } from "../../util/calendar.js";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FcPlus } from "react-icons/fc";
import { Link } from "react-router-dom";

// TODO: what format is selectedDate compared to displayDate? choose one and convert dependencies to use that format
const CalendarView = ({ clientLookupTable }) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(dayOfYear);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currDate = dayjs();
  const [today, setToday] = useState(currDate);
  const initialClient = Object.keys(clientLookupTable)[0];
  const [displayDate, setDisplayDate] = useState(currDate);
  const [selectedClient, setSelectedClient] = useState(initialClient);
  const [selectedDate, setSelectedDate] = useState(currDate);

  const displayWorkoutShorthand = (date) => {
    const workout = clientLookupTable[selectedClient].workouts[date];
    return (
      <div
        onClick={() => {
          setSelectedDate(date);
        }}
      >
        <div>
          {workout.map((slot, i) => {
            return <div key={i}>{slot.exercise}</div>;
          })}
        </div>
      </div>
    );
  };

  const selectClient = (name) => {
    setSelectedClient(name);
  };

  const mapClientListOptions = () => {
    return Object.keys(clientLookupTable).map((clientId, i) => {
      const client = clientLookupTable[clientId];
      return (
        <option key={i} value={clientId}>
          {client.name}
        </option>
      );
    });
  };

  const emptyClientList = () => {
    return Object.keys(clientLookupTable).length === 0;
  };

  return (
    <>
      {emptyClientList() ? (
        <div className="grid items-center justify-center">
          <p>
            No clients yet!{" "}
            <mark className="bg-white font-semibold underline cursor-pointer ">
              Add some
            </mark>{" "}
            to get started!
          </p>
        </div>
      ) : (
        <div className="w-screen h-[90%] flex-col px-2">
          <div className="flex justify-between items-center gap-2">
            <select
              className="px-2 w-80"
              onChange={(e) => {
                selectClient(e.target.value);
              }}
            >
              {mapClientListOptions()}
            </select>
            <h1 className="h-1/8 p-8">
              {displayDate.format("MMMM")} {displayDate.format("D")},{" "}
              {displayDate.format("YYYY")}
            </h1>
            <div className="flex gap-10 items-center px-2">
              <GrFormPrevious
                className="cursor-pointer"
                onClick={() => {
                  setToday(today.dayOfYear(today.dayOfYear() - 7));
                  setDisplayDate(today.dayOfYear(today.dayOfYear() - 7));
                }}
              />
              <h1
                className="cursor-pointer"
                onClick={() => {
                  setToday(currDate);
                  setDisplayDate(currDate);
                }}
              >
                Today
              </h1>
              <GrFormNext
                className="cursor-pointer"
                onClick={() => {
                  setToday(today.dayOfYear(today.dayOfYear() + 7));
                  setDisplayDate(today.dayOfYear(today.dayOfYear() + 7));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 h-1/8 py-8">
            {days.map((day, index) => {
              return <h1 key={index}>{day}</h1>;
            })}
          </div>
          <div className="grid grid-cols-7">
            {generateCalendar(today.date(), today.month(), today.year()).map(
              (date, index) => {
                console.log(selectedClient);
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-2"
                  >
                    <Link
                      to={`/coach/workouts/${selectedClient}/${date.date.format(
                        "MM-DD-YYYY"
                      )}`}
                    >
                      {date.day}
                    </Link>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarView;
