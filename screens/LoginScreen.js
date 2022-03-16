import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import PostScreen from "./PostScreen";
import { RequireJwt } from "./RequireJwt";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
        >
        <View
            style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#e9bcbe'
            }}>
            {children}
        </View>
    </TouchableOpacity>
);

const LoginScreen = ({navigation}) => {
    return(
        <RequireJwt>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroundColor: '#ffffff',
                        borderRadius: 18,
                        height: 60,
                        ...styles.shadow
                    }
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    source={require('../assets/home.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: focused ? '#e9bcbe' : '#748c94',
                                    }}
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Post"
                    component={PostScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Image
                                source={require('../assets/plus-circle.png')}
                                resizeMode="contain"
                                style={{
                                    width: 60,
                                    height:60,
                                    tintColor: '#fff'
                                }}
                            />
                        ),
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    source={require('../assets/account-cog.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: focused ? '#e9bcbe' : '#748c94',
                                    }}
                                />
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </RequireJwt>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#f06292',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
});