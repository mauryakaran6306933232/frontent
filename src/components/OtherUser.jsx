import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/UserSlice';
import Store from '../redux/store';

export default function OtherUser({ key, user }) {
    const dispatch = useDispatch();
    const {selectedUser , onlineUsers}=useSelector(Store=> Store.user);
    const isOnline = onlineUsers.includes(user._id);
    const selectedUserHandler = (user) => {
         console.log(user);
          dispatch(setSelectedUser(user));
    }
    return (
        <>
            <div onClick={() => { selectedUserHandler(user) }} className={`${selectedUser?._id === user?._id ?"bg-zinc-200 text-black" : ''} flex flex-row gap-2 items-center hover:bg-zinc-200   hover:text-black rounded-sm p-2 cursor-pointer`} >

                <div className={`avatar ${isOnline ? "online ring ring-green-500 ring-offset-base-100 ring-offset-2" : ""}`}
>

                    <div className='w-12 rounded-full'>
                        <img src={user.profilePicture} alt='profilePhoto' />
                    </div>
                </div>

                <div className="flex flex-col flex-1">

                    <div className='flex gap-2 flex-1 '>
                        <p>{user.username}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
