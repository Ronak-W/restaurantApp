import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


const PaymentResult = ({ result }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {result === true ? (
                <>
                    <View>
                        <Text style={styles.heading}>Your Order is Confirmed!</Text>
                    </View>
                    <View>
                        <LottieView
                            style={{ height: 400, width: 400 }}
                            source={require('../assests/animations/success.json')}
                            autoPlay
                        /></View></>) : (
                <View style={styles.failedContainer}>
                    <View>
                        <Text style={styles.heading}>Your order is failed!</Text>
                    </View>
                    <LottieView
                        style={{ height: 100, width: 100 }}
                        source={require('../assests/animations/failed.json')}
                        autoPlay
                    />
                </View>
            )}

            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonStyle}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2c2b',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'red',
        width: '60%',
        padding: 15,
        borderRadius: 10
    },
    buttonStyle: {
        color: 'white',
        fontWeight: '800'
    },
    heading: {
        fontSize: 26,
        color: 'white',
        fontWeight: '700',
        marginBottom: 50
    },
    failedContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: 90,
        // backgroundColor: 'yellow'
    }
})