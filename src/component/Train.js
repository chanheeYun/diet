import { useState, useRef, useEffect } from 'react';
import Weight from './Weight';
import { HiOutlineXMark } from "react-icons/hi2";

export default function Train() {
  const [weight, setWeight] = useState();
  const [rows, setRows] = useState([]);
  const [inputBox, setInputBox] = useState(false);
  const [selDt, setSelDt] = useState("");
  const dtRef = useRef();
  const trainRef= useRef(); const weightRef = useRef(); const setsRef = useRef(); const repsRef = useRef();
  <input name='check' type='checkbox' className='w-1/12 h-4'></input>

  const mksRow = (training, weight, sets, reps) => {
    setInputBox(false);
    const newRow = <div className='w-full rounded-xl h-12 flex flex-row justify-around items-center train_input'>
                    <input name='check' type='checkbox' className='w-1/12 h-4'></input>
                    <div className='w-1/3 align-middle indent-3 border-r-2 text-base'>{training}</div>
                    <div className='w-1/6 text-center border-r-2 text-base'>{weight}&nbsp;kg</div>
                    <div className='w-1/12 text-base text-right'>{sets}&nbsp;세트</div>
                    <div className='w-1/12 flex justify-center text-xl'><HiOutlineXMark /></div>
                    <div className='w-1/12 text-right pr-7 border-r-2 text-base'>{reps}&nbsp;회</div>
                    <div className='w-1/6'>
                      <button className='text-blue-500 text-left px-2 py-1 hover:underline underline-offset-4' onClick={delRow}>Delete</button>
                    </div>
                  </div>
    setRows((prevRows) => {
      return [...prevRows, newRow]
    });
  };

  const getTrainData = (dt) => {
    console.log(dt);
  };  

  const delRow = () => {

  };

  const getToday = () => {
    const today = new Date();
 
    let dt = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let dtArr = dt.split('-').map(a => a.length < 2 ? '0' + a : a).join('-');
    return dtArr ;
  };

  const handleDtChange = (e) => {
    setSelDt(e.target.value);
  };

  useEffect(() => {
    const dt = getToday();
    dtRef.current.value = dt;
    setSelDt(dt);
  },[]);

  useEffect(() => {
    if (!selDt) return;
    getTrainData(selDt);
  },[selDt]);

  return (
    <div className='w-10/12 h-full flex flex-row justify-center items-center'>
      <div className='h-5/6 w-7/12 bg-white text-center rounded-2xl outline-slate-100 outline shadow-2xl'>
        <div className='h-1/6 flex flex-row justify-end items-baseline'>
          <Weight weight={weight} setWeight={setWeight} date={selDt} />
        </div>
        <div className='w-full h-5/6 px-6 flex flex-col justify-start items-center'>
          <div className='w-full flex flex-col justify-center items-center'>
            {rows}
          </div>
          {inputBox && 
          <div className='w-full rounded-xl h-12 flex flex-row justify-around items-center train_input'>
            <div className='w-1/12 h-4'></div>
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
                      onClick={() => mksRow(trainRef.current.value, weightRef.current.value, setsRef.current.value, repsRef.current.value)}>Save</button>
            </div>
          </div>}
          <div className='w-full h-5/6 border-t-2'>
            <button className='nav text-slate-400 mt-3 
                              hover:text-black hover:outline outline-slate-200 
                              rounded-xl px-2 py-1'
                    onClick={() => setInputBox(true)}>add</button>
          </div>
          <div className='h-1/6 w-full flex flex-row justify-end items-center'>
            <input className='h-1/2 text-xl text-gray-600 pr-4' type='date' name='train_date' ref={dtRef} onChange={handleDtChange}></input>
          </div>
        </div>
      </div>
    </div>
  )
}
