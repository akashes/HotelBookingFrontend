import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseURL } from '../Services/baseURL'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

function LoginPage() {
    const navigate  = useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState("")
    const[showPassword,setShowPassword]=useState(false)

    const {setUser} = useContext(UserContext)

    const handleLogin=async(e)=>{
        e.preventDefault()
        console.log('login buton clicked');
    try{
        const result = await axios.post(`${baseURL}/login`,{
            email,
            password
        },{withCredentials:true})
        if(result.status==200){
            alert('login successfull')
            setUser(result.data)
            navigate('/')
        }else{
            alert('login failed')
        }
    }catch(err){
        console.log(err);
        alert('login failed')
    }
    }
  return (
    <div className='mt-4 grow flex items-center justify-center '>
             <div className='-mt-64'>
             <h1 className='text-4xl text-center mb-4'>Login</h1>

<form className=' max-w-md mx-auto'>
  <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" name="" placeholder='your@email.com' id="" />
  <input value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword?'text':'password'} name="" placeholder='password' id="" />
<button onClick={handleLogin} className='primary'>Login</button>
<div className='text-center py-2 text-gray-500'>Don't have an account?
    <Link className='text-black ms-2 underline' to='/register' >Register now</Link>
</div>

</form>
<span onClick={()=>setShowPassword(!showPassword)}>
  {showPassword ? 
  
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
}

  </span>
             </div>
    </div>
  )
}

export default LoginPage
