import { generateCalendar } from '../../util/calendar.js';
import dayjs from 'dayjs';
import { useState } from 'react';

const CalendarView = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currDate = dayjs();
  const [today, setToday] = useState(currDate);


  return (
    <div>
      {generateCalendar(today.date(), today.month(), today.year()).map((date, index) => {
        return <h1>{date.date.$d}</h1>
      })}
    </div>
  )
}

export default CalendarView;