import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Signup() {
    const [username,setUsername]=useState()
    const [fname,setFname]=useState()
    const [lname,setLname]=useState()
    const [email,setEmail]=useState()
    const navigate=useNavigate()
async function handlecreate() {
  const data={
    username:username,
    first_name:fname,
    last_name:lname,
    email:email
  }
  try{
    const response= await axios.post('http://127.0.0.1:8000/api/v1/auth/create/',data,{
      headers:{
        'Content-Type':'application/json'
    }
    })
    if (response.status===200){
      localStorage.setItem('username',data.first_name)
      console.log(response.data)
      navigate('/')
    }
  }catch(error){
    console.log(error)
  }
  
}
  return (
    <>
    <div>Signup</div>
    <form>
      <label htmlFor='email'>Username</label>
      <input type='text' placeholder='Email' id='email' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
      <label htmlFor='fname'>First Name</label>
      <input type='text' id='fname' placeholder='Fname' value={fname} onChange={(e)=>{setFname(e.target.value)}}/>
      <label htmlFor='lname'>Last Name</label>
      <input type='text' id='lname' placeholder='Lname' value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
      <label htmlFor='email'>Email</label>
      <input type='text' id='email' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <button type='sumbit' onClick={(e)=>{e.preventDefault();handlecreate()}}>Create</button>
    </form>
    </>
  )
}

export default Signup