import React, { useState, useEffect } from 'react'
import { DateTime } from "luxon"
import './calendar.css'
import buildCalendar from './build'
import dayStyles from './styles'
import MonthPicker from '../monthPicker'
import Header from '../header'
// import PropTypes from 'prop-types'

const Calendar = () => {
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const [calendar, setCalendar] = useState([])
  const [selectedDay, setSelectedDay] = useState(DateTime.now().startOf('day'))

  useEffect(() => {
    setCalendar(buildCalendar(selectedDay));
  }, [selectedDay])


  return (
    <div className='calendar'>
      <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <MonthPicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <div className="calendar-body">
        <div className="calendar-day-labels">
          {
            daysOfWeek.map(day => <div className='calendar-day-label'>
              {day}
            </div>)
          }
        </div>
        <div className="calendar-table">
          {
            calendar.map(week => <div className='calendar-week'>
              {
                week.map(day => <div onClick={() => setSelectedDay(day)} className={`calendar-day ${dayStyles(day, selectedDay)}`}>
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