import React from 'react'
import Calendar from './Calendar'

export default function Info() {
  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar />
      </div>
      <div className='w-7/12 h-full py-10 px-20'>
        <div className='scroll-container w-full h-full py-10 border-2 border-blue-500 bg-transparent'>
          
        </div>
      </div>
    </div>
  )
}
