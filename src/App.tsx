
import {useState} from 'react'

export default function App() {
	const [count,setCount]=useState<number>(0)
  return (
  <div className='w-screen flex-col gap-10 h-screen flex justify-center bg-slate-900 items-center text-lg'>
  <button onClick={()=> setCount(pre => pre+1)} className="bg-purple-700 w-36 font-bold hover:scale-105 duration-150 cursor-pointer h-14 rounded-md text-white text-center ">
      Click on me
    </button>
	
	<h1 className='text-white text-2xl'> {count} </h1>
  </div>
  
  )
}

