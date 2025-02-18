import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IncrementDecrementButton from './IncrementDecrementButton';
import { clearCart } from '../redux/cartSlice';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY_ID } from '@env'

const Cart = () => {
    const cart = useSelector((state) => state.cart.cart);
    const totalItems = useSelector((state) => state.cart.totalItems)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const handlePayment = () => {
        // console.log("PAYMENT CLICKED");
        var options = {
            description: 'Payment for the food item',
            image: 'https://www.pngarts.com/files/3/Food-PNG-Pic.png',
            currency: 'INR',
            key: RAZORPAY_KEY_ID,
            amount: totalPrice * 100,
            name: 'Food Hub',
            order_id: '',
            prefill: {
                email: 'vaghelaronak7501@gmail.com',
                contact: '9022463880',
                name: 'Ronak Waghela'
            },
            theme: { color: '#2b2c2b' }
        }

        RazorpayCheckout.open(options).then((data) => {
            Alert.alert(`Success: ${data.razorpay_payment_id}`);
            dispatch(clearCart());
            // console.log(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            console.log("ERROR", error);
            Alert.alert(`Payment Failed`);
        });
    }

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
    }

    const handleCheckout = () => {
        setModalVisible(true);
    };

    const handleContinue = () => {
        handlePayment();
        setModalVisible(false);
    };

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
                        <View style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Text style={styles.totalKey}>Total Items</Text>
                            <Text style={styles.totalKey}>Tax & Fees</Text>
                            <Text style={styles.totalKey}>Delivery</Text>
                            <Text style={styles.totalKey}>Total Price</Text>
                        </View>
                        <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Text style={styles.totalPriceText}>{totalItems}</Text>
                            <Text style={styles.totalPriceText}>₹ 0.00</Text>
                            <Text style={styles.totalPriceText}>Free</Text>
                            <Text style={styles.totalPriceText}>₹ {parseInt(totalPrice).toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleClearCart()} style={styles.clearButton}>
                            <Text style={styles.paymentText}>Clear Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentButton} onPress={() => handleCheckout()}>
                            <Text style={styles.paymentText}>Pay</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Do you want to checkout?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleContinue()}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default Cart;

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBlockColor: "white",
        borderRadius: 10,
    },
    totalPriceText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
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
    },
    totalKey: {
        color: 'white',
        fontSize: 16,
        fontWeight: '200'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#2b2c2b',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
})
