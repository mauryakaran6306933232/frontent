import {useEffect} from "react";
import store from "../redux/store";
import {useSelector , useDispatch} from 'react-redux'
import { addMessage, setMessageSlice } from "../redux/messageSlice";
const  useGetRealTimeMessage = () =>{
 const dispatch = useDispatch(); 
const   {message } = useSelector(store=>store.message)
 const {socket} = useSelector(store=>store.socket);
//  useEffect(()=>{
//     socket?.on('newMessage',(p1)=>{
//         console.log("new message is",p1);
//         dispatch(setMessageSlice([...message, p1]))
//         // dispatch(addMessage(p1))
//     })
//  },[socket, message ])
useEffect(() => {
  if (!socket) return;

  const handler = (p1) => {
    console.log("new message is", p1);
    console.log('message from socket',message)
    if(message==null)
    {
      dispatch(setMessageSlice([p1]))
    }
    else{
      dispatch(addMessage(p1));
    }
    // dispatch(addMessage(p1));
  };

  socket.on("newMessage", handler);

  return () => {
    socket.off("newMessage", handler);  // ✅ cleanup old listeners
  };
}, [socket , setMessageSlice, message]);

}
export default useGetRealTimeMessage