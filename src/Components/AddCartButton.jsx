import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

const AddCartButton = ({ item }) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(item));
        // setAddedToCart(true);
        console.log('ADDED', item);
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.4} onPress={() => handleAddToCart()}>
            <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
    )
}

export default AddCartButton

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#e55d2a',
        alignItems: 'center',
        width: 60,
        borderRadius: 10,
        padding: 5,
        marginTop: 5
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    }
})