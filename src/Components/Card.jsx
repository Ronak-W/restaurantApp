import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AddCartButton from './AddCartButton'
import IncrementDecrementButton from './IncrementDecrementButton'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { useState } from 'react'

const Card = ({ item }) => {

    const [addedToCart, setAddedToCart] = useState(false);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(item));
        setAddedToCart(true);
        console.log('ADDED', item);
    }

    return (
        <View style={styles.cardContainer}>
            <Image style={styles.image} source={item.image} resizeMode='cover' />
            <Text style={styles.textHeading}>{item.name}</Text>
            <Text style={styles.text}>{item.price}</Text>
            {/* {!addedToCart ? (<TouchableOpacity onPress={() => handleAddToCart()}>
                <AddCartButton />
            </TouchableOpacity>) :
                (<TouchableOpacity >
                    <IncrementDecrementButton item={item} />
                </TouchableOpacity>)} */}
            {!addedToCart ? (
                <TouchableOpacity onPress={handleAddToCart}>
                    <AddCartButton />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity>
                    <IncrementDecrementButton item={item} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        margin: 10,
        alignItems: 'flex-start',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    textHeading: {
        color: 'white',
        fontWeight: '700',
        marginTop: 5,
    },
    text: {
        color: 'white'
    }
})