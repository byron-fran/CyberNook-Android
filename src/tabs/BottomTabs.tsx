import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CartScreen from "../screens/cart/CartScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import AppNavigator from "../routes/Navigator";
import Icon from 'react-native-vector-icons/Ionicons';
import { useCartStore } from "../store/cart/useCart";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../colors/colors";
import { calculateTotalPrice } from "../helpers/calculateTotalPrice";

export type TabRootParams = {

    CartScreen: undefined,
    FavoriteScreen: undefined,
    DrawerScreen: undefined,
    AppNavigator: undefined,
    LayoutMain: undefined
}

const Tab = createBottomTabNavigator<TabRootParams>();

const BottomTabs = () => {
    const { getCart, cart } = useCartStore();

    useEffect(() => {

        getCart();

    }, [cart.length]);
    
    const { totalQuantity } = calculateTotalPrice(cart)

    return (
        <Tab.Navigator
            initialRouteName='AppNavigator'
            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarIcon: ({ color, focused, size }) => {

                    let iconName;
                    color = '#0854A5'
                    size = 30
                    if (route.name === 'AppNavigator') {
                        iconName = focused ? 'home' : 'home-outline'
                    }
                    else if (route.name === 'CartScreen') {
                        iconName = focused ? 'cart' : 'cart-outline'
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
                    tabBarItemStyle: {
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: 30

                    },
                    tabBarLabel: ((props) => {
                        return totalQuantity > 0 ? (
                            <Text style={styles.btnQuantity}>{totalQuantity}</Text>
                        ) : null
                    }),
                    tabBarLabelPosition: 'below-icon',
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
const styles = StyleSheet.create({
    btnQuantity: {
        position: 'absolute',
        right: 30,
        backgroundColor: colors.blue,
        borderRadius: 50,
        padding: 6,
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold'
    }
})
export default BottomTabs