import React, { useCallback, useEffect, useState } from 'react'
import Calendar from './calendar/Calendar'
import Chart from './chart/Chart'

export default function Info() {
  const datas = 
    {
      'diet' :
      [
        {
          "date": "2024-12-30",
          "탄수화물": 19,
          "단백질": 113,
          "지방": 144,
          "당류" : 50,
          "나트륨" : 10,
        },
        {
          "date": "2024-12-31",
          "탄수화물": 33,
          "단백질": 154,
          "지방": 63,
        },
        {
          "date": "2025-01-01",
          "탄수화물": 141,
          "단백질": 96,
          "지방": 79,
        },
        {
          "date": "2025-01-02",
          "탄수화물": 50,
          "단백질": 70,
          "지방": 105,
        },
        {
          "date": "2025-01-03",
          "탄수화물": 106,
          "단백질": 78,
          "지방": 78,
        },
        {
          "date": "2025-01-04",
          "탄수화물": 46,
          "단백질": 132,
          "지방": 73,
        },
        {
          "date": "2025-01-05",
          "탄수화물": 34,
          "단백질": 12,
          "지방": 20,
        }
      ],
      'weight' : 
      [
        { 
          "id": "BodyWeight",
          "data": [
            {
              "x": "12-30",
              "y": 100.7
            },
            {
              "x": "12-31",
              "y": 102.6
            },
            {
              "x": "01-01",
              "y": 103.1
            },
            {
              "x": "01-02",
              "y": 101.5
            },
            {
              "x": "01-03",
              "y": 100.3
            },
            {
              "x": "01-04",
              "y": 99.2
            },
            {
              "x": "01-05",
              "y": 97.1
            },
            {
              "x": "01-06",
              "y": 97.0
            },
            {
              "x": "01-07",
              "y": 96.4
            },
            {
              "x": "01-08",
              "y": 95
            },
          ]
        }
      ],
      'composition' :
      [
        {
          "id": "체수분",
          "label": "체수분",
          "value": 46.8,
        },
        {
          "id": "단백질",
          "label": "단백질",
          "value": 12.8,
        },
        {
          "id": "무기질",
          "label": "무기질",
          "value": 4.37,
        },
        {
          "id": "체지방",
          "label": "체지방",
          "value": 7,
        },
      ],
      'muscle' :
      [
        {
          'id':'체중',
          'value': 71,
        },
        {
          'id':'골격근량',
          'value': 36.7
        },
        {
          'id':'체지방',
          'value':7
        }
      ],
      'fat' : 
      [
        {
          'id':'BMI',
          'value': 23.2,
        },
        {
          'id':'체지방률',
          'value': 9.9
        },
      ]
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pData, setPData] = useState();

  const getPersonalData = useCallback(async () => {
    const token = sessionStorage.getItem('JWT');
    
    if (!token) {
      // JWT가 없으면 로그인 페이지로 이동
      alert('session이 만료되어 로그인 페이지로 이동합니다.')
      window.location.href = '/login';
      return;
    }

    try {
      let dt = selectedDate.replaceAll('-', '');
      const url = `http://10.125.121.219:8080/member/info?date=${dt}`;
      await fetch(url, {
          method:'get', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token
          },
      })
      .then(resp => resp.json())
      .then(data => setPData(data))
      .catch(err => console.error('Failed to get Personal Infomation', err))
    } catch(error) {
      console.log('Error fetching Info:', error);
    };
  }, [selectedDate]);

  useEffect(() => {
    getPersonalData();
  }, [getPersonalData]);

  useEffect(() => {
    if (!pData) return;
  }, [pData]);

  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className='w-7/12 h-full py-10 px-20 chart'>
        <div className='scroll-container w-full h-full py-5 
                        border-2 border-blue-300 bg-white bg-opacity-50
                        rounded-xl'>
          <Chart datas={datas} />
        </div>
      </div>
    </div>
  )
}
