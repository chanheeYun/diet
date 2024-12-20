export default function SearchTag({food, handleClick}) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900 text-center">
        {food}
      </td>
      <td className="pl-8 py-4 whitespace-nowrap text-base">
        {food}
      </td>
      <td className="pr-16 py-4 text-right">
        {food}
      </td>
      <td className="pr-9 py-4 text-right">
        {food}  
      </td>
      <td className="px-6 py-4 text-center text-sm">
        {food}
      </td>
      <td className="px-6 py-4 text-center text-sm">
        <button onClick={handleClick}>+</button>
      </td>
    </tr>
  )
}
