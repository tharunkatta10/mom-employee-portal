
import React, { useContext, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({search, setSearch}) => {

  const navigate = useNavigate();
  const {user , error , jwtToken} = useContext(UserContext)

    useEffect(()=>{
    } , [user])

    console.log('this is coming  from the navbar component about the user ',user)
    const logout = ()=>{
      localStorage.removeItem("jwt_token")
      sessionStorage.clear()
      navigate('/login')
    }

    if(!localStorage.getItem("jwt_token")){
      navigate("/login")
    }
  const toLeaveForm=()=>{
   navigate('/LeaveForm')
  }
  return (
    <div>
      <div className='p-4 px-6 flex  justify-between bg-[#00a99d]'>
        <h1 className='font-bold text-white'>MOM Pharmcay Employment Portal</h1>
        <div className='flex items-center'>
          <div className='flex mr-4' onClick={toLeaveForm}>Apply for leave</div>
            <div className='flex mr-4'>
            <FaUserCircle className='text-2xl' /> <span className='ml-2 text-black font-bold'>{user && user.username}</span>
            </div>
            <button className='bg-red-400 px-4 py-1 rounded-md' onClick={()=>logout()}>Logout</button>
        </div>
      </div>   
    </div>
  )
}

export default Navbar
