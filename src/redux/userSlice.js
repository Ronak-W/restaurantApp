import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:''
};

const userSlice = createSlice({
    name : 'user slice',
    initialState,
    reducers : {
        login : (state, action) => {
            // console.log("USER INFOR", action.payload);
            state.user = action.payload
        }
    }
})

export const {login} = userSlice.actions;
export default userSlice.reducer;