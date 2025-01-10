import React, { useCallback, useEffect, useState } from 'react'
import Calendar from './calendar/Calendar'
import InfoChart from './chart/InfoChart'

export default function Info() {
  const [finalData, setFinalData] = useState({
                                              'diet' : [],
                                              'weight' : 
                                              [ 
                                                { 
                                                  "id": "BodyWeight",
                                                  "data": []
                                                }
                                              ],
                                              'composition' : [],
                                              'fat' : []
                                            });
  const [tags, setTags] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pData, setPData] = useState();

  const transDate = (date) => {
    if (!date) return '';
    let dt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let dtArr = dt.split('-').map(a => a.length < 2 ? '0' + a : a).join('-');
    return dtArr;
  };

  const getPersonalData = useCallback(async () => {
    const token = sessionStorage.getItem('JWT');
    console.log('실행')
    
    if (!token) {
      // JWT가 없으면 로그인 페이지로 이동
      alert('로그인 후에 이용 가능합니다.')
      window.location.href = '/login';
      return;
    }

    try {
      let dt = transDate(selectedDate).replaceAll('-', '');
      console.log(dt)
      const url = `http://10.125.121.219:8080/member/info?date=${dt}`;
      await fetch(url, {
          method:'get', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token
          },
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setPData(data)
      })
      .catch(err => console.error('Failed to get Personal Infomation', err))
    } catch(error) {
      console.log('Error fetching Info:', error);
    };
  }, [selectedDate]);

  const aggregateDataByDate = (data) => {
    const aggregated = data.reduce((acc, item) => {
      const { date, calKcal, protein, fat, carbohydrate, sugar, natrium } = item;

      // 날짜별로 존재하는 데이터를 찾아서 합산
      if (!acc[date]) {
        acc[date] = {
          totalKcal: 0,
          totalProtein: 0,
          totalFat: 0,
          totalCarbo: 0,
          totalSugar: 0,
          totalNatrium: 0,
        };
      }

      acc[date].totalKcal += calKcal;
      acc[date].totalProtein += protein;
      acc[date].totalFat += fat;
      acc[date].totalCarbo += carbohydrate;
      acc[date].totalSugar += sugar;
      acc[date].totalNatrium += natrium;

      return acc;
    }, {});
    // console.log(aggregated)
    // 객체 형태로 저장된 데이터를 배열 형태로 변환
    let tm = Object.keys(aggregated).map(date => ({
      date,
      칼로리: Math.round(aggregated[date].totalKcal),
      단백질: Math.round(aggregated[date].totalProtein),
      지방: Math.round(aggregated[date].totalFat),
      탄수화물: Math.round(aggregated[date].totalCarbo),
      당류: Math.round(aggregated[date].totalSugar),
      나트륨: Math.round(aggregated[date].totalNatrium * 0.001),
    }));
    
    return tm;
  };

  useEffect(() => {
    getPersonalData();
  }, []);
  
  useEffect(() => {
    getPersonalData();
  }, [selectedDate]);

  useEffect(() => {
    if (!pData) return;
    let tmTag = pData.trainData.map(item => <div key={item.id} className='pl-8 train_input w-full h-12 flex flex-row justify-center items-center'>
                                              <div className='w-1/3 text-base'>{item.training}</div>
                                              <div className='w-1/6 text-sm text-center text-gray-600'>{item.weight} kg</div>
                                              <div className='w-1/6 text-sm text-center text-gray-600'>{item.sets} sets</div>
                                              <div className='w-1/6 text-sm text-center text-gray-600'>{item.reps} reps</div>
                                              <div className='w-1/6 text-base text-right'>{(item.sets * item.reps * item.weight).toLocaleString('ko-KR')}kg&nbsp;&nbsp;&nbsp;</div>
                                            </div>
    );

    setTags(tmTag);

    let tmDiet = aggregateDataByDate(pData.dietData);
    // console.log(datas)

    // const calorieData = tmDiet.map(item => ({
    //   date: item.date,
    //   칼로리: item.칼로리,
    // }));

    const nutrientData = tmDiet.map(item => {
      const { date, 칼로리, ...others } = item;
      return { date, ...others };
    });

    const weightData = pData.weightData.map(item => ({
      x: item.date,
      y: item.weight
    }));

    let tmWeight = pData.weightData.at(-1);
    if (!tmWeight) {
      alert('해당 유저의 저장된 정보가 없습니다. 체성분 정보를 입력하세요');
      window.location.href = '/train';
      return;
    }
    
    const muscleData = [
                        {id:'체중', value: tmWeight.weight},
                        {id:'골격근량', value: tmWeight.muscle},
                        {id:'체지방', value: tmWeight.fat},
                      ];
    const compositionData = [
                              {id:'체수분', value: tmWeight.water},
                              {id:'단백질', value: tmWeight.protein},
                              {id:'무기질', value: tmWeight.mineral},
                              {id:'체지방', value: tmWeight.fat},
                            ];
    
    const fatData = [
                      {id: 'BMI', value: Math.round(10 * tmWeight.weight / (pData.memberData.height * pData.memberData.height / 10000)) / 10},
                      {id: '체지방률', value: Math.round(tmWeight.fat / tmWeight.weight * 1000) / 10 },
                    ];
    // console.log('calorieData', calorieData)
    // console.log('nutrientData', nutrientData)
    // console.log('weightData', weightData)
    // console.log('muscleData', muscleData)
    // console.log('compositionData', compositionData)
    // console.log('fatData', fatData)

    let temp = {
      'diet' : nutrientData,
      'weight' : [
        { 
          "id": "BodyWeight",
          "data": weightData,
        }
      ],
      'composition' : compositionData,
      'muscle' : muscleData,
      'fat' : fatData
    };

    setFinalData(temp)
  }, [pData]);

  useEffect(() => {
    if (!finalData) return;
    console.log('finalData', finalData)
  }, [finalData]);

  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className='w-7/12 h-full py-10 px-20 chart'>
        <div className='scroll-container w-full h-full py-5 
                        border-2 border-blue-300 bg-white bg-opacity-50
                        rounded-xl'>
          <div className='w-11/12 ml-5 mb-10'>
            {tags !== null &&
            <div className='w-full flex flex-col justify-center items-center'>
              <div className='w-full h-10 text-2xl text-center chart mb-2'>
                운동 정보
              </div>
              <div className='pl-8 text-center train_input w-full h-12 flex flex-row justify-center items-center border-b-2 border-b-gray-200'>
                <div className='w-1/3 text-lg'>운동&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='w-1/6 text-base'>중량</div>
                <div className='w-1/6 text-base'>세트 수</div>
                <div className='w-1/6 text-base'>횟수</div>
                <div className='w-1/6 text-lg'>볼륨</div>
              </div>
            </div>}
            {tags}
          </div>
          <InfoChart datas={finalData} />
        </div>
      </div>
    </div>
  )
}
