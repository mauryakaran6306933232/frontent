import React from 'react' 
import {IoSend} from 'react-icons/io5'
import axios from 'axios'
import Store from '../redux/store'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useSelector  , useDispatch } from 'react-redux'
import { setMessageSlice } from '../redux/messageSlice'
export default function SendInput() {
  const dispatch = useDispatch();
  const {message} = useSelector(Store=>Store.message);
  const [message1 , setMessage] = useState('');
     const {selectedUser} = useSelector(Store=>Store.user);
     const onSubmitHandler = async(e)=>{
        e.preventDefault();
        // alert(message);
      try{
        const res = await axios.post(`http://localhost:8001/test/sendMessage/${selectedUser?._id}`,{
          message : message1
        },
        {
          headers : {
            'Content-Type' : 'application/json'
          },
          withCredentials : true
        }
      );
      console.log('needed message is', message);
       if(message == null){


      dispatch(setMessageSlice([ res?.data?.newMessage]))
       }
       else{
                dispatch(setMessageSlice([...message , res?.data?.newMessage]))
       }


      if(!res){
        console.log(res);
      }
      if(res?.data?.success){
         toast.success('send message successfully');
        setMessage("");
        console.log('new Message is',res.data.newMessage)
        const n2=res.data.newMessage
        console.log("message is not iteravble ",message)
        dispatch(setMessageSlice([...message,n2]))
        console.log('send message', n2);
      }
    } 
    catch(error){
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
     }
  return (
   <form onSubmit={(e)=>{onSubmitHandler(e)}} className='px-4 my-3'>
    <div className='w-full relative'>
        <input
        type='text'
        placeholder='send a message....'
        className='border p-3 border-zinc-500 text-sm rounded-lg block w-full bg-gray-600 text-white'
        value={message1}
        onChange={(e)=>{setMessage(e.target.value)}}
        />
        <button type="submit" className='absolute flex items-center inset-y-0 end-0'>
            <IoSend/>
        </button>
    </div>
   </form>
  )
}
