import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Animated } from 'react-native'
import React, { useState } from 'react'
import Card from './Card'
import { footItems } from '../foodItems'
import BottomSheet from './BottomSheet'
import { useSelector } from 'react-redux'

const Home = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const translateY = new Animated.Value(1000);

    const cart = useSelector((state) => state.cart);
    const totalItems = cart.length;


    const openBottomSheet = () => {
        setIsVisible(true);
        setOpacity(0.5);
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        console.log("CLICKED");
    }

    const closeBottomSheet = () => {
        Animated.timing(translateY, {
            toValue: 1000,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsVisible(false);
            setOpacity(0);
        });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assests/images/coverImage.jpg')} resizeMode='cover' />
                <View style={styles.overlay}>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => openBottomSheet()}>
                        <View>
                            <Image style={styles.cartIcon} source={require('../assests/images/cart.png')} />
                            <View style={styles.cartCounter}>
                                <Text>{totalItems}</Text>
                            </View>
                        </View>
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

            {/* {isVisible && (
                <View style={[styles.overlayBackground, { opacity }]}></View>
            )} */}

            {isVisible && (
                <Animated.View style={{ transform: [{ translateY }] }}>
                    <BottomSheet onCancel={closeBottomSheet} />
                </Animated.View>
            )
            }

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
    },
    cartCounter: {
        position: 'absolute',
        top: 15,
        right: 20,
        backgroundColor: 'white',
        padding: 3,
        paddingHorizontal: 8,
        borderRadius: 50
    }
    // overlayBackground: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: 'black', // Dim the background with black
    //     // zIndex: 999,
    // },

})

export default Home