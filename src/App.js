import React , {useEffect , useState} from 'react'

import Homepage from './components/Homepage'
import Signup1 from './components/Signup1'
import Login from './components/Login'
import './App.css';
import store from './redux/store';
import { useSelector , useDispatch } from 'react-redux';
import io from 'socket.io-client'
import {createBrowserRouter ,RouterProvider} from 'react-router-dom'
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/UserSlice';
const router=createBrowserRouter([
  {
    path : '/homepage',
    element : <Homepage/>
  },
   {
    path : '/signup',
    element : <Signup1/>
  },
   {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/',
    element : <Login/>
  }
])
export default function App() {
  const {socket} = useSelector(store=>store.socket);
  console.log()
  const dispatch = useDispatch();
  //  const [socket , setSocket] = useState(null);
   const {authUser} = useSelector(store=>store.user)
   console.log('auth user from the app' , authUser); 
   useEffect(()=>{
      if(authUser){
         const socket = io('http://localhost:8001',{
         //hear can pass query which is extractable from backend
         query :{
          userId : authUser._id
         }
        });
        //  setSocket(socket);
        console.log('socket1 is', socket);
         dispatch(setSocket(socket));
         //find data which is sending from backend in socket.io
         socket.on('getOnlineUsers',(onlineUsers)=>{
             dispatch(setOnlineUsers(onlineUsers));
         })
         //this cleanup function will release memory when connection will disconnect 
         return ()=>socket.close();
      }else{
        if(socket){
          socket.close();
          dispatch(setSocket(null));
        }
      }

   },[authUser])  
   return (
    <div className='flex h-screen items-center justify-center'>
      <RouterProvider router={router}/>
    </div>
  )
}
