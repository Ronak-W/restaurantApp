import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddItem from '../Components/AddItem'

const AddItemScreen = ({ route }) => {

    const { item } = route.params;

    return (
        <AddItem item={item} />
    )
}

export default AddItemScreen

const styles = StyleSheet.create({})