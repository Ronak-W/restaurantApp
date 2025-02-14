import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/cartSlice'
import { incrementQuantity } from '../redux/cartSlice'
import { useState } from 'react'
import AddCartButton from './AddCartButton'

const IncrementDecrementButton = ({ item }) => {

    const dispatch = useDispatch();
    const matchItem = useSelector((state) => state.cart.cart.find(newItem => newItem.id === item.id));

    const handleAddToCart = () => {
        dispatch(addToCart(item));
        // console.log('ADDED', item);
        console.log(matchItem);
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(matchItem.id))
        console.log("QUANTITY", matchItem.quantity);
    }

    return (
        <View >
            {matchItem ?
                (<View style={styles.container}><TouchableOpacity style={styles.subtract} activeOpacity={0.4} onPress={() => handleRemoveFromCart()}>
                    <Text style={styles.textStyle}>-</Text>
                </TouchableOpacity>
                    <Text style={styles.textStyle}>{matchItem ? matchItem.quantity : " "}</Text>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => handleAddToCart()}>
                        <Text style={styles.textStyle}>+</Text>
                    </TouchableOpacity></View>) : (
                    <View style={styles.addCartButtonStyle}>
                        <AddCartButton item={item} />
                    </View>
                )
            }
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
        padding: 5,
        width: 80,
        paddingHorizontal: 5,
        justifyContent: 'space-around',
        borderRadius: 10,
        marginTop: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
})