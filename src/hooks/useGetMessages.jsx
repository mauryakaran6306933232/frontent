import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Store from '../redux/store'
import { setMessageSlice } from '../redux/messageSlice'
import { useSelector, useDispatch } from 'react-redux'

const useGetMessages = (selectedUser) => {
   
    const dispatch = useDispatch();
    console.log('ok ok ok ', selectedUser)
    useEffect(() => {
        const fetchMessages = async () => {

            try {
                console.log('message fetchin has start')
                if (!selectedUser?._id) {
                    console.log("Id is undefined");
                    return;
                }
                console.log("selectedUser", selectedUser);
                const res = await axios.get(`http://localhost:8001/test/getMessage/${selectedUser?._id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (res?.data?.success) {
                     console.log("Messages",res)
                     const n1=res?.data?.conversation?.messages
                     console.log('n1',n1)
                    dispatch(setMessageSlice(n1));
                    toast.success(res?.data?.message);
                }
                if(!res){
                      dispatch(setMessageSlice(""));
                }
            }
            catch (error) {
                dispatch(setMessageSlice(null));
                toast.error(error?.response?.data?.message);
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser?._id])
}
export default useGetMessages