import { IoIosAddCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';

export default function SearchTag({name, kcal, carbo, protein, fat, sugar, nacl, handleClick}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if(isAdded) return;
    setIsAdded(!isAdded);
  };

  return (
    <tr className={`${!isAdded ? 'bg-white' : 'bg-sky-100'} border-b ${!isAdded ? 'hover:bg-gray-50' : 'hover:bg-sky-50'}`}>
      <td className="pl-1 py-4 font-medium text-gray-900 text-center text-wrap">
        {name}
      </td>
      <td className="py-4 text-base text-center">
        {kcal}
      </td>
      <td className="py-4 text-center">
        {carbo}
      </td>
      <td className="py-4 text-center">
        {protein}  
      </td>
      <td className="py-4 text-center text-sm">
        {fat}
      </td>
      <td className="py-4 text-center text-sm">
        {sugar}
      </td>
      <td className="py-4 text-center text-sm">
        {nacl}
      </td>
      <td className="py-4 text-center text-xl">
        <button onClick={() => {handleClick(); handleAdd();}} className=''>
          {!isAdded ? <IoIosAddCircleOutline /> : <FaCheck />}
        </button>
      </td>
    </tr>
  )
}
