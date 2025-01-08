import React, { useCallback, useRef, forwardRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import SearchTag from './SearchTag';
import OButton from '../UI/OButton';
import { IoIosArrowForward } from "react-icons/io";
import noResult from '../img/no-result.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExampleCustomInput = forwardRef(({ value, onClick, className }, ref) => (
  <button className={className} onClick={onClick} ref={ref}>
    {value}
  </button>
));

export default function Search() {
  const [searchData, setSearchData] = useState();
  const [added, setAdded] = useState([]);
  const [sel, setSel] = useState(
                              <div className='w-full h-full
                                              flex flex-col justify-center items-center'>
                                <p className='content1 opacity-20 text-xl'>내가 먹은 음식을 추가해 보세요.</p>
                              </div>);
  const [tags, setTags] = useState();
  const [searchWord, setSearchWord] = useState();
  const [tagStates, setTagStates] = useState({});
  const searchRef = useRef();
  const first = useParams().item;
  const gramRefs = useRef({});
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  
  const handleInputChange = (code, e) => {
    const value = e.target.value;
    gramRefs.current[code] = parseFloat(value);
    console.log(gramRefs.current);
  };

  const add = (food) => {
    console.log('add 실행')
    setTagStates((prev) => ({
      ...prev,
      [food.code]: !prev[food.code],
    }));

    setAdded((prevAdded) => {
      const alreadyExists = prevAdded.some((item) => item.name === food.name);
  
      if (alreadyExists) {
        alert('이미 선택된 식단입니다.');
        return prevAdded;
      }
      return [...prevAdded, {...food}];
    });
  };

  const delAdded = useCallback((code) => {
    setTagStates((prev) => ({
      ...prev,
      [code]: false,
    }));
    setAdded(prev => prev.filter(item => item.code !== code));
  }, []);

  const transDate = (date) => {
    if (!date) return '';
    let dt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let dtArr = dt.split('-').map(a => a.length < 2 ? '0' + a : a).join('-');
    return dtArr;
  };

  const postDiet = async () => {
    const date = new Date(startDate);
    let dt = transDate(date).replaceAll('-', '');
    console.log(dt)
    const token = sessionStorage.getItem('JWT');
    
    // if (!token) {
    //   alert('session이 만료되어 로그인 페이지로 이동합니다.')
    //   window.location.href = '/login';
    //   return;
    // }

    let data = added.map(item => ({ code: item.code, 
                                    gram: gramRefs.current[item.code], 
                                    date: date})

    );
    
    console.log('post diet data', data);
    try {
      const resp = await fetch(`http://10.125.121.219:8080/member/diet?date=${dt}`, {
          method:'POST', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token,
          },
          body:JSON.stringify(data)
      });
      if (resp.ok) {
        alert('내 식단에 저장')
        navigate('/manage')
      }
      else throw new Error("fail to post Diet");
    } catch(error) {
        console.log('Error fetching Diet:', error);
    };
  };
  
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();  // Enter 키 입력 시 폼 제출을 막습니다.
      e.stopPropagation(); // 이벤트 전파를 중지시켜 다른 이벤트가 실행되지 않게 합니다.
      setSearchWord(searchRef.current.value);
    }
  }

  useEffect(() => {
    // if (!added || added.length === 0) return;
    console.log('현재 추가된 아이템:', added);
  
    const selectedItems = added.map(item => <div key={item.code} 
                                                 className='w-full h-11 flex flex-row 
                                                            justify-between items-center text-xl
                                                            bg-slate-50 bg-opacity-60 border-b-2'>
                                              <div className='w-2/3 text-center'>{item.name}</div>
                                              <div className='w-1/3 pr-2 flex flex-row justify-end items-center'>
                                                <input
                                                  className='w-3/6 text-right pr-1 mr-1 bg-transparent'
                                                  type='text'
                                                  name='gram'
                                                  defaultValue='0'
                                                  onChange={(e) => handleInputChange(item.code, e)}
                                                />
                                                <span className='text-xl w-fit'>g</span>
                                                <button className='text-xl w-fit ml-6'
                                                        onClick={() => delAdded(item.code)}>×</button>
                                              </div>
                                            </div>
    );
    setSel(selectedItems);
  }, [added, delAdded]);

  useEffect(() => {
    console.log(first)
    setSearchWord(first);
  }, [first])

  useEffect(() => {
    if (!searchWord) return;

    const loadData = async () => {
      await fetch(`http://10.125.121.219:8080/calories/${searchWord}`)
      .then(resp => resp.json())
      .then(data => {
        console.log('data 설정 ', data)
        setSearchData(data)
      })
      .catch(error => {
        console.error('Error fetching Calorie Data:', error);
      });
    };

    loadData();
  }, [searchWord]);
  
  useEffect(() => {
    if (!searchData) return;
    console.log('만들기 시작')
    let tm = searchData.map(item => <SearchTag 
                                      key = {item.code}
                                      name = {item.name} 
                                      kcal = {item.kcal}
                                      carbo = {item.carbohydrate}
                                      protein = {item.protein}
                                      fat = {item.fat}
                                      sugar = {item.sugar}
                                      nacl = {item.natrium}
                                      handleClick={() => add(item)}
                                      isAdded={tagStates[item.code] || false} />);
    setTags(tm);
  }, [searchData, tagStates]);
  
  return (
    <div className='w-10/12 h-full mb-2 flex flex-col justify-start items-center'>
      <div className='w-full h-1/5 pr-2 mb-2 flex flex-col justify-center items-center'>
        <form className='w-1/2 
                         flex flex-col justify-start items-center'>
          <div className='w-7/12 h-16 
                          px-5 my-6 rounded-3xl 
                          flex flex-row justify-center items-center 
                          drop-shadow-lg bg-slate-50'>
            <input className='search w-full h-14 pl-3 text-xl indent-1 bg-slate-50 tracking-wider' 
                    type='text' id='search' ref={searchRef}
                    onKeyDown={(e) => activeEnter(e)}></input>
            <input className='search text-xl mx-2 text-blue-700' type='button' value='검색' onClick={() => setSearchWord(searchRef.current.value)}></input>
          </div>
        </form>
        {!searchData ? 
          <h3 className='content1 text-xl'><span className='text-2xl text-blue-500 font-semibold'>'{searchWord}'</span>에 대한 검색 결과가 없습니다.</h3> :
          <h3 className='content1 text-xl'><span className='text-2xl text-blue-500 font-semibold'>'{searchWord}'</span>에 대한 검색 결과입니다.</h3>
        }
      </div>
      <div className='w-full h-4/5 flex flex-row justify-center items-center'>
        <div className='w-3/5 h-full px-0.5 pb-0.5 flex flex-col justify-center items-center'>
          <div className='w-full h-full 
                          mb-5 px-2
                          bg-white border-2 rounded-xl border-opacity-50
                          hover:border-blue-500
                          scroll-container'>
            {
              tags ? 
              <table className='w-full h-full'>
                <thead className='sticky top-0 bg-white'>
                  <tr className=''>
                    <th className="w-2/12 py-4 text-center text-lg">
                      식품명
                    </th>
                    <th className="w-1/12 py-4 text-center">
                      열량(kcal)
                    </th>
                    <th className="w-1/12 py-4 text-center">
                      탄수화물(g)
                    </th>
                    <th className="w-1/12 py-4 text-center">
                      단백질(g) 
                    </th>
                    <th className="w-1/12 py-4 text-center text-base">
                      지방(g)
                    </th>
                    <th className="w-1/12 py-4 text-center text-base">
                      당류(g)
                    </th>
                    <th className="w-1/12 py-4 text-center text-base">
                      나트륨(mg)
                    </th>
                    <th className="w-1/12 py-4 text-center text-base">
                      추가
                    </th>
                  </tr>
                </thead>
                <tbody className=''>
                  {tags}
                </tbody>
              </table>
              : <div className='w-full h-full
                                flex flex-col justify-center items-center'>
                  <img className='w-44 h-44 opacity-20' src={noResult} alt='검색 결과 없음' />
                  <p className='content1 opacity-20 text-xl'>검색 결과가 없습니다.</p>
                </div>
            }
          </div>
        </div>
        <div className='w-fit h-full flex justify-center items-center'>
          <IoIosArrowForward className='w-24 h-24 opacity-20'/>
        </div>
        <div className='w-2/6 h-full'>
          <div className='h-5/6 border-2 px-4 pt-2
                          hover:border-blue-500 rounded-xl drop-shadow-lg bg-white'>
            <div className='w-full h-10 pl-36'>
              <DatePicker
                className='text-blue-950 text-lg date tracking-wide'
                dateFormat='yyyy년 MM월 dd일'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<ExampleCustomInput className="example-custom-input" />}
              />
            </div>
            <div className='w-full h-5/6 justify-start items-center flex flex-col scroll-container'>
              {sel}
            </div>
          </div>
          <div className='h-1/6'>
            <OButton name='내 식단에 추가하기' width='full' height='14' handleClick={postDiet} />
          </div>
        </div>
      </div>
    </div>
  )
}
