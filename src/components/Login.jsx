import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuthUser } from '../redux/UserSlice'
export default function Login() {
  const dispatch = useDispatch();
   const [user , setUser]=useState({
      username:"",
      password : "",
   })
   const navigate =useNavigate();
   const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/test/login', user, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user))
      }
      setUser({
        username: "",
        password: "",
      })
      navigate("/homepage")
    }
    catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, 'in the onSubmit handeler')
    }
  }
   
  return (
    <div className=''>
      <div className=" flex flex-col justify-center items-center  p-[50px] h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ">
        <div><h1 className='text-gray-300 text-3xl font-bold '>Login</h1></div>
        <form onSubmit={onSubmitHandler}>
          <div className='flex flex-col p-[10px]'>
            <label className=' text-black '>
              <span className='inline-block'>Username</span>
            </label>
            <input className='bg-gray-300 text-black rounded'
              type='text' placeholder="Name" value={user.username}
              onChange={(e)=>{setUser({...user , username : e.target.value})}}
            ></input>
          </div>
          <div className='flex flex-col p-[10px]'>
            <label className=' text-black '>
              <span className='inline-block'>Password</span>
            </label>
            <input className='bg-gray-300  text-black rounded'
              type='password' placeholder="password"value={user.password}
              onChange={(e)=>{setUser({...user , password : e.target.value})}}
            ></input>
          </div>
          <button className="btn btn-wide mt-[20px] mb-[20px]">Login</button>
          <div className='flex justify-center items center'>
            Do't have a account? <Link to={"/signup"} className='text-blue-500'>Sighup</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
