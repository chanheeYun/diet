import { useState } from 'react';
import Calendar from './Calendar';
import Weight from './Weight';

export default function Train() {
  const [weight, setWeight] = useState();
  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar />
      </div>
      <div className='h-4/5 w-1/2 bg-white text-center'>
        <div className='h-1/6'>
          <Weight weight={weight} setWeight={setWeight} />
        </div>
        <div className='w-full h-5/6 px-6'>
          <table className='w-full'>
            <thead className='border-2'>
              <tr className='text-center text-lg'>
                <th className='w-1/6'>
                  No
                </th>
                <th className='w-2/6'>
                  Training
                </th>
                <th className='w-1/6'>
                  Weight
                </th>
                <th className='w-1/6'>
                  Reps
                </th>
                <th className='w-1/6'>
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
          <input type='text' id=''/>
        </div>
      </div>
    </div>
  )
}
