import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {

    const cart = useSelector((state) => state.cart);
    const totalItems = useSelector((state) => state.totalItems)
    const totalPrice = useSelector((state) => state.totalPrice)

    return (
        <View>
            {cart.map((item) => (
                <View key={item.id}>
                    <Text>{item.name}</Text>
                    <Text>Item Price : ₹{item.price}</Text>
                    <Text>Quantity : {item.quantity}</Text>
                </View>
            ))}
            <Text>Total Price : ₹{totalPrice.toFixed(2)}</Text>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({})