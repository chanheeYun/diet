import React from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, parse, addDays } from 'date-fns';

export default function CalendarCells({ currentMonth, selectedDate, onDateClick }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`date w-14 h-14 text-xl flex justify-center items-center hover:bg-orange-200 rounded-full my-1 ${
              !isSameMonth(day, monthStart)
                  ? 'text-slate-300'
                  : isSameDay(day, selectedDate)
                  ? 'bg-orange-300'
                  : format(currentMonth, 'M') !== format(day, 'M')
                  ? 'not-valid'
                  : 'valid'
          }`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <span
              className={
                  format(currentMonth, 'M') !== format(day, 'M')
                      ? 'text not-valid'
                      : ''
              }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }

    rows.push(
      <div className='mt-1 flex flex-row justify-around items-center' key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className='flex flex-col justify-between'>
      {rows}
    </div>
  )
}
