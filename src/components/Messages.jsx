import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import useGetMessages from '../hooks/useGetMessages'
import Store from '../redux/store'
import useGetRealTimeMessage from '../hooks/usesGetRealTimeMessage'
export default function Messages() {
    ////
     const {selectedUser} = useSelector(Store=>Store?.user);
      useGetMessages(selectedUser);
      useGetRealTimeMessage();
     const {message} = useSelector(Store=>Store?.message)
     if(!message){
        console.log("There is no message", message);
        return;
     }
    console.log("message is", message);
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                message?.map((message)=>{
                    return (
                      <Message key={message?._id} message={message}/>
                    )
                })
            }
        </div>
    )
}
