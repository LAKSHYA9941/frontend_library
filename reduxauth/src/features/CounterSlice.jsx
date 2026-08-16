import { createSlice } from "@reduxjs/toolkit";

const CounterSlice= createSlice({
    name:"count",
    initialState:{
        count:0
    },

    reducers:{
        increment:(state,action)=>{
            state.count=state.count+1;
        },
        decrement:(state,action)=>{
            state.count=state.count-1;
        },
        incrementByValue:(state,action)=>{
            state.count=state.count+action.payload;
        },
        decrementByValue:(state,action)=>{
            state.count=state.count-action.payload;
        }
    }
    
})

export const {increment,decrement,clear,incrementByValue,decrementByValue}=CounterSlice.actions;
export default CounterSlice.reducer;