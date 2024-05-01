import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Product } from '../interfaces/products';
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/Register'
import HomeScreen from '../screens/home/HomeScreen';
import ProductDetail from '../screens/products/ProductDetail';
import CategoryScreen from '../screens/category/CategoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AddressScreen from '../screens/address/AdressScreen';
import AddReviewScreen from '../screens/reviews/AddReviewScree';
import ProductsScreen from '../screens/products/ProductsScreen';
import PaymentScreen from '../screens/cart/PaymentScreen';

export type StackRootParams = {

    LoginScreen : undefined,
    RegisterScreen : undefined,
    HomeScreen : undefined,
    ProductDetail : {id : string},
    CategoryScreen : {category : string},
    ProfileScreen : undefined,
    AddressScreen : undefined,
    AddReviewScreen : {productId : string},
    PaymentScreen : undefined,
    ProductsScreen : {  
            category? : string, 
            mark? : string, 
            page? : number,
  
    },

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
            <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
            <Stack.Screen name='AddressScreen' component={AddressScreen} />
            <Stack.Screen name='AddReviewScreen' component={AddReviewScreen}/>
            <Stack.Screen name='ProductsScreen' component={ProductsScreen}/>
            <Stack.Screen name='PaymentScreen' component={PaymentScreen}/>       
        </Stack.Navigator>
    )

}
export default AppNavigator