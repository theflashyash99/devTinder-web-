import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state,action) => {
        const newArr = state.filter((r)=> r._id !== action.payload)
        return newArr;
    },
  },
});
export default requestSlice.reducer;

export const { addRequests, removeRequests } = requestSlice.actions;
