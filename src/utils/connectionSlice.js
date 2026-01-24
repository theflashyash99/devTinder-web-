import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name : "connection",
    initialState: [],
    reducers :{
        addConnections : (state,action)=>{
            action.payload;
        },
        removeConnections : ()=> {
            return null;
        }
    }
});

export const {addConnections,removeConnections} = connectionsSlice.actions;
export default connectionsSlice.reducer;