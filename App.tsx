import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/home/HomeScreen';
import CartScreen from './src/screens/cart/CartScreen';
import FavoritesScreen from './src/screens/favorites/FavoritesScreen';
import Drawer from './src/components/drawer/Drawer';

import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, DrawerLayoutAndroid, Pressable, View} from 'react-native'

export type TabRootParams = {

  CartScreen : undefined,
  FavoriteScreen : undefined,
  DrawerScreen : undefined,
  HomeScreen : undefined
}

const Tab = createBottomTabNavigator<TabRootParams>()

const App = () => {
  const [isVisbl, setIsVisble] = useState(false)

  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='HomeScreen' screenOptions={ {
          headerShown : false
        }}>
          
          <Tab.Screen name='HomeScreen' component={HomeScreen}/>
          <Tab.Screen name='CartScreen' component={CartScreen}/>
          <Tab.Screen name='FavoriteScreen' component={FavoritesScreen}/>
          <Tab.Screen name='DrawerScreen' component={Drawer}/>
        </Tab.Navigator>
       
      </NavigationContainer>

  )

}
export default App