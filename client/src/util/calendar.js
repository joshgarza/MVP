import dayjs from 'dayjs';

export const generateCalendar = (day = dayjs().date(), month = dayjs().month(), year = dayjs().year()) => {
  const currDate = dayjs().year(year).month(month).date(day);
  const arrayOfDates = [];

  // generate 4 weeks of dates from the previous Sunday as day 1
  for (let i = 0; i < 28; i++) {
    const date = currDate.day(i)

    arrayOfDates.push({
      day: date.date(),
      month: date.month(),
      year: date.year(),
      dateString: date.toDate().toDateString()
    })
  }

  return (
    arrayOfDates
  )
}