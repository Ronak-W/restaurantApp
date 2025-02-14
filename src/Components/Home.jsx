import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Animated, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import BottomSheet from './BottomSheet'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { fetchData } from '../redux/fetchDataSlice'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const [isVisible, setIsVisible] = useState(false);
    const translateY = new Animated.Value(1000);

    //cart from store
    const cart = useSelector((state) => state.cart);
    //all data from store
    const fetchedData = useSelector(state => state.fetch.foodItems);

    const loggedInUser = useSelector(state => state.user)
    // console.log("LOGGED IN USER", loggedInUser);

    const dispatch = useDispatch();
    const totalItems = cart.cart.length;
    const navigation = useNavigation();

    //to fetch the data from store into the home screen
    useEffect(() => {
        dispatch(fetchData());
    }, [])

    //to close the bottom sheet when in focus
    useFocusEffect(
        React.useCallback(() => {
            closeBottomSheet();
        }, [])
    )

    const openBottomSheet = () => {
        setIsVisible(true);
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
        });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assests/images/coverImage.jpg')} resizeMode='cover' />
                {/* <Image style={styles.image} source={{ uri: "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg" }} resizeMode='cover' /> */}
                <View style={styles.overlay}>
                    <View style={styles.userAdminIcon}>
                        <Text style={styles.userAdminText}>{loggedInUser.user === "user" ? 'U' : 'A'}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.heading}>
                <Text style={styles.headingText}>Food Items</Text>
                {loggedInUser.user == 'user' && (
                    <View>
                        <TouchableOpacity activeOpacity={0.3} onPress={() => openBottomSheet()}>
                            <Image style={styles.cartIcon} source={require('../assests/images/cart.png')} />
                            <View style={styles.cartCounter}>
                                <Text>{totalItems}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <FlatList style={styles.listStyle}
                data={fetchedData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Card item={item} />}
                numColumns={2}
            />

            {isVisible && <BottomSheet onCancel={() => setIsVisible(false)} />}

            {loggedInUser.user === 'admin' && (<TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('ItemForm', { item: '' })}>
                <Image style={styles.addIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/512/4677/4677490.png" }} />
            </TouchableOpacity>)}
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
        height: 250,
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
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 20,
        marginHorizontal: 10
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Helvetica'
    },
    listStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    cartIcon: {
        position: 'absolute',
        marginRight: 5,
        top: 0,
        right: 0,
        height: 35,
        width: 35,
        borderRadius: 20
    },
    cartCounter: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 3,
        paddingHorizontal: 8,
        borderRadius: 50
    },
    addIcon: {
        position: 'absolute',
        bottom: '0',
        right: 0,
        height: 100,
        width: 100,
        margin: 20
    },
    userAdminText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    },
    userAdminIcon: {
        position: 'absolute',
        margin: '20',
        borderRadius: 40,
        backgroundColor: 'black',
        padding: 15,
        paddingHorizontal: 25
    }
})

export default Home