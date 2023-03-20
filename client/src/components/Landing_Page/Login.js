import { generateCalendar } from '../../util/calendar.js';
import dayjs from 'dayjs';
import { useState } from 'react';

const CalendarView = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currDate = dayjs();
  const [today, setToday] = useState(currDate);

  console.log(generateCalendar(today.date(), today.month(), today.year()))

  return (
    <div className="w-screen h-screen">
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          return <h1 key={index}>{day}</h1>
        })}
      </div>
      <div className="grid grid-cols-7">
        {generateCalendar(today.date(), today.month(), today.year()).map((date, index) => {
          return <h1 key={index}>{date.date}</h1>
        })}
      </div>
    </div>
  )
}

export default CalendarView;