import React from "react";
import {Text, View, StyleSheet, Button, LogBox, StatusBar, StatusBarStyle} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwiperScreen from './screens/SwiperScreen';
import SplashScreen from "./screens/SplashScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from './screens/LoginScreen';
import 'localstorage-polyfill';
import useJwt, {JwtProvider} from "./Jwt"
import axios from "axios";

const Stack = createNativeStackNavigator();

function Navigation() {
  const {jwt} = useJwt();

  return (
    jwt === null ? (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen
            name="Swiper"
            component={SwiperScreen}/>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>

    )
  )
}

export default function App() {

  axios.defaults.withCredentials = true

  return (
    <View style={{flex: 1}}>
        <StatusBar animated={true} backgroundColor="#f06292"/>
      <JwtProvider>
        <Navigation/>
      </JwtProvider>
    </View>
  );
}