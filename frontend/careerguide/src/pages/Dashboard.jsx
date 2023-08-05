import React, { useEffect } from 'react'
import Todo from '../components/Todo'
import { privateAxios } from '../services/helper'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    let navigate = useNavigate()

        useEffect(()=>{
            privateAxios.get("dashboard").then(data=>{
                console.log(data)
            }).catch(error=>{
                console.log(error)
                toast.error("Session has expired")
                navigate("/login")
            })
        },[])


  return (
    <div>
        <Todo />
    </div>
  )
}

export default Dashboard