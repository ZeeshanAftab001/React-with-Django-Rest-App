import React, { useState } from 'react'

export default function Login() {

  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")

  const handleSubmit=()=>{

  }


  return (
    <div>
      
      <div className='flex justify-center p-3 items-center bg-blue-400 shadow-xl rounded-2xl mt-5'>
      <form onSubmit={handleSubmit} action="">
      <h1 className='justify-center flex p-3'>Login</h1>
      <div className='shadow-xl bg-white p-3 rounded-xl'>
        <input type="text" onChange={(e)=>e.target.value(setUsername(e.value))} value="Username"/>
      </div>
      <div className='shadow-xl bg-white  rounded-xl mt-3 w-full p-3'>
        <input type="text" onChange={(e)=>e.target.value(setPassword(e.value))} value="Password"/>
      </div>
      <button className='flex mt-4 p-2 w-full rounded-xl justify-center bg-white' type='submit'>Login</button>
      </form>
      </div>
    </div>
  )
}
