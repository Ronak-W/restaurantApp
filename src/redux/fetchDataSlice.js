import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    foodItems : []
}

export const fetchData = createAsyncThunk('Fetch Data', async () => {
    try {
        const response = await axios.get('http://172.16.0.104:3000/foodItems')
        return response.data;
    } catch (error) {
        console.log("ERROR FETCHING", error);   
    }
})

export const addData = createAsyncThunk('Add Data', async (item) => {
    try {
        const response = await axios.post('http://172.16.0.104:3000/foodItems', item)
        return response.data;
    } catch (error) {
        console.log("ERROR ADDING", error);   
    }
})

export const updateData = createAsyncThunk('Update Data', async (item) => {
    const {id, name, image, price} = item;
    try {
        const response = await axios.put(`http://172.16.0.104:3000/foodItems/${id}`, {name, image,price})
        return response.data;
    } catch (error) {
        console.log("ERROR UPDATING", error);   
    }
})

export const deleteData = createAsyncThunk('Delete Data', async (id) => {
    try {
        const response = await axios.delete(`http://172.16.0.104:3000/foodItems/${id}`)
        return response.data;
    } catch (error) {
        console.log("ERROR DELETING", error);   
    }
})

const fetchSlice = createSlice({
    name : 'fetch data',
    initialState ,
    extraReducers: builder => {
        // fetch
        builder.addCase(fetchData.fulfilled, (state,action) => {
            state.foodItems = action.payload
        })
        
        // Add
        builder.addCase(addData.fulfilled, (state,action) => {
            state.foodItems.push(action.payload);
        })

        // Update
        builder.addCase(updateData.fulfilled, (state,action) => {
            const updatedItem = action.payload;
            const index = state.foodItems.findIndex((item) => item.id === updatedItem.id);
            if(index > -1){
                state.foodItems[index] = {...state.foodItems[index], ...updatedItem};
            }
        })
    
        // delete
        builder.addCase(deleteData.fulfilled, (state, action) =>{
            state.foodItems = state.foodItems.filter((item) => item.id !== action.payload.id);
        })
    }
})

export default fetchSlice.reducer;