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
  const [selectedDate, setSelectedDate] = useState(today.toDate().toDateString());
  const dates = generateCalendar(today.date(), today.month(), today.year());
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const handlePreviousWeek = () => {
    setToday(today.dayOfYear(today.dayOfYear() - 7))
    setSelectedDate(today.dayOfYear(today.dayOfYear() - 7).toDate().toDateString())
  }

  const handleNextWeek = () => {
    setToday(today.dayOfYear(today.dayOfYear() + 7))
    setSelectedDate(today.dayOfYear(today.dayOfYear() + 7).toDate().toDateString())
  }


  return (
    <div className="grid-rows-8 my-3">
      <div className="flex justify-around gap-4 m-2 p-2 my-4">
        <div>{selectedDate}</div>
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
              setSelectedDate(date.dateString)
            }}>
              <div className={`flex items-center justify-center w-full h-full rounded-full mb-2 ${selectedDate === date.dateString ? "bg-[#868fb3] text-white" : "bg-white"}`}>
                <h1 className="flex items-center justify-center text-lg px-2">{date.day}</h1>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClientCalendar;