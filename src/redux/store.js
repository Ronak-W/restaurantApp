import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import fetchReducer from './fetchDataSlice'
import userReducer from './userSlice';

export const store = configureStore({
    reducer : {
        cart : cartSlice,
        fetch : fetchReducer,
        user : userReducer
    }
})