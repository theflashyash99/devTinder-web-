import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name : "connection",
    initialState: [],
    reducers :{
        addConnections : (state,action)=>{
           return action.payload; // return is important otherwise the State in the redux will [] empty.
        },
        removeConnections : ()=> {
            return null;
        }
    }
});

export const {addConnections,removeConnections} = connectionsSlice.actions;
export default connectionsSlice.reducer;