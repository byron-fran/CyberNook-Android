import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/Register'

export type StackRootParams ={
    LoginScreen : undefined,
    RegisterScreen : undefined
}

const Stack = createNativeStackNavigator<StackRootParams>()

const AppNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerShown : false
        }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        </Stack.Navigator>
    )

}
export default AppNavigator