import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BottomSheet = ({ onCancel }) => {

    const navigation = useNavigation();

    const handleCloseBottomSheet = () => {
        onCancel();
        navigation.navigate('Cart')
    }

    return (
        <View style={styles.bottomSheet}>
            <Text style={styles.goToCart}>Go to Cart ?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => onCancel()} style={styles.cancelButton}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCloseBottomSheet()} style={styles.continueButton}>
                    <Text style={styles.textStyle}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
        elevation: 15
    },
    continueButton: {
        backgroundColor: 'green',
        padding: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
        elevation: 15
    },
    textStyle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800'
    },
    goToCart: {
        textAlign: 'center',
        marginBottom: 40,
        fontSize: 18,
        fontWeight: 'bold'
    }
})