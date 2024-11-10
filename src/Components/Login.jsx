import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

function Login() {
    const [username,setUsername] =useState("")
    const [password,setPassword] =useState("")
    const navigate=useNavigate()

    async function handleSumbit() {
      const  data={
            username:username,
            password:password
        }
        try{
            const response= await axios.post('http://127.0.0.1:8000/api/v1/auth/login/',data,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
                
            
            if(response.status===200){
                localStorage.setItem('token',response.data.token)
                console.log(response.data.token)
                navigate('/home')
            }

        }catch(error){
                console.log(error)
        }
        
    }
  return (
    <>
    <div className='login-container'>
    <div className='login-box'>
        <h1 className='login-title'>
            Login
            <span className='brand-name'> ToDo App</span>
        </h1>

        <form >
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input
                    type='text'
                    placeholder='Enter username'
                    className='input-field'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label className='label'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input
                    type='password'
                    placeholder='Enter Password'
                    className='input-field'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Link to='/signup' className='signup-link'>
                {"Don't"} have an account?
            </Link>

            <div>
                <button className='btn-submit' 
                // disabled={loading}
                 onClick={handleSumbit}>
                    {/* {loading ? <span className='loading-spinner'></span> : "Login"} */}Login
                </button>
            </div>
        </form>
    </div>
</div>


    </>
  )
}

export default Login