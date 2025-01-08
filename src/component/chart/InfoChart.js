import React from 'react'
import PieChart from './PieChart';
import BodyBarChart from './BodyBarChart';
import StackChart from './StackChart';
import WeightChart from './WeightChart';

export default function InfoChart({datas}) {
  
  return (
    <>
      {datas['composition'] &&
        <div className='w-full h-full'>
          <div className='w-full h-fit text-center chart text-2xl pl-5'>체성분 분석</div>
          <PieChart data={datas['composition']} />
        </div>
      }
      {datas.muscle && datas.fat &&
        <div className='w-full h-full'>
          <div className='w-full h-fit mt-10 mb-2 text-center chart text-2xl pl-5'>지방·골격근 분석</div>
          <div className='w-full h-full flex flex-col justify-center items-start'>
            <BodyBarChart data={datas['muscle']} />
            <BodyBarChart data={datas['fat']} />
          </div>
        </div>
      }
      <div className='w-full h-full'>
        <div className='w-full h-fit mt-10 text-center chart text-2xl pl-5'>주간 영양 섭취 현황</div>
        <StackChart data={datas['diet']} />
      </div>
      <div className='w-full h-full'>
        <div className='w-full h-fit mt-10 text-center chart text-2xl pl-5'>최근 10일 체중(kg)</div>
        <WeightChart data={datas['weight']} />
      </div>
    </>
  )
}
