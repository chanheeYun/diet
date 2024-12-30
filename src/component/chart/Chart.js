import React from 'react'
import PieChart from './PieChart';
import BodyBarChart from './BodyBarChart';
import StackChart from './StackChart';
import WeightChart from './WeightChart';

export default function Chart({i}) {
  const datas = [
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
  ];

  const comp = [
    <PieChart data={datas[2]} />,
    <BodyBarChart data={datas[3]} />,
    <BodyBarChart data={datas[4]} />,
    <StackChart data={datas[0]} />,
    <WeightChart data={datas[1]} />,
  ];
  return (
    <div className='w-full h-full'>
      {comp[i]}
    </div>
  )
}
