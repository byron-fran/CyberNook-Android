import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/home/HomeScreen';
import CartScreen from './src/screens/cart/CartScreen';
import FavoritesScreen from './src/screens/favorites/FavoritesScreen';
import Drawer from './src/components/drawer/Drawer';
import LayoutMain from './src/layouts/LayoutMain';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, DrawerLayoutAndroid, Pressable, View } from 'react-native'
import { ApplicationProvider } from '@ui-kitten/components';
import AppNavigator from './src/routes/Navigator';

export type TabRootParams = {

  CartScreen: undefined,
  FavoriteScreen: undefined,
  DrawerScreen: undefined,
  AppNavigator: undefined,
  LayoutMain: undefined
}

const Tab = createBottomTabNavigator<TabRootParams>()

const App = () => {
  const [isVisbl, setIsVisble] = useState(false)

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName='AppNavigator'
          screenOptions={({route}) => ({
            
            headerShown : false,

            tabBarIcon : ({color,focused,size}) => {
            
              let iconName ;
              color = '#0854A5'
              size = 25
              if(route.name === 'AppNavigator' ){
                iconName =  focused ?   'home' : 'home-outline'
              }
              else if(route.name === 'CartScreen'){
                iconName=  focused ?   'bag-handle' : 'bag-handle-outline' 
              }
              else if(route.name === 'FavoriteScreen'){
                iconName=  focused ?  'heart' : 'heart-outline' 
              }
              return <Icon name={iconName} color={color} size={size}/>
            }
           })}
        >
          <Tab.Screen 
            name='AppNavigator' 
            component={AppNavigator} 
            options={{
              title : ''
            }}/>
          <Tab.Screen 
            name='CartScreen' 
            component={CartScreen} 
            options={{
              title : ''
            }}
            />
          <Tab.Screen 
            name='FavoriteScreen' 
            component={FavoritesScreen}
            options={{
              title : ''
            }} />

   
        </Tab.Navigator>

      </NavigationContainer>
    </ApplicationProvider>

  )

}
export default App