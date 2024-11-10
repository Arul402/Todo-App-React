import React from 'react'

import { useState } from 'react';

import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"


export default function Update() {

    const [task,setTask]=useState("")

    const {id}=useParams()

    const navigate=useNavigate();

    const token=localStorage.getItem('token')

    async function handleSubmit(){
        const data={
            task:task
        }
        try{
          const response=await axios.put(`http://127.0.0.1:8000/api/v1/todobend/updatetask/${id}`,data,{
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Token ${token}`
            }
          })
          console.log(response)
          if(response.status===200){
            navigate('/home')
                 }
        }
        catch(error){
          console.error(error)
        }
      }

  return (
    <div className=' text-center'>
       <h1>Update</h1>
      <form>
        <p>
            <label htmlFor="task">Update task: </label>
            <input id="task" type="text" placeholder='update task' value={task} onChange={(e)=>setTask(e.target.value)}  />
        </p>
        <button type="submit" onClick={(e)=>{e.preventDefault();handleSubmit();}} >Submit</button>
      </form>
    </div>
  )
}
