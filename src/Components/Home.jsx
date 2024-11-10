import axios from "axios"
import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  const token=localStorage.getItem('token')

  const [tasks,setTasks]=useState([])

  const [task,setTask]=useState("")

  const [com,setCom]=useState(0);

  const [undo,setUndo]=useState(0);

  const [del,setDel]=useState(0);

  const navigate=useNavigate()

  const username=localStorage.getItem('username')


  async function handleAdd(){
    const data={
      task:task
    }
    if (task!==""){
      try{
        const response=await axios.post('http://127.0.0.1:8000/api/v1/todobend/createtask/',data,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`
          }
        })
        // console.log(response)
        if(response.status===200){
          console.log("success")
          toast.success("Task Added")      }
      }
      catch(error){
        console.error(error)
      }
      setTask('')
    }
      else{
        toast.error("Add the Task")
      }
    
  }

  function handleUpdate(id){
    navigate(`/update/${id}`)
    // toast("Task Updated") 
  }

  async function handleDelete(id) {
    // const data={
    //   task:task
    // }
    try{
      const response=await axios.delete(`http://127.0.0.1:8000/api/v1/todobend/deletefield/${id}`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`
        }
      })
      console.log(response)
      if(response.status===200){
        console.log("Task Deleted")
        toast.error("Task Deleted")      }
    }
    catch(error){
      console.error(error)
    }
    setDel(id)
  }

  async function handleComplete(id){
    const data={
      task:task
    }
    try{
      const response=await axios.put(`http://127.0.0.1:8000/api/v1/todobend/updatefield/${id}`,data,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`
        }
      })
      console.log(response)
      if(response.status===200){
        console.log("success")
        toast.success("Task Completed")       }
    }
    catch(error){
      console.error(error)
    }
    setCom(id)
  }
  async function handleUndo(id) {
    const data={
      task:task
    }
    try{
      const response=await axios.put(`http://127.0.0.1:8000/api/v1/todobend/updatefield/${id}`,data,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`
        }
      })
      console.log(response)
      if(response.status===200){
        console.log("Undoed Sucess")
        toast.success("Task Undoed")       }
    }
    catch(error){
      console.error(error)
    }
    setUndo(id)
  }


  useEffect(()=>{
    async function fetchData(){
      try{
        const response=await axios.get('http://127.0.0.1:8000/api/v1/todobend/task/',{
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`
          }
        })
        // console.log(response)
        if(response.status===200){
          setTasks(response.data.data)
        }
      }
      catch(error){
        console.error(error)
      }
    }
    fetchData();
  },[token,task,com,undo,del])

    return (
      <div className=' text-center bg-sky-900 text-white z-0 '>
        <ToastContainer theme="colored" transition={Zoom}/>
        <h1>Todo App</h1>
        <h2>Welcome {username}</h2>
      <div>
        <h1 className=' mt-10 mb-4'>Things to be Done</h1>
        <ul>
            {
                tasks.filter((item)=>item.is_Completed===false).map((item)=>{
                        return (
                            <li key={item.id}>
                                <h3 className=' inline-block'>{item.name}</h3>
                                <button className=' ml-4 border-2 border-red-500 hover:bg-red-200' onClick={(e)=>{e.preventDefault();handleDelete(item.id)}}>Delete</button>
                                <button className=' ml-4 border-2 border-blue-500 hover:bg-blue-200' onClick={(e)=>{e.preventDefault();handleUpdate(item.id);}}>Update</button>
                                <button  onClick={(e)=>{e.preventDefault();handleComplete(item.id)}} className=' ml-4 border-2 border-green-500 hover:bg-green-200 rounded-full hover:text-black text-white'>Complete</button>
                            </li>
                        )
                })
            }
        </ul>
      </div>
      <div className="mt-10">
        <input type="text" placeholder='addTask' value={task} onChange={(e)=>{
         
          setTask(e.target.value)
          }} />
        
        <button className=' ml-4 border-2 border-green-500 hover:bg-green-200 rounded-full hover:text-black text-white' type='submit' onClick={(e)=>{e.preventDefault();handleAdd()}}>Add</button>
      </div>
      <div>
      <div className=' mt-10 mb-4'>
        <h1 className=' mt-10 mb-4'>Completed</h1>
        <ul>{
                tasks.filter((item)=>item.is_Completed===true).map((item)=>{
                        return (
                            <li key={item.id}>
                                <p className=' inline-block text-green-400 mr-10'>Completed</p>
                                <h3 className=' inline-block'>{item.name}</h3>
                                <button className=' ml-4 border-2 border-red-500 hover:bg-red-200' onClick={(e)=>{e.preventDefault();handleDelete(item.id)}}>Delete</button>
                                <button className=' ml-4 border-2 border-blue-500 hover:bg-blue-200' onClick={(e)=>{e.preventDefault();handleUndo(item.id)}}>Undo</button>
                            </li>
                        )
                })
            }
        </ul>
      </div>
    </div>
    </div>
    )
  }