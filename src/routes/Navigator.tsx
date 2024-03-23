import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/Register'
import HomeScreen from '../screens/home/HomeScreen';
import { Product } from '../interfaces/products';
import ProductDetail from '../screens/products/ProductDetail';

export type StackRootParams ={
    LoginScreen : undefined,
    RegisterScreen : undefined,
    HomeScreen : undefined,
    ProductDetail : {id : string}
}

const Stack = createNativeStackNavigator<StackRootParams>()

const AppNavigator = () => {

    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
            headerShown : false
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen}/>
            <Stack.Screen name='ProductDetail' component={ProductDetail}/>
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        </Stack.Navigator>
    )

}
export default AppNavigator