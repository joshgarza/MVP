import dayjs from 'dayjs';

export const generateCalendar = (day = dayjs().date(), month = dayjs().month(), year = dayjs().year()) => {
  // first day of the current week
    // console.log(dayjs().day(0))
  // DISPLAYS DATE LIKE: Mon Mar 20 2023
    // console.log(dayjs().year(year).month(month).date(PASS IN DAY OF MONTH HERE).toDate().toDateString())
  const currDate = dayjs().year(year).month(month).date(day);

  // console.log(dayjs().year(year).month(month).date(day), 'curr date test')

  const arrayOfDates = [];

  // generate 4 weeks of dates from the previous Sunday as day 1
  for (let i = 0; i < 28; i++) {
    const date = currDate.day(i)

    arrayOfDates.push({
      date: date.date()
    })
  }

  return (
    arrayOfDates
  )
}