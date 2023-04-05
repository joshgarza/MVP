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
  const [dates, setDates] = useState(generateCalendar(today.date(), today.month(), today.year()));
  const [changeWeekTouched, setChangeWeekTouched] = useState([
    {name: 'prev', touched: false},
    {name: 'next', touched: false}
  ])

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const handlePreviousWeek = (idx) => {
    const prevWeek = selectedDate.dayOfYear(selectedDate.dayOfYear() - 7);
    const firstDayOfDates = dates[0];

    if (firstDayOfDates.date.toDate() > prevWeek.toDate()) {
      setSelectedDate(prevWeek)
      setDates(generateCalendar(prevWeek.date(), prevWeek.month(), prevWeek.year()));
    } else {
      setSelectedDate(prevWeek)
    }
    const copyChangeWeekTouched = [...changeWeekTouched];
    copyChangeWeekTouched[idx].touched = false;

    setChangeWeekTouched(copyChangeWeekTouched);
  }

  const handleNextWeek = (idx) => {
    const nextWeek = selectedDate.dayOfYear(selectedDate.dayOfYear() + 7);
    const lastDayOfDates = dates[dates.length - 1];

    if (lastDayOfDates.date.toDate() < nextWeek.toDate()) {
      setSelectedDate(nextWeek)
      setDates(generateCalendar(nextWeek.date(), nextWeek.month(), nextWeek.year()));
    } else {
      setSelectedDate(nextWeek)
    }
    const copyChangeWeekTouched = [...changeWeekTouched];
    copyChangeWeekTouched[idx].touched = false;

    setChangeWeekTouched(copyChangeWeekTouched);
  }

  const handleTouchStart = (idx) => {
    const copyChangeWeekTouched = [...changeWeekTouched];
    copyChangeWeekTouched[idx].touched = true;

    setChangeWeekTouched(copyChangeWeekTouched);
  }

  const handleSetToday = () => {
    const firstDayOfDates = dates[0];
    const lastDayOfDates = dates[dates.length - 1];

    if (lastDayOfDates.date.toDate() < today.toDate() || firstDayOfDates.date.toDate() > today.toDate()) {
      setSelectedDate(today)
      setDates(generateCalendar(today.date(), today.month(), today.year()));
    } else {
      setSelectedDate(today)
    }
  }


  return (
    <div className="grid-rows-8 my-3">
      <div className="flex items-center justify-between m-2 p-2 my-4">
        <div>{selectedDate.toDate().toDateString()}</div>
        <div className="flex items-center gap-8">
          <div className="p-3" onTouchStart={() => {handleTouchStart(0)}} onTouchEnd={() => {handlePreviousWeek(0)}}>
            <GrFormPrevious className={`rounded-full text-xl m-2 ${changeWeekTouched[0].touched ? "bg-[#868fb3] text-white" : "bg-white"}`}/>
          </div>
          <div className="" onTouchEnd={() => {handleSetToday()}}>Today</div>
          <div className="p-3" onTouchStart={() => {handleTouchStart(1)}} onTouchEnd={() => {handleNextWeek(1)}}>
            <GrFormNext className={`rounded-full text-xl m-2 ${changeWeekTouched[1].touched ? "bg-[#868fb3] text-white" : "bg-white"}`}/>
          </div>
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
            <div key={idx} className={`flex items-center justify-center border-t-2 mb-2 p-2`} onTouchEnd={() => {setSelectedDate(date.date)}}>
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