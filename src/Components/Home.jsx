import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Card from './Card'
import { footItems } from '../foodItems'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assests/images/coverImage.jpg')} resizeMode='cover' />
                <View style={styles.overlay}>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate('Cart')}>
                        <Image style={styles.cartIcon} source={require('../assests/images/cart.png')} />
                    </TouchableOpacity>
                    {/* <Text style={styles.overlayText}>Different Kind of Food</Text> */}
                </View>
            </View>
            <View style={styles.heading}>
                <Text style={styles.headingText}>Food Items</Text>
            </View>

            <FlatList style={styles.listStyle}
                data={footItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Card item={item} />}
                numColumns={3}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#2b2c2b'
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        height: 300,
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 2, 2, 0.4)',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    heading: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 20
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Helvetica'
    },
    listContainer: {
        backgroundColor: 'yellow',
    },
    listStyle: {
        flex: 1
    },
    flatListContent: {
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    cartIcon: {
        position: 'absolute',
        margin: 25,
        right: 0,
        height: 40,
        width: 40,
    }
    // overlayText: {
    //     color: 'white',
    //     fontSize: 26,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     marginVertical: 130,
    // }

})

export default Home