import React from "react";
import { StatusBar, TextInput, View, Text, Button, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import useJwt from "../Jwt"
import axios from "axios";

const RegisterScreen = ({navigation}) => {
    const {login} = useJwt()
    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirmpassword: '',
        check_textInput: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true,
    });

    const textInputChange = (value) => {
        if (value.length != 0) {
            setData({
                ...data,
                email: value,
                check_textInput: true
            });
        } else {
            setData({
                ...data,
                email: value,
                check_textInput: false
            });
        }
    }

    const passwordChange = (value) => {
        setData({
            ...data,
            password: value,
        });
    }

    const confirmPasswordChange = (value) => {
        setData({
            ...data,
            confirmpassword: value,
        });
    }

    const updateSecureText = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureText = () => {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        });
    }
    const sendRegister = () => {
        if (data.email === "" || data.password === "" || data.confirmpassword === "") {
            alert("Please enter an Username and a Password")
            return
        }
        if (data.password !== data.confirmpassword) {
            alert("Please enter the same password twice")
            return
        }
        axios.post("https://karl-area-server.herokuapp.com/signup", {
            'username': data.email,
            'password': data.password
        }).then(() => {
            alert("Registration Success")
            navigation.navigate("SignInScreen");
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.Error.details[0].message)
            } else if (error.request)
                console.log(error.request)
            else {
                console.log(error.message)
                alert(error.message)
            }
        })
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#e9bcbe' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register</Text>
            </View>
            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="email address"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(value) => textInputChange(value)}
                    />
                    {data.check_textInput ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="pink"
                                size={20}
                            />
                        </Animatable.View> : null
                    }
                </View>

                <Text style={[styles.text_footer], {marginTop: 35} }>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="password"
                        secureTextEntry={data.secureTextEntry}
                        style={styles.textInput}
                        autoCapitalize="none"error fix it
                        onChangeText={(value) => passwordChange(value)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureText}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            /> :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer], {marginTop: 35} }>Repeat Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="password"
                        secureTextEntry={data.confirmSecureTextEntry}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(value) => confirmPasswordChange(value)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureText}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            /> :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => sendRegister()}
                        style={styles.signIn}>
                        <LinearGradient
                            colors={['#e9bcbe', '#f06292']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {color: '#fff'}]}>Register</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {borderColor: '#e9bcbe', borderWidth: 1,
                            marginTop: 15}]}
                    >
                        <Text style={[styles.textSign, { color: '#e9bcbe'}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9bcbe'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });