import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : [],
    totalItems : 0,
    totalPrice : 0,
};

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart : (state, action) =>{
            const item = action.payload;
            const cartId = state.cart.find((newItem) => newItem.id === item.id);
            if(!cartId){
                state.cart.push({
                    ...item,
                    quantity : 1,
                });
                state.totalItems++;
                state.totalPrice += Number(item.price);
            }else{
                cartId.quantity++;
                state.totalItems++;
                state.totalPrice += Number(item.price);
            }
        },

    removeFromCart: (state, action) => {
        const itemId = action.payload;
        const index = state.cart.findIndex((item) => item.id === itemId);
    
        if (index >= 0) {
            const product = state.cart[index];  
            
            if (product.quantity > 1) {
                product.quantity--;
                state.totalItems--; 
                state.totalPrice -= Number(product.price); 
            } else {
                state.cart.splice(index, 1);
                state.totalItems--; 
                state.totalPrice -= Number(product.price); 
            }
        }
    }, 
    clearCart : (state) => {
        state.cart = [];
        state.totalItems = 0;
        state.totalPrice = 0;
    }
}
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
