import React from 'react'
import OButton from '../UI/OButton'

export default function Main() {
  return (
    <div className='flex flex-row '>
        <div className='w-56 h-64 m-5
                        flex justify-center items-center 
                        text-5xl 
                        bg-emerald-400 rounded-xl'>
            <OButton title='로그인' />
        </div>
        <div className='w-56 h-64 m-5
                        flex justify-center items-center 
                        text-5xl 
                        bg-sky-600 rounded-xl'>
            <OButton title='회원가입' />
        </div>
    </div>
  )
}
