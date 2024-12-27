import React from 'react'
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarCells from './CalendarCells';
import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
      setSelectedDate(day);
      console.log(selectedDate);
  };
  return (
  <div className='w-full h-full p-4 bg-slate-100 rounded-lg shadow-lg'>
    <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
    />
    <CalendarDays />
    <CalendarCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
    />
  </div>
  )
}
