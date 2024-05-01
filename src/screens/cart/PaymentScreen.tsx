import { View, Text } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { cybernookApi } from '../../config/api/cybernookApi'
import { useEffect } from 'react'


const PaymentScreen = () => {
    const paymentSheetParams = async () => {
        try {
            const {data} = await cybernookApi.post('/cart/payment-sheet')
            //const {paymentIntent, ephemeralKey, customer} = data;
            console.log(data)
            return data

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        paymentSheetParams()
    }, [])
    return (
        <View>

        </View>

    )
}

export default PaymentScreen