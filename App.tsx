import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import CartScreen from './src/screens/CartScreen'
import {store} from './src/redux/store';
import { Provider } from 'react-redux'
import AddItemScreen from './src/screens/AddItemScreen'
import LoginScreen from './src/screens/LoginScreen'

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown : false}}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown : false}}/>
        <Stack.Screen name='Cart' component={CartScreen} options={{headerStyle : {backgroundColor : 'black'}, headerTintColor : 'white'}}/>
        <Stack.Screen name='ItemForm' component={AddItemScreen} options={{headerStyle:{backgroundColor:'black'}, headerTintColor:'white'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}
  
export default App

const styles = StyleSheet.create({})