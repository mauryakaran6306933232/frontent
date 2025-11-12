import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function Signup1() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    fullPassword: "",
    gender: ""
  })
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/test/register', user, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        toast.success(res.data.message)
      }
      setUser({
        username: "",
        password: "",
        fullPassword: "",
        gender: ""
      })
      navigate("/login");
    }
    catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, 'in the onSubmit handeler')
    }
  }
  return (
    <div className=''>
      <div className=" flex flex-col justify-center items-center  p-[50px] h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ">
        <div><h1 className='text-gray-300 text-3xl font-bold '>Sighup</h1></div>
        <form onSubmit={onSubmitHandler}>
          <div className='flex flex-col p-[10px]'>
            <label className=' text-black '>
              <span className='inline-block'>Username</span>
            </label>
            <input className='bg-gray-300 text-black rounded'
              type='text' placeholder="Name" value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            ></input>
          </div>
          <div className='flex flex-col p-[10px]'>
            <label className=' text-black '>
              <span className='inline-block'>Password</span>
            </label>
            <input className='bg-gray-300  text-black rounded'
              type='password' placeholder="password" value={user.password}
              onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
            ></input>
          </div>
          <div className='flex flex-col p-[10px]'>
            <label className=' text-black '>
              <span className='inline-block'>confirm Password</span>
            </label>
            <input className='bg-gray-300 text-black rounded'
              type='password' placeholder="password" value={user.fullPassword}
              onChange={(e) => { setUser({ ...user, fullPassword: e.target.value }) }}
            ></input>
          </div>
          <div className="flex flex-col p-[10px]">
            <label className="text-black">
              <span className="inline-block">Gender</span>
            </label>
            <div className="flex flex-row justify-evenly items-center gap-2">
              <p className="text-black">Male</p>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => { setUser({ ...user, gender: e.target.value }) }}
                className="radio border-orange-400 checked:border-indigo-800"
              />
              <p className="text-black">Female</p>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => { setUser({ ...user, gender: e.target.value }) }}
                className="radio border-purple-400 checked:border-indigo-400"
              />
            </div>
          </div>
          <button className="btn btn-wide mb-[30px]">Signup</button>
          <div className='flex justify-center items-center'>
            have a account? <Link to={"/login"} className='text-blue-500'>Login</Link>
          </div>

        </form>
      </div>
    </div>
  )
}
