import React, { useState } from 'react';
import { generateCalendar } from '../../util/calendar.js';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ClientCalendar = () => {
  dayjs.extend(weekOfYear);
  dayjs.extend(dayOfYear);
  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(today);
  const [dates, setDates] = useState(generateCalendar(today.date(), today.month(), today.year()))
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const handlePreviousWeek = () => {
    const prevWeek = selectedDate.dayOfYear(selectedDate.dayOfYear() - 7);
    const firstDayOfDates = dates[0];

    if (firstDayOfDates.date.toDate() > prevWeek.toDate()) {
      setSelectedDate(prevWeek)
      setToday(prevWeek)
      setDates(generateCalendar(prevWeek.date(), prevWeek.month(), prevWeek.year()));
    } else {
      setSelectedDate(prevWeek)
      setToday(prevWeek)
    }
  }

  const handleNextWeek = () => {
    const nextWeek = selectedDate.dayOfYear(selectedDate.dayOfYear() + 7);
    const lastDayOfDates = dates[dates.length - 1];

    if (lastDayOfDates.date.toDate() < nextWeek.toDate()) {
      setSelectedDate(nextWeek)
      setToday(nextWeek)
      setDates(generateCalendar(nextWeek.date(), nextWeek.month(), nextWeek.year()));
    } else {
      setSelectedDate(nextWeek)
      setToday(nextWeek)
    }
  }


  return (
    <div className="grid-rows-8 my-3">
      <div className="flex justify-around gap-4 m-2 p-2 my-4">
        <div>{selectedDate.toDate().toDateString()}</div>
        <div className="flex items-center gap-32 text-xl">
          <GrFormPrevious onTouchEnd={() => {handlePreviousWeek()}}/>
          <GrFormNext onTouchEnd={() => {handleNextWeek()}}/>
        </div>
      </div>
      <div className="grid grid-cols-7 mx-4">
        {days.map((day, idx) => {
          return (
            <div key={idx} className="flex items-center justify-center mb-1 pb-1">
              {day}
            </div>
          )
        })}
        {dates.map((date, idx) => {
          return (
            <div key={idx} className={`flex items-center justify-center border-t-2 mb-2 p-2`} onTouchEnd={() => {
              setSelectedDate(date.date)
            }}>
              <div className={`flex items-center justify-center w-full h-full rounded-full mb-2 ${selectedDate.toDate().toDateString() === date.dateString ? "bg-[#868fb3] text-white" : "bg-white"}`}>
                <h1 className="flex items-center justify-center text-lg px-2">{date.day}</h1>
              </div>
            </div>
          )
        })}
      </div>
      {/* Workout shorthand goes below */}
      <div>
        <div>
          No workout scheduled for {selectedDate.toDate().toDateString()}
        </div>
      </div>
    </div>
  )
}

export default ClientCalendar;