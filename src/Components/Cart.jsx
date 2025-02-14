import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import IncrementDecrementButton from './IncrementDecrementButton';
import AddCartButton from './AddCartButton';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { Alert } from 'react-native';


const Cart = () => {

    const cart = useSelector((state) => state.cart.cart);
    console.log("CART", cart);

    const totalItems = useSelector((state) => state.cart.totalItems)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const dispatch = useDispatch();

    const handleClearCart = () => {
        Alert.alert(
            "Clear Cart",
            "Are you sure?",
            [
                {
                    text: "yes",
                    onPress: () => dispatch(clearCart())
                },
                {
                    text: "No",
                    style: "cancel"
                }
            ]
        )

        console.log("CLEAR CART");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {cart.length === 0 ? (
                <Text style={styles.emptyCartText}>No Items in the cart</Text>
            ) : (
                <>
                    {cart.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <View>
                                <Image style={styles.image} source={{ uri: item.image }} resizeMode='cover' />
                            </View>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>Item Price: ₹{item.price}</Text>
                                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                                <IncrementDecrementButton item={item} />
                            </View>
                        </View>
                    ))}
                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalPriceText}>Total Items : {totalItems}</Text>
                        <Text style={styles.totalPriceText}>Total Price: ₹{parseInt(totalPrice).toFixed(2)}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleClearCart()} style={styles.clearButton}>
                            <Text style={styles.paymentText}>Clear Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentButton}>
                            <Text style={styles.paymentText}>Payment</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </ScrollView>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#2b2c2b',
        padding: 20,
    },
    emptyCartText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    cartItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#3b3c3b',
        padding: 12,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#555',
    },
    itemName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    itemPrice: {
        color: '#fff',
        fontSize: 16,
    },
    itemQuantity: {
        color: '#fff',
        fontSize: 16,
    },
    totalPriceContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 20,
        padding: 15,
        borderBottomWidth: 1,
        borderBlockColor: "white",
        borderRadius: 10,
    },
    totalPriceText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    paymentButton: {
        display: 'flex',
        padding: 20,
        backgroundColor: 'green',
        borderRadius: 20,
        width: 150,
        alignItems: 'center',
        marginTop: 20,
        elevation: 50,
    },
    clearButton: {
        display: 'flex',
        padding: 20,
        backgroundColor: 'red',
        borderRadius: 20,
        width: 150,
        alignItems: 'center',
        marginTop: 20,
        elevation: 50,
    },
    paymentText: {
        color: 'white',
        fontWeight: 'bold'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
