import { useState, useRef, useEffect, useCallback } from 'react';
import Weight from './Weight';
import { HiOutlineXMark } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { PiBarbellThin } from "react-icons/pi";
import { PiBarbellFill } from "react-icons/pi";

export default function Train() {
  const [weight, setWeight] = useState();
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [inputBox, setInputBox] = useState(false);
  const [selDt, setSelDt] = useState('');
  const [tData, setTData] = useState();
  const [newData, setNewData] = useState([]);
  const dtRef = useRef();
  const trainRef= useRef(); const weightRef = useRef(); const setsRef = useRef(); const repsRef = useRef();

  const mksRow2 = (training, weight, sets, reps) => {
    if (!training || !weight || !sets || !reps) {
      alert('모든 항목을 입력해 주세요.')
      return;
    }
    setInputBox(false);
    const newRow = <div key={training} className='w-full rounded-xl h-12 flex flex-row justify-around items-center train_input'>
                    <div className='w-1/12 flex justify-center text-xl'><PiBarbellThin /></div>
                    <div className='w-4/12 align-middle indent-3 border-r-2 text-base'>{training}</div>
                    <div className='w-1/6 text-center border-r-2 text-base'>{weight}&nbsp;kg</div>
                    <div className='w-1/12 text-base text-right'>{sets}&nbsp;세트</div>
                    <div className='w-1/12 flex justify-center text-xl'><HiOutlineXMark /></div>
                    <div className='w-1/12 text-right pr-7 border-r-2 text-base'>{reps}&nbsp;회</div>
                    <div className='w-1/6'>
                      <button className='text-blue-500 text-left px-2 py-1 hover:underline underline-offset-4' onClick={() => delRow2(training)}>Delete</button>
                    </div>
                  </div>
    setRows2((prevRows) => {
      return [...prevRows, newRow]
    });
  };

  const delRow2 = (training) => {
    setRows2(prev => prev.filter(item => item.key !== training));
  };

  const saveNewTrain = () => {
    if (trainRef.current.value === '' || weightRef.current.value === '' || setsRef.current.value === '' || repsRef.current.value === '') {
      alert('입력되지 않은 정보가 있습니다. 빈칸 없이 모두 작성해 주세요.')
    }
    setNewData((prevData) => 
      [...prevData, {training:trainRef.current.value, weight:weightRef.current.value, sets:setsRef.current.value, reps:repsRef.current.value}]
    );
    mksRow2(trainRef.current.value, weightRef.current.value, setsRef.current.value, repsRef.current.value);
  };

  const getTrainData = useCallback(async (date) => {
    const token = sessionStorage.getItem('JWT');
    
    // if (!token) {
    //   alert('session이 만료되어 로그인 페이지로 이동합니다.')
    //   window.location.href = '/login';
    //   return;
    // }

    try {
      let dt = date.replaceAll('-', '');
      const url = `http://10.125.121.219:8080/member/train?date=${dt}`;
      await fetch(url, {
          method:'get', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token
          },
      })
      .then(resp => resp.json())
      .then(data => setTData(data))
      .catch(err => console.error('Failed to get Train Data', err))
    } catch(error) {
      console.log('Error fetching Train:', error);
    };
  }, []);

  const postTrain = async () => {
    if (!newData) {
      alert('새로 저장할 내용이 없습니다.');
      return;
    }
    const token = sessionStorage.getItem('JWT');

    console.log('newData', newData);
    console.log(selDt)
    try {
      let dt = selDt.replaceAll('-', '');
      const url = `http://10.125.121.219:8080/member/train?date=${dt}`;
      const resp = await fetch(url, {
          method:'POST', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token,
          },
          body:JSON.stringify(newData)
      });
      console.log(resp)
      if (resp.ok) {
        getTrainData(selDt);
        setNewData([]);
        setRows2([]);
      }
      else throw new Error("fail to post Diet");
    } catch(error) {
        console.log('Error fetching Diet:', error);
    };
  };

  const delRow = useCallback(async (id) => {
    const token = sessionStorage.getItem('JWT');
    
    try {
      const url = `http://10.125.121.219:8080/member/train?id=${id}`;
      const resp = await fetch(url, {
          method:'DELETE', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token
          },
        }
      );

      if (resp.ok) console.log('Data deleted successfully');
      else console.error('Failed to delete data:', resp.status);
    } catch(error) {
        console.log('Error fetching Train:', error);
    };
  }, [selDt]);

  const transDate = (date) => {
    let dt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let dtArr = dt.split('-').map(a => a.length < 2 ? '0' + a : a).join('-');
    return dtArr;
  };

  const handleDtChange = (e) => {
    // console.log(e.target.value)
    setSelDt(e.target.value);
    console.log(selDt)
  };

  useEffect(() => {
    let dt = transDate(new Date());
    dtRef.current.value = dt;
    console.log(dt)
    setSelDt(dt);
  },[]);

  useEffect(() => {
    if (!selDt) return;
    getTrainData(selDt);
  },[selDt, getTrainData]);

  useEffect(() => {
    if (!tData) return;
    console.log('tData', tData)
    let tm = tData.map(item => <div key={item.id} className='w-full rounded-xl h-12 flex flex-row justify-around items-center train_input'>
                                 <div className='w-1/12 flex justify-center text-xl'><PiBarbellFill /></div>
                                 <div className='w-1/3 align-middle indent-3 border-r-2 text-base'>{item.training}</div>
                                 <div className='w-1/6 text-center border-r-2 text-base'>{item.weight}&nbsp;kg</div>
                                 <div className='w-1/12 text-base text-right'>{item.sets}&nbsp;세트</div>
                                 <div className='w-1/12 flex justify-center text-xl'><HiOutlineXMark /></div>
                                 <div className='w-1/12 text-right pr-7 border-r-2 text-base'>{item.reps}&nbsp;회</div>
                                 <div className='w-1/6'>
                                   <button className='text-blue-500 text-left px-2 py-1 hover:underline underline-offset-4' onClick={() => delRow(item.id)}>Delete</button>
                                 </div>
                               </div>);
    setRows1(tm);
  }, [tData, delRow]);

  return (
    <div className='w-10/12 h-full flex flex-row justify-center items-center'>
      <div className='h-5/6 w-7/12 bg-white text-center rounded-2xl outline-slate-100 outline shadow-2xl'>
        <div className='h-1/6 flex flex-row justify-end items-baseline'>
          <Weight weight={weight} setWeight={setWeight} date={selDt} />
        </div>
        <div className='w-full h-5/6 px-6 flex flex-col justify-start items-center'>
          <div className='w-full flex flex-col justify-center items-center'>
            {rows1}
            {rows2}
          </div>
          {inputBox && 
          <div className='w-full rounded-xl h-12 flex flex-row justify-around items-center train_input'>
            <div className='w-1/12 h-4 pl-2 text-xl'><IoAdd /></div>
            <input name='training' type='text' 
                   className='w-1/3 h-8 bg-slate-50 bg-opacity-50 indent-3 border-r-2 text-base' 
                   placeholder='Training' ref={trainRef}></input>
            <input name='weight' type='text' 
                   className='w-1/6 h-8 bg-slate-50 bg-opacity-50 text-center border-r-2' 
                   placeholder='Weight' ref={weightRef}></input>
            <input name='sets' type='number' 
                   className='w-1/12 h-8 bg-slate-50 bg-opacity-50 text-center pl-2' 
                   placeholder='Sets' ref={setsRef}></input>
            <div className='w-1/12 flex justify-center text-xl'><HiOutlineXMark /></div>
            <input name='reps' type='number' 
                   className='w-1/12 h-8 bg-slate-50 bg-opacity-50 text-center border-r-2 pr-2' 
                   placeholder='Reps' ref={repsRef}></input>
            <div className='w-1/6 h-8'>
              <button className='text-blue-500 text-left px-2 py-1 hover:underline underline-offset-4' 
                      onClick={saveNewTrain}>Save</button>
            </div>
          </div>}
          <div className='w-full h-5/6 border-t-2'>
            <button className='nav text-slate-400 mt-3 
                              hover:text-black hover:outline outline-slate-200 
                              rounded-xl px-2 py-1'
                    onClick={() => setInputBox(true)}>add</button>
          </div>
          <div className='h-1/6 w-full flex flex-row justify-between items-center'>
            <button className='w-1/12 pt-2 py-1 btn bg-slate-200 hover:bg-slate-400 rounded-xl hover:text-white' onClick={postTrain}>저장</button>
            <input className='h-1/2 text-xl text-gray-600 pr-4' type='date' name='train_date' ref={dtRef} onChange={handleDtChange}></input>
          </div>
        </div>
      </div>
    </div>
  )
}
