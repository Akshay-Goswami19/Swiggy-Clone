import { createSlice } from "@reduxjs/toolkit";

const coordinateSlice = createSlice({
    name : "coordinateSlice", 
    initialState : {
        lat : 19.0759837,
        long : 72.8776559
    },

    reducers : {
       setLat_Long : (state, action)=>{
        state.lat = action.payload.lat
        state.long = action.payload.long
       }
    }

})

export default coordinateSlice.reducer
export const {setLat_Long} = coordinateSlice.actions