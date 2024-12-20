import React from 'react'

export default function OButton({name, width, height, handleClick}) {
  return (
    <button className={`btn w-${width} h-${height} mt-3 
                          text-xl rounded-lg
                          text-white
                          bg-blue-400 opacity-80
                          hover:shadow-xl
                          hover:bg-blue-600`}
                onClick={handleClick}>{name}</button>
  )
}

