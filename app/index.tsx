import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'; // Make sure your file path is correct
import SignupScreen from './screens/SignupScreen'; // Make sure your file path is correct
import HomeScreen from './screens/HomeScreen'
import { Provider } from 'react-redux';
import store from './store/store'

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login Screen" }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: "Signup Screen" }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Home Screen" }} />
      </Stack.Navigator>
      </Provider>
  );
}