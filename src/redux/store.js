import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import coordinateSlice from "./coordinateSlice";

const store = configureStore({
    reducer: {
        toggleSlice : toggleSlice,
        cartSlice : cartSlice,
        filterSlice : filterSlice,
        authSlice : authSlice,
        coordinateSlice : coordinateSlice
    }
})

export default store;
