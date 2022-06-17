import { DateTime } from "luxon"

function isSelected(day, selectedDay, secondSelectedDay, isRange) {
  if (!isRange) {
    return selectedDay.equals(day)
  }
  if (secondSelectedDay < selectedDay) {
    [selectedDay, secondSelectedDay] = [secondSelectedDay, selectedDay]
  }
  return day >= selectedDay && day <= secondSelectedDay
}

function isToday(day) {
  return day.equals(DateTime.now().startOf('day'))
}

function isOutsideCurrentMonth(day, selectedDay) {
  return day.month !== selectedDay.month
}

export default function dayStyles(day, selectedDay, secondSelectedDay, isRange) {
  if (isSelected(day, selectedDay, secondSelectedDay, isRange)) return 'selected'
  if (isToday(day)) return 'today'
  if (isOutsideCurrentMonth(day, selectedDay)) return 'outside-month'
  return ''
}