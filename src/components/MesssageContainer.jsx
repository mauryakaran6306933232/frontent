import React, { useState , useEffect} from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import Store from '../redux/store'
import { useSelector , useDispatch } from 'react-redux'
import { setSelectedUser } from '../redux/UserSlice'

export default function MesssageContainer() {
    const dispatch = useDispatch();
    const {selectedUser ,authUser}=useSelector(Store=>Store.user);
    useEffect(()=>{
         return ()=>
            dispatch(setSelectedUser(null))
    }, [])
    return (
        <>
            {
                selectedUser ?(
                 <div className='md : min-w-[550px] flex flex-col'>
           
                <div className='flex flex-row gap-2 items-center rounded-sm p-2 cursor-pointer bg-zinc-800 px-2  text-white mx-2 my-2 mb-2'>

                    <div className="avatar online ring ring-green-500 ring-offset-base-100 ring-offset-2">

                        <div className='w-12 rounded-full'>
                            <img src={selectedUser?.profilePicture} alt='profilePhoto'/>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1">

                        <div className='flex gap-2 flex-1'>
                            <p>{selectedUser?.username}</p>
                        </div>
                    </div>
                </div>
                <Messages/>
                <SendInput/>
            </div>)
            :
            (<div className='md:min-w-[550px] flex flex-col items-center justify-center'>
                  <div>
                     <h1 className='text-4xl'>Hi , {authUser?.username} </h1>
                  </div>
                   <h1 className='text-2xl'>let's start convertatin</h1>
            </div>)
            }
        </>
        // <div className='md : min-w-[550px] flex flex-col'>
           
        //         <div className='flex flex-row gap-2 items-center rounded-sm p-2 cursor-pointer bg-zinc-800 px-2  text-white mx-2 my-2 mb-2'>

        //             <div className="avatar online ring ring-green-500 ring-offset-base-100 ring-offset-2">

        //                 <div className='w-12 rounded-full'>
        //                     <img src={selectedUser?.profilePicture} alt='profilePhoto'/>
        //                 </div>
        //             </div>

        //             <div className="flex flex-col flex-1">

        //                 <div className='flex gap-2 flex-1'>
        //                     <p>{selectedUser?.username}</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <Messages/>
        //         <SendInput/>
        //     </div>
       
    )
}
