import { useState,useCallback,useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength]= useState(8);
  const [alNum,setAlNum]= useState(false);
  const [alChar,setAlChar]= useState(false);
  const [password,setPassword]= useState('');
  const passwordRef=useRef(null);
  const passwordGenerator= useCallback( ()=>{
    let pass= '';
    let str= 'ABCDEFGHIJKLMNOPQRSTUVWQYZabcdefghijklmnopqrstuvwxyz';
    if(alNum) str+='1234567890'
    if(alChar) str+='!@#$%^&*-_+=[]{}~`';
    for(let i=1;i<=length;i++)
    {
      let char =  Math.floor(Math.random() * str.length +1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  }, [length,alNum,alChar,setPassword])


  useEffect(()=>{
    passwordGenerator();
  },[length,alNum,alChar,passwordGenerator])
  
  
  let copyPasswordToClipboard=useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  },
  [password])






  console.log(length,alChar,alNum);
  return (
    <>
       <div className='mt-10 py-10 w-full max-w-md mx-auto shadow-md rounded-lg px-8 text-orange-500 bg-gray-700'>
       <h1 className='text-4xl text-center text-white mb-6'>Password generator</h1>
     
        <div className='flex shadow rounded-lg overflow-hidden '>
          <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gao-x-1'>
            <input
            id="lengthInput"
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setLength(e.target.value);
            }}
            />
            <label htmlFor="lengthInpuut">Length: {length}</label>
          </div>
          <div className='flex items-center gao-x-1'>
            <input
            type='checkbox'
            defaultChecked={alNum}
            id="numberInput"
            onChange={()=>{
              setAlNum((prev)=>!prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gao-x-1'>
            <input
            type='checkbox'
            defaultChecked={alChar}
            id="characterInput"
            onChange={()=>{
              setAlChar((prev)=>!prev)
            }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
