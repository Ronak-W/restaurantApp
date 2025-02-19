import { StyleSheet, Text, View } from 'react-native'
import PaymentResult from '../Components/PaymentResult'

const PaymentResultScreen = ({ route }) => {

    const { result } = route.params;

    return (
        <PaymentResult result={result} />
    )
}

export default PaymentResultScreen

const styles = StyleSheet.create({})