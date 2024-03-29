import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Product } from '../interfaces/products';
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/Register'
import HomeScreen from '../screens/home/HomeScreen';
import ProductDetail from '../screens/products/ProductDetail';
import CategoryScreen from '../screens/category/CategoryScreen';

export type StackRootParams ={
    LoginScreen : undefined,
    RegisterScreen : undefined,
    HomeScreen : undefined,
    ProductDetail : {id : string},
    CategoryScreen : {category : string}
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
            <Stack.Screen name='CategoryScreen' component={CategoryScreen}/>
        </Stack.Navigator>
    )

}
export default AppNavigator