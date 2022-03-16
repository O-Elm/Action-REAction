import React from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Onboarding from "react-native-onboarding-swiper";

const Skip = ({...props}) => (
    <Button
        title="Skip"
        color="#000000"
        {...props}
    />
);

const Next = ({...props}) => (
    <Button
        title="Next"
        color="#000000"
        {...props}
    />
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:8}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const SwiperScreen = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace("SplashScreen")}
            onDone={() => navigation.replace("SplashScreen")}
            pages={[
                {
                    backgroundColor: '#37c7ff',
                    image: <Image style={styles.imagineStyle} source={require('../assets/ifttt.png')} />,
                    title: 'Welcome to ActionREAction',
                    subtitle: 'all your favorite services with just a click',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image style={styles.imagineStyle} source={require('../assets/plus.jpeg')} />,
                    title: 'Reaction',
                    subtitle: 'Using plus sign you can add one of the 5 possible reaction',
                },
                {
                    backgroundColor: '#c2f70f',
                    image: <Image style={styles.imagineStyle} source={require('../assets/switch.png')} />,
                    title: 'Connect',
                    subtitle: 'Make way to settings to connect to your favorite platform',
                },
            ]}
        />
    );
};

export default SwiperScreen;

const deviceWidth = Math.round(Dimensions.get('window').width) - 80
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagineStyle: {
        height: 100,
        width: deviceWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
});