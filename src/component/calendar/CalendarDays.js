import React from 'react'

export default function CalendarDays() {
  const days = [];
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
      days.push(
          <div className='headDate w-16 text-center' key={i}>
              {date[i]}
          </div>,
      );
  }
  return (
    <div className='pb-1 flex flex-row justify-around text-xl mb-3 border-b-2'>{days}</div>
  )
}
