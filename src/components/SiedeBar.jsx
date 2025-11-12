import React , { useState , useEffect } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import axios from 'axios';
import toast from 'react-hot-toast';
import OtherUsers from './OtherUsers';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/UserSlice';
export default function SiedeBar() {
    const dispatch = useDispatch();
    const {otherUsers} = useSelector(Store => Store.user);
    const [localUsers , setLocalUsers] = useState();
    console.log('other user for search is ', otherUsers);
    const [search , setSearch ] = useState("")
    const navigate=useNavigate();
    const logoutHandler=async()=>{
        try{
          const res = await axios.get('http://localhost:8001/test/logout',{
            headers : {
                "Content-Type":"application/json",              
            },
            withCredentials : true
          });
          if(res?.data?.success){
            dispatch(setAuthUser(null));
            toast.success(res?.data?.message);
            navigate("/login") ;
          }
        }
        catch(error){
            toast.error(error?.response?.data?.message);
            console.log("backend error in the logout handler function");
        }
    }
  
 useEffect(()=>{
     setLocalUsers(otherUsers);
 },[])

    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        const conversationUser = localUsers?.find((user)=> user.username.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]))
        }
        else{
            toast.error("User not found");
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action='' className='flex flex-row' >
                <input 
                vlaue={search}
                onChange={(e)=>{setSearch(e?.target?.value)}}
                className='input input-bordered rounded-md' type='text' placeholder='Search...'></input>
                <button type='submit' className='btn btn-circle bg-zinc-500  ml-[5px]'><BiSearchAlt2/></button>
            </form>
             <div className="divider text-gray-900 flex-1 overflow-auto"></div>
             <OtherUsers/>
             <div className='m-2'>
                <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
             </div>
        </div>
    )
}
 