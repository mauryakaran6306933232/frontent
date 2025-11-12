import React, { useEffect , useRef } from 'react'
import Store from '../redux/store';
import { useSelector } from 'react-redux';
export default function Message({key , message}) {
          const scroll = useRef();
          const {authUser ,selectedUser} = useSelector(Store=>Store.user)
    useEffect(()=>{
        scroll?.current?.scrollIntoView({behavior : "smooth"})
    },[message]) 
    return (
        <div>
            <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={(message?.senderId===authUser?._id) ? authUser?.profilePicture : selectedUser?.profilePicture} />
                    </div>
                </div>
                <div className="chat-header">
                
                    <time className="text-xs  font-bold opacity-50 text-black">12:45</time>
                </div>
                <div className="chat-bubble">{message?.message}</div>
               
            </div>
        </div>
    )
}
