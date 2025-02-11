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
                state.totalPrice += item.price;
            }else{
                cartId.quantity++;
                state.totalItems++;
                state.totalPrice += item.price;
            }
        },

    removeFromCart: (state, action) => {
        const itemId = action.payload;
        const index = state.cart.findIndex((item) => item.id === itemId);
    
        if (index >= 0) {
            const product = state.cart[index];  // Get the product at the index
            
            if (product.quantity > 1) {
                // Decrease quantity if more than 1
                product.quantity--;
                state.totalItems--; // Decrease total items count
                state.totalPrice -= product.price; // Decrease total price by the price of 1 unit of the product
            } else {
                // If the quantity is 1, remove the product from the cart
                state.cart.splice(index, 1);
                state.totalItems--; // Decrease total items count
                state.totalPrice -= product.price; // Decrease total price by the price of 1 unit of the product
            }
        }
    }
    
}
})

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
