import React, { useCallback, useEffect, useState } from 'react';
import Calendar from './calendar/Calendar';
import { format } from 'date-fns';

export default function Management() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dData, setDData] = useState([]);
  const [tags, setTags] = useState();
  const [total, setTotal] = useState();
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);

  const getDData = useCallback(async (date, token) => {
    // const token = sessionStorage.getItem('JWT');
    
    // if (!token) {
    //   // JWT가 없으면 로그인 페이지로 이동 처음 로드 시에 한번만 확인
    //   alert('session이 만료되어 로그인 페이지로 이동합니다.')
    //   window.location.href = '/login';
    //   return;
    // }

    try {
      let dt = date.replaceAll('-', '');
      console.log(dt)
      const url = `http://10.125.121.219:8080/member/diet?date=${dt}`;
      await fetch(url, {
          method:'GET', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token
          },
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setDData(data)
      })
      .catch(err => console.error('Failed to get Diet Data', err))
    } catch(error) {
      console.log('Error fetching Diet:', error);
    };
  }, []);

  // const getKData = async () => {
  //   let kcalArr = [];
    
  //   try {
  //     const url = `http://10.125.121.219:8080/member/data?code=${}`;
  //     await fetch(url, {
  //         method:'GET', 
  //         headers: {
  //             'Content-Type':'application/json',
  //             'Authorization': token
  //         },
  //     })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data)
  //       setDData(data)
  //       })
  //     .catch(err => console.error('Failed to get Diet Data', err))
  //   } catch(error) {
  //     console.log('Error fetching Diet:', error);
  //   };
  // };

  const transDate = (date) => {
    if (!date) return '';
    let dt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let dtArr = dt.split('-').map(a => a.length < 2 ? '0' + a : a).join('-');
    return dtArr;
  };

  const handleCheckboxChange = (num) => {
    setSelectedTags((prev) => {
      const updated = new Set(prev);
      if (updated.has(num)) {
        updated.delete(num);
      } else {
        updated.add(num);
      }
      return updated;
    });
  };

  const handleCheckboxAllSelect = () => {
    
    setIsAllSelected(prev => !prev);

    if (!isAllSelected) {
      const allNums = dData.map((item) => item.num);
      setSelectedTags(new Set(allNums));
    } else {
      setSelectedTags(new Set());
    }
  };

  const handleDelete = async () => {
    if (selectedTags.size === 0) {
      alert('삭제할 항목을 선택하세요.');
      return;
    }
  
    const token = sessionStorage.getItem('JWT');
  
    try {
      const selectedArray = Array.from(selectedTags);
      console.log(selectedArray)
      const url = `http://10.125.121.219:8080/member/delDiet`;
  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ nums: selectedArray }),
      });
  
      if (response.ok) {
        setDData((prevData) => prevData.filter((item) => !selectedTags.has(item.num)));
        setSelectedTags(new Set());
        alert('선택된 식단 정보가 삭제되었습니다.');
      } else {
        throw new Error('삭제 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  useEffect(() => {
    const tempDt = selectedDate ? transDate(selectedDate) : transDate(new Date());
    
    const fetchData = async () => {
      const token = sessionStorage.getItem('JWT');
      // if (!token) {
      //   alert('session이 만료되어 로그인 페이지로 이동합니다.');
      //   window.location.href = '/login';
      //   return;
      // }
      await getDData(tempDt, token);
    };
  
    fetchData();
  }, [selectedDate, getDData]);

  useEffect(() => {
    if (!dData || !Array.isArray(dData)) return;
    
    let totalKcal = dData.reduce((acc, item) => {
      let kcal = item.kcal * item.gram / 100;
      console.log(item.kcal, item.gram, kcal)
      return acc + kcal;
    }, 0);
    
    const tm = dData.map((item) => (
                                    <div
                                      key={item.num}
                                      className="chart text-lg pt-1 w-10/12 h-12 flex flex-col justify-start item-center border-b-2 border-gray-200"
                                    >
                                      <div className="w-full flex flex-row justify-between items-center">
                                        <div className="hidden h-full">{item.code}</div>
                                        <input
                                          type="checkbox"
                                          className="mt-2 w-1/12"
                                          checked={selectedTags.has(item.num)}
                                          onChange={() => handleCheckboxChange(item.num)}
                                        />
                                        <div className="w-1/4 h-full text-center pt-2.5 text-base">
                                          {item.name}
                                        </div>
                                        <div className="w-1/4 h-full text-center pt-2.5">
                                          {item.gram}
                                          <span>&nbsp;g</span>
                                        </div>
                                      </div>
                                    </div>
                                  ));
    setTags(tm);
    setTotal(totalKcal);
  }, [dData, selectedTags]);

  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className='w-7/12 h-full py-10 px-20'>
        <div className='w-full h-full py-2
                        border-2 border-blue-300 bg-white bg-opacity-50
                        flex flex-col justify-start items-center
                        rounded-xl'>
          <div className='h-5/6 w-full scroll-container flex-col flex items-center justify-start'>
            <div className='date tracking-wider text-lg'>
              {format(selectedDate, 'yy년 M월 d일')} 식단 정보
            </div>
            {tags}
            
          </div>
          <div className='w-full h-1/6 pl-2 flex flex-row justify-between items-center'>
          <div className='w-1/3 h-full flex flex-row justify-between items-end'>
            <button className='btn mt-4 px-3 py-1 text-blue-400 rounded'
                    onClick={handleCheckboxAllSelect}>
              {isAllSelected ? '전체 해제' : '전체 선택'}
            </button>
            <button className='btn mt-4 px-3 py-1 text-blue-400 rounded'
                    onClick={handleDelete}>
              선택 삭제
            </button>
          </div>
            <div className='chart h-fit w-full flex flex-row justify-end items-end text-lg px-12 pt-3'>
              누적&nbsp;&nbsp;<span className='text-2xl font-semibold text-blue-700'>{total}</span>&nbsp;kcal
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
