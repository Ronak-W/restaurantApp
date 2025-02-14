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
    // console.log("ITEM", item);
    try {
        const response = await axios.post('http://172.16.0.104:3000/foodItems', item)
        return response.data;
    } catch (error) {
        console.log("ERROR ADDING", error);   
    }
})

export const updateData = createAsyncThunk('Update Data', async (item) => {
    const {id, name, image, price} = item;
    // console.log("UPDATE DATA", id, name, image, price);
    try {
        console.log('UPDATED ITEM', item);
        const response = await axios.put(`http://172.16.0.104:3000/foodItems/${id}`, {name, image,price})
        return response.data;
    } catch (error) {
        console.log("ERROR UPDATING", error);   
    }
})

export const deleteData = createAsyncThunk('Delete Data', async (id) => {
    // console.log("IDDD", id);
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
        builder.addCase(fetchData.fulfilled, (state,action) => {
            console.log("from slice",action.payload)
            state.foodItems = action.payload
        })
        
        builder.addCase(addData.fulfilled, (state,action) => {
            state.foodItems.push(action.payload);
        })

        builder.addCase(updateData.fulfilled, (state,action) => {
            const updatedItem = action.payload;
            const index = state.foodItems.findIndex((item) => item.id === updatedItem.id);
            if(index > -1){
                state.foodItems[index] = {...state.foodItems[index], ...updatedItem};
            }
        })
    
        builder.addCase(deleteData.fulfilled, (state, action) =>{
            state.foodItems = state.foodItems.filter((item) => item.id !== action.payload.id);
        })
    }
})

export default fetchSlice.reducer;