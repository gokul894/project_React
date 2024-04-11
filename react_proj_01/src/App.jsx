import React, { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [isNumber, setIsNumber] = useState(false)
  const [isSymbole, setIsSymbole] = useState(false)
  const [password, setPassword] = useState()

  const refPassword = useRef(null)

  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let Number = "1234567890"
    let char = "+_)(*&^%$#@!~`_=[]{}"

    if (isNumber) str += Number
    if (isSymbole) str += char

    for (let i = 0; i < length; i++){
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(pass)

  },[length,isNumber,isSymbole,setPassword])

  useEffect(passwordGenrator, [length,isNumber,isSymbole, passwordGenrator])

  return (
    <div className='min-h-[100dvh] min-w-full flex place-content-center items-center'>
      <div className=' flex place-content-center items-center bg-slate-500 rounded-lg flex-col p-8 shadow-lg shadow-slate-600'>
      <h1 className='text-white font-bold text-3xl mb-6'>PASSWORD GENRATOR</h1>
      <div className='mt-4'>
        <input type="text" value={password} ref={refPassword} className=' min-w-md outline-none py-2 text-stone-700 font-semibold px-6 text-xl rounded-l-lg' />
        <button type="button" onClick={copyPassword} className=' bg-blue-300 py-2 px-6 rounded-r-lg text-gray-800 font-bold text-xl'>Copy</button>
      </div>
      <div className='mt-4'>
        <input type="range" min={8} max={20} onChange={(e)=>(setLength(e.target.value))} className=' max-w-[100px] mr-2'/>
        <label htmlFor="range" className=' font-bold text-xl text-amber-900' >Length: {length}</label>

        <input type="checkbox" onChange={() =>(setIsNumber(!(isNumber)))} id="checker" className='ml-8 mr-2 h-4'/>
        <label htmlFor="checker" className=' font-bold text-xl text-amber-900'>Number</label>
        <input type="checkbox" onChange={() =>(setIsSymbole(!(isSymbole)))} id="checker" className='ml-8 mr-2 h-4' />
        <label htmlFor="checker" className=' font-bold text-xl text-amber-900'>Symbole</label>

      </div>
      </div>
    </div>
  )
}

export default App
