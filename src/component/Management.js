import React, { useCallback, useEffect, useState } from 'react'
import Calendar from './calendar/Calendar'

export default function Management() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dData, setDData] = useState([]);
  const [tags,  setTags] = useState();
  const [tagStates, setTagStates] = useState({});
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);

  const getDetail = useCallback(async (code) => {
    const token = sessionStorage.getItem('JWT');

    try {
      const url = `http://10.125.121.219:8080/member/diet?code=${code}`;
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();

      setTagStates((prev) => ({
        ...prev,
        [code]: {
          visible: true,
          detail: data,
        },
      }));
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  }, []);

  const viewDetail = useCallback((code) => {
    setTagStates((prev) => {
      const isCurrentlyVisible = prev[code]?.visible;
      if (isCurrentlyVisible) {
        return {
          ...prev, [code]: {...prev[code], visible: false},
        };
      }
      getDetail(code);
      return {
        ...prev, [code]: {...prev[code], visible: true},
      };
    });
  }, [getDetail]);

  const getDData = useCallback(async (date) => {
    const token = sessionStorage.getItem('JWT');
    
    if (!token) {
      // JWT가 없으면 로그인 페이지로 이동 처음 로드 시에 한번만 확인
      alert('session이 만료되어 로그인 페이지로 이동합니다.')
      window.location.href = '/login';
      return;
    }

    try {
      let dt = date.replaceAll('-', '');
      console.log(dt)
      const url = `http://10.125.121.219:8080/member/diet?date=${dt}`;
      await fetch(url, {
          method:'get', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token
          },
      })
      .then(resp => resp.json())
      .then(data => setDData(data))
      .catch(err => console.error('Failed to get Diet Data', err))
    } catch(error) {
      console.log('Error fetching Diet:', error);
    };
  }, []);

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
      const url = `http://10.125.121.219:8080/member/diet`;
  
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
      if (!token) {
        alert('session이 만료되어 로그인 페이지로 이동합니다.');
        window.location.href = '/login';
        return;
      }
      await getDData(tempDt);
    };
  
    fetchData();
  }, [selectedDate, getDData]);

  useEffect(() => {
    if (!dData) return;

    if (!Array.isArray(dData)) return;
    const initialStates = dData.reduce((acc, item) => {
      acc[item.code] = false;
      return acc;
    }, {});
    setTagStates(initialStates);

    const tm = dData.map((item) =>  <div key={item.num}
                                        className="chart text-lg 
                                                  w-10/12 h-12 flex flex-col 
                                                  justify-start item-center 
                                                  border-b-2 border-gray-200">
                                      <div className="w-full flex flex-row justify-between items-center">
                                        <div className="hidden w-1/12 h-full">{item.code}</div>
                                        <input type="checkbox"
                                              checked={selectedTags.has(item.num)}
                                              onChange={() => handleCheckboxChange(item.num)} />
                                        <div className="w-1/4 h-full text-center pt-2.5">{item.name}</div>
                                        <div className="w-1/4 h-full text-center pt-2.5">{item.gram}</div>
                                        <div className="w-1/6 h-fit pt-4 pb-0.5 mt-0.5 text-xs cursor-pointer text-blue-500 underline"
                                              onClick={() => viewDetail(item.code)}>
                                          view detail
                                        </div>
                                      </div>
                                      {tagStates[item.code]?.visible && tagStates[item.code]?.detail && (
                                        <div className="detail-box mt-2 p-2 border-t border-gray-300">
                                          <p>Details for {tagStates[item.code].detail.name}</p>
                                          <p>Calories: {tagStates[item.code].detail.calories}</p>
                                          <p>Protein: {tagStates[item.code].detail.protein}</p>
                                          <p>Fat: {tagStates[item.code].detail.fat}</p>
                                        </div>
                                      )}
                                    </div>
                                  );
    setTags(tm);
  }, [dData, tagStates, viewDetail, selectedTags]);

  return (
    <div className='w-full h-full flex flex-row justify-between pl-40 items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className='w-7/12 h-full py-10 px-20'>
        <div className='w-10/12 h-full py-5 
                        border-2 border-blue-300 bg-white bg-opacity-50
                        flex flex-col justify-start items-center
                        rounded-xl'>
          <div className='h-5/6 w-full scroll-container'>

            {tags}
          </div>
          <div className='w-full h-1/6 pl-2 flex flex-row justify-start items-end'>
            <button className='btn mt-4 px-3 py-1 text-blue-400 rounded'
                    onClick={handleCheckboxAllSelect}>
              {isAllSelected ? '전체 해제' : '전체 선택'}
            </button>
            <button className='btn mt-4 px-3 py-1 text-blue-400 rounded'
                    onClick={handleDelete}>
              선택 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
