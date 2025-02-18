import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Payment = () => {

    const totalPrice = useSelector(state => state.cart.totalPrice);

    return (
        <View style={styles.container}>
            <View style={styles.paymentContainer}>
                <View style={styles.totalDetails}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalPriceText}>₹ {totalPrice}</Text>
                </View>
                <View style={styles.underline}></View>
                <View style={styles.selectPayment}>
                    <View>
                        <Text style={styles.totalText}>Payment</Text>
                    </View>
                    <View style={styles.paymentRadioContainer}>
                        <View>
                            <Text>
                                Credit Card
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Debit Card
                            </Text>
                        </View>
                        <View>
                            <Text>
                                UPI
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#2b2c2b',
        padding: 20,
    },
    paymentContainer: {
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 10,
        paddingBottom: 10
    },
    totalDetails: {
        display: 'flex',
        alignItems: 'flex-start',
        margin: 30
    },
    totalText: {
        marginTop: 10,
        marginLeft: 30,
        fontSize: 18,
        fontWeight: 'bold'
    },
    totalPriceText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    underline: {
        height: 1,
        backgroundColor: '#e6e7e6',
        marginHorizontal: 20
    },
    selectPayment: {
        display: 'flex',
    },
    paymentRadioContainer: {
        display: 'flex',
        backgroundColor: 'grey',
        alignItems: 'center'
    }
})