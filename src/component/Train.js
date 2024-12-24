import Calendar from './Calendar';

export default function Train() {

  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar />
      </div>
      <div className='h-full w-1/2 bg-slate-500 text-center'>
        운동 및 채중 정보 넣는 곳
      </div>
    </div>
  )
}
