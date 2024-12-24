import { IoIosAdd } from "react-icons/io";

export default function SearchTag({name, kcal, carbo, protein, fat, sugar, nacl, handleClick}) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="py-4 font-medium text-gray-900 text-center">
        {name}
      </td>
      <td className="px-6 py-4 text-base text-center">
        {kcal}
      </td>
      <td className="px-6 py-4 text-center">
        {carbo}
      </td>
      <td className="px-6 py-4 text-center">
        {protein}  
      </td>
      <td className="px-6 py-4 text-center text-sm">
        {fat}
      </td>
      <td className="px-6 py-4 text-center text-sm">
        {sugar}
      </td>
      <td className="px-6 py-4 text-center text-sm">
        {nacl}
      </td>
      <td className="px-6 py-4 text-center text-xl">
        <button onClick={handleClick} className=''>
          <IoIosAdd />
        </button>
      </td>
    </tr>
  )
}
