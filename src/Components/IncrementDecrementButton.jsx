import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/cartSlice'
import { incrementQuantity } from '../redux/cartSlice'
import { useState } from 'react'

const IncrementDecrementButton = ({ item }) => {

    const dispatch = useDispatch();
    const matchItem = useSelector((state) => state.cart.find(newItem => newItem.id === item.id));

    const handleAddToCart = () => {
        dispatch(addToCart(item));
        // console.log('ADDED', item);
        console.log(matchItem);
    }

    // const handleRemoveFromCard = () => {
    //     dispatch(removeFromCart(matchItem.id))
    //     console.log("QUANTITY", matchItem.quantity);
    // }

    const handleRemoveFromCart = () => {
        if (matchItem?.quantity > 1) {
            dispatch(removeFromCart(matchItem.id));  // Decrease quantity
        } else {
            dispatch(removeFromCart(matchItem.id));  // Remove the item completely from cart
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.subtract} activeOpacity={0.4} onPress={() => handleRemoveFromCart()}>
                <Text style={styles.textStyle}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textStyle}>{matchItem ? matchItem.quantity : " "}</Text>
            <TouchableOpacity activeOpacity={0.4} onPress={() => handleAddToCart()}>
                <Text style={styles.textStyle}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default IncrementDecrementButton

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 3,
        width: 60,
        paddingHorizontal: 5,
        justifyContent: 'space-around',
        borderRadius: 10,
        marginTop: 5
    },
    textStyle: {
        color: 'white'
    },
    subtract: {

    }
})