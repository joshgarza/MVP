import { generateCalendar } from '../../util/calendar.js';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";


const CalendarView = () => {
  dayjs.extend(weekOfYear)
  dayjs.extend(dayOfYear)
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currDate = dayjs();
  const [today, setToday] = useState(currDate);
  const [displayDate, setDisplayDate] = useState(today);

  return (
    <div className="w-screen h-screen flex-col">
      <div className="flex justify-between items-center gap-2">
        <h1 className="h-1/8 p-8">
          {displayDate.format('MMMM')} {displayDate.format('D')}, {displayDate.format('YYYY')}
        </h1>
        <div className="flex gap-10 items-center px-2">
          <GrFormPrevious className="cursor-pointer" onClick={() => {
            setToday(today.dayOfYear(today.dayOfYear() - 7))
            setDisplayDate(today.dayOfYear(today.dayOfYear() - 7))
          }}
          />
          <h1 className="cursor-pointer" onClick={() => {
            setToday(currDate)
            setDisplayDate(currDate)
          }}>
            Today
          </h1>
          <GrFormNext className="cursor-pointer"  onClick={() => {
            setToday(today.dayOfYear(today.dayOfYear() + 7))
            setDisplayDate(today.dayOfYear(today.dayOfYear() + 7))
          }}
          />
        </div>

      </div>
      <div className="grid grid-cols-7 h-1/8 py-8">
        {days.map((day, index) => {
          return <h1 key={index}>{day}</h1>
        })}
      </div>
      <div className="grid grid-cols-7 h-3/4">
        {generateCalendar(today.date(), today.month(), today.year()).map((date, index) => {
          return (
            <h1 key={index} className="border" onClick={() => {
              console.log(date)
              setDisplayDate(dayjs().set('date', date.day).set('month', date.month).set('year', date.year))
            }
          }>
            {date.day}
            </h1>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView;