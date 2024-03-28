import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CartScreen from "../screens/cart/CartScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import AppNavigator from "../routes/Navigator";
import Icon from 'react-native-vector-icons/Ionicons';


export type TabRootParams = {

    CartScreen: undefined,
    FavoriteScreen: undefined,
    DrawerScreen: undefined,
    AppNavigator: undefined,
    LayoutMain: undefined
}

const Tab = createBottomTabNavigator<TabRootParams>();

const BottomTabs = () => {

    return (
        <Tab.Navigator
            initialRouteName='AppNavigator'
            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarIcon: ({ color, focused, size }) => {

                    let iconName;
                    color = '#0854A5'
                    size = 25
                    if (route.name === 'AppNavigator') {
                        iconName = focused ? 'home' : 'home-outline'
                    }
                    else if (route.name === 'CartScreen') {
                        iconName = focused ? 'bag-handle' : 'bag-handle-outline'
                    }
                    else if (route.name === 'FavoriteScreen') {
                        iconName = focused ? 'heart' : 'heart-outline'
                    }
                    return <Icon name={iconName!} color={color} size={size} />
                }
            })}
        >
            <Tab.Screen
                name='AppNavigator'
                component={AppNavigator}
                options={{
                    title: ''
                }} />
            <Tab.Screen
                name='CartScreen'
                component={CartScreen}
                options={{
                    title: ''
                }}
            />
            <Tab.Screen
                name='FavoriteScreen'
                component={FavoritesScreen}
                options={{
                    title: ''
                }} />


        </Tab.Navigator>

    )

}
export default BottomTabs