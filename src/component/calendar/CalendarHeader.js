import React from 'react'
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
import { format } from 'date-fns';

export default function CalendarHeader({currentMonth, prevMonth, nextMonth}) {
  return (
    <div className='h-12 mb-5 mt-2 flex flex-row justify-between items-center'>
      <div className='pl-3'>
        <span className='headDate text-3xl'>
            <span className=''>
                {format(currentMonth, 'M')}월&nbsp;&nbsp;
            </span>
            {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className='pr-3 w-20 h-full flex flex-row justify-between items-center text-2xl'>
        <IoChevronBackOutline onClick={prevMonth} />
        <IoChevronForwardOutline onClick={nextMonth} />
      </div>
    </div>
  )
}
