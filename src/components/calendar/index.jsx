import React, { useState, useEffect } from 'react'
import { DateTime } from "luxon"
import './calendar.css'
import buildCalendar from './build'
import dayStyles from './styles'
import MonthPicker from '../monthPicker'
import Header from '../header'
// import PropTypes from 'prop-types'

const Calendar = (value, onChange) => {
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const [calendar, setCalendar] = useState([])
  const [selectedDay, setSelectedDay] = useState(DateTime.now().startOf('day'))
  const [secondSelectedDay, setSecondSelectedDay] = useState(DateTime.now().startOf('day'))
  const [isRange, setIsRange] = useState(false)
  const [isHoldingShift, setIsHoldingShift] = useState(false)

  useEffect(() => {
    setCalendar(buildCalendar(selectedDay));
  }, [selectedDay])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Shift') {
        setIsHoldingShift(true)
      }
    })
  
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        setIsHoldingShift(false)
      }
    })
  }, [])

  function selectDay(day) {
    if (!day.equals(selectedDay) && isHoldingShift) {
      setIsRange(true)
      setSecondSelectedDay(day)
    } else {
      setIsRange(false)
      setSelectedDay(day)
    }
    
  }

  
  return (
    <div className='calendar'>
      <Header selectedDay={selectedDay}  secondSelectedDay={secondSelectedDay} selectDay={selectDay} isRange={isRange} />
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
                week.map(day => <div onClick={() => selectDay(day)} className={`calendar-day ${dayStyles(day, selectedDay, secondSelectedDay, isRange)}`}>
                  {day.day}
                </div>)
              }
            </div>
            )
          }
        </div>
      </div>
      <div className="calendar-footer">
        <p>Hold Shift and choose day to select an interval</p>
        <p>Created by <a href="https://github.com/nemuzora-nozomu" className="github">nemuzora-nozomu</a> (2022)</p>
      </div>
    </div>
  )
}

// Calendar.propTypes = {
//   selectedDay: PropTypes.instanceOf(DateTime)
// }

export default Calendar