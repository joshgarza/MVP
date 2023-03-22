import { generateCalendar } from '../../util/calendar.js';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FcPlus } from "react-icons/fc";

// const clientWorkouts = {
//   // 'Alex A.': {
//   //   'Tue Mar 21 2023': true,
//   // },
//   // 'Bahman B.': {
//   //   'Wed Mar 22 2023': true,
//   // },
// }


const CalendarView = ({ clientList, clientWorkouts }) => {
  dayjs.extend(weekOfYear)
  dayjs.extend(dayOfYear)
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currDate = dayjs();
  const [today, setToday] = useState(currDate);
  const [displayDate, setDisplayDate] = useState(today);
  const [selectedClient, setSelectedClient] = useState('Alex A.');
  const [workouts, setWorkouts] = useState(clientWorkouts[selectedClient]);

  const addWorkout = (date) => {
    clientWorkouts[selectedClient][date] = true;
    setWorkouts({
      ...clientWorkouts[selectedClient]
    })
  }

  const selectClient = (name) => {
    setSelectedClient(name);
    setWorkouts(clientWorkouts[name])
  }

  return (
    <div className="w-screen h-[90%] flex-col px-2">
      <div className="flex justify-between items-center gap-2">
        <select className="px-2 w-80" onChange={(e) => {
          selectClient(e.target.value)
        }}>
          {clientList.map((name, index) => {
            return (
              <option key={index} value={name}>{name}</option>
            )
          })}
        </select>
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
            <div key={index} className="border grid grid-rows-3">
              <h1 onClick={() => {
                  setDisplayDate(dayjs().set('date', date.day).set('month', date.month).set('year', date.year))
                }
              }>
                {date.day}
              </h1>
              <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => {
                if (workouts[date.dateString]) {
                  console.log('it exists')
                } else {
                  addWorkout(date.dateString)
                }
              }}>
                {
                  workouts[date.dateString]
                  ?
                  <div className="bg-slate-500">Workout Plan</div>
                  :
                  <div className="flex items-center justify-center gap-2">
                    <FcPlus className=""/>
                    Add Workout
                  </div>
                }

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView;