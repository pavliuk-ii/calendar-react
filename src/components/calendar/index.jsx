import React, { useState, useEffect } from 'react'
import { DateTime } from "luxon"
import './calendar.css'
import buildCalendar from './build'
// import PropTypes from 'prop-types'

const Calendar = () => {
  const [calendar, setCalendar] = useState([])
  const [selectedDay, setSelectedDay] = useState(DateTime.now().startOf('day'))

  function currentYear() {
    return selectedDay.toLocaleString({ year: 'numeric' })
  }

  function currentMonthName() {
    return selectedDay.toLocaleString({ month: 'long' })
  }

  function prevMonth() {
    return selectedDay.minus({ months: 1 })
  }

  function nextMonth() {
    return selectedDay.plus({ months: 1 })
  }



  function isSelected(day) {
    return selectedDay.equals(day)
  }

  function isToday(day) {
    return day.equals(DateTime.now().startOf('day'))
  }

  function isOutsideCurrentMonth(day) {
    return day.month !== selectedDay.month
  }

  function dayStyles(day) {
    if (isSelected(day)) return 'selected'
    if (isToday(day)) return 'today'
    if (isOutsideCurrentMonth(day)) return 'outside-month'
    return ''
  }

  useEffect(() => {
    setCalendar(buildCalendar(selectedDay));
  }, [selectedDay])


  return (
    <div className='calendar'>
      <div className="calendar-header">
        <label className="calendar-header">
          {selectedDay.toFormat('yyyy-MM-dd')}
        </label>
        <div className="reset-date" onClick={() => setSelectedDay(DateTime.now().startOf('day'))}>
          <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>
        </div>
      </div>
      <div className="calendar-month-picker">
        <div className="month-button" onClick={() => setSelectedDay(prevMonth())}>
          <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" /></svg>
        </div>
        <div className="month-label">{currentMonthName()} {currentYear()}</div>
        <div className="month-button" onClick={() => setSelectedDay(nextMonth())}>
          <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" /></svg>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-day-labels">

        </div>
        <div className="calendar-table">
          {
            calendar.map(week => <div className='calendar-week'>
              {
                week.map(day => <div onClick={() => setSelectedDay(day)} className={`calendar-day ${dayStyles(day)}`}>
                  {day.day}
                </div>)
              }
            </div>
            )
          }
        </div>
      </div>
      <div className="calendar-footer">

      </div>
    </div>
  )
}

// Calendar.propTypes = {
//   selectedDay: PropTypes.instanceOf(DateTime)
// }

export default Calendar