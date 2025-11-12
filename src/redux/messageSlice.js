import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
    name : "message",
    initialState :{
        message : []
    },
    reducers:{
        setMessageSlice : (state , action)=>{
            state.message = action.payload;
        },
        addMessage: (state, action) => {
    state.message.push(action.payload);
  }
    }
});
export const {setMessageSlice , addMessage} = messageSlice.actions;
export default messageSlice.reducer;