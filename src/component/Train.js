import Calendar from './Calendar';
import Weight from './Weight';

export default function Train() {

  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar />
      </div>
      <div className='h-4/5 w-1/2 bg-slate-500 text-center'>
        <div className='h-1/6'>
          <Weight />
        </div>
        <div className='w-full h-5/6'>
          <input type='text' id=''/>
        </div>
      </div>
    </div>
  )
}
