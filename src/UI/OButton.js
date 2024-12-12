import React from 'react'

export default function OButton({title}) {
  return (
    <div className={`w-56 h-64 m-5
                    flex justify-center items-center 
                    text-5xl 
                    bg-sky-600 rounded-xl`}>
      {title}
    </div>
  )
}

