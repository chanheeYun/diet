import React, {useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Asdf() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='w-full h-full'>
      <DatePicker
			  selected={startDate}
			  onChange={(date) => setStartDate(date)}
			  dateFormat="yyyy-MM-dd"
			/>
    </div>
  )
}
