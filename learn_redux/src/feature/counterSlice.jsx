import { createSlice } from "@reduxjs/toolkit";

/* 3 main things in this 1st: name , 2nd: initialState, 3rd: reducers */

const counterSlice= createSlice({
  name: "counter",
  initialState: {
    count: 0
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
})

console.log("slice->", counterSlice);

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;