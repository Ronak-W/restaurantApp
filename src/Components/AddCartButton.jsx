import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AddCartButton = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.4}>
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
        justifyContent: 'center',
        width: 50,
        borderRadius: 10,
        padding: 3,
        marginTop: 5
    },
    text: {
        color: 'white'
    }
})