export default function buildCalendar(selectedDay) {
  const calendar = []
  const monthStartDay = selectedDay.startOf('month').startOf('week')
  const monthEndDay = selectedDay.endOf('month').endOf('week')

  let calendarDay = monthStartDay.startOf('day')
  while (calendarDay <= monthEndDay.startOf('day')) {
    let week = Array(7).fill(0);
    for (let i = 0; i < week.length; i++) {
      week[i] = calendarDay
      calendarDay = calendarDay.plus({ days: 1 })
    }
    calendar.push(week)
  }

  return calendar;
}