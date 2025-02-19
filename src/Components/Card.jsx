import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AddCartButton from './AddCartButton'
import IncrementDecrementButton from './IncrementDecrementButton'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { deleteData } from '../redux/fetchDataSlice'
import { useNavigation } from '@react-navigation/native'

const Card = ({ item }) => {

    const [addedToCart, setAddedToCart] = useState(false);
    const cart = useSelector(state => state.cart.cart);
    const loggedInUser = useSelector(state => state.user)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (cart.length > 0) {
            const itemInCart = cart?.find((cartItem) => cartItem.id === item.id);
            if (itemInCart) {
                setAddedToCart(true);
            }
        }
    }, [cart, item.id])

    const handleDelete = (id) => {
        Alert.alert(
            "Delete!",
            "Are you sure?",
            [
                {
                    text: "Yes",
                    onPress: () => dispatch(deleteData(id))
                },
                {
                    text: 'No',
                }
            ]
        )
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.innerCardContainer}>
                <Image style={styles.image} source={{ uri: item.image }} resizeMode='cover' />
                <Text style={styles.textHeading}>{item.name}</Text>
                <Text style={styles.text}>₹ {item.price}</Text>

                {loggedInUser.user === 'user' && (
                    !addedToCart ? (
                        <AddCartButton item={item} />
                    ) : (
                        <IncrementDecrementButton item={item} />
                    )
                )}

                {loggedInUser.user === 'admin' && <View style={styles.updateDeleteButtonContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                        <Text style={styles.btntext}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.updateButton}
                        onPress={() => {
                            navigation.navigate('ItemForm', { item });
                        }}>
                        <Text style={styles.btntext}>Update</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}

export default Card

export const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        margin: 10,
        alignItems: 'flex-start',
    },
    innerCardContainer: {
        display: 'flex',
    },
    image: {
        height: 160,
        width: 160,
        borderRadius: 10
    },
    textHeading: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
        marginTop: 10,
    },
    text: {
        color: 'white',
        marginTop: 3,
    },
    btntext: {
        color: 'white',
        marginTop: 3,
        fontWeight: 'bold'
    },
    updateDeleteButtonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
    },
    deleteButton: {
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: 'red',
        borderRadius: 15,
    },
    updateButton: {
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: 'green',
        borderRadius: 15,
    }
})