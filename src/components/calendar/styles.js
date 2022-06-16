import { DateTime } from "luxon"

function isSelected(day, selectedDay) {
  return selectedDay.equals(day)
}

function isToday(day) {
  return day.equals(DateTime.now().startOf('day'))
}

function isOutsideCurrentMonth(day, selectedDay) {
  return day.month !== selectedDay.month
}

export default function dayStyles(day, selectedDay) {
  if (isSelected(day, selectedDay)) return 'selected'
  if (isToday(day)) return 'today'
  if (isOutsideCurrentMonth(day, selectedDay)) return 'outside-month'
  return ''
}