import React, { useState, useEffect } from "react";
import { StatusBar, TextInput, Switch, View, Text, Button, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Divider } from "react-native-elements";
import useJwt from "../Jwt";
import axios from "axios";
import * as WebBrowser from 'expo-web-browser';
import { RequireJwt } from "./RequireJwt";

const SettingsScreen = ({navigation}) => {
    const {logout} = useJwt()
    let jwt = localStorage.getItem('token');
    const [discord, setDiscord] = useState(false)
    const [github, setGithub] = useState(false)
    const [reddit, setReddit] = useState(false)
    const [spotify, setSpotify] = useState(false)
    const [twitch, setTwitch] = useState(false)
    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false)

    useEffect(() => {
        axios.get("https://karl-area-server.herokuapp.com/user/subscriptions").then((res) => {
            setDiscord(res.data.services.indexOf("discord") > -1)
            setGithub(res.data.services.indexOf("github") > -1)
            setReddit(res.data.services.indexOf("reddit") > -1)
            setSpotify(res.data.services.indexOf("spotify") > -1)
            setTwitch(res.data.services.indexOf("twitch") > -1)
        })
    }, [isFocused]);

    const handleAsync = async (props) => {
        let result = await WebBrowser.openAuthSessionAsync(props);
      };

    function handleDiscord() {
        if (!discord) {
            axios.get("https://karl-area-server.herokuapp.com/discord/subscribe").then((res) => {
                handleAsync(res.data)

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
        } else {
            axios.get("https://karl-area-server.herokuapp.com/discord/unsubscribe").then((res) => {
                alert("Successfully disconnected: Discord")
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
        setDiscord(!discord)
    }

    function handleGithub() {
        if (!github) {
            axios.get("https://karl-area-server.herokuapp.com/github/subscribe").then((res) => {
                handleAsync(res.data)
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
        } else {
            axios.get("https://karl-area-server.herokuapp.com/github/unsubscribe").then((res) => {
                alert("Successfully disconnected: GitHub")
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
        setGithub(!github)
    }

    function handleReddit() {
        if (!reddit) {
            axios.get("https://karl-area-server.herokuapp.com/reddit/subscribe").then((res) => {
                handleAsync(res.data)
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
        } else {
            axios.get("https://karl-area-server.herokuapp.com/reddit/unsubscribe").then((res) => {
                alert("Successfully disconnected: Reddit")
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
        setReddit(!reddit)
    }

    function handleSpotify() {
        if (!spotify) {
            axios.get("https://karl-area-server.herokuapp.com/spotify/subscribe").then((res) => {
                handleAsync(res.data)
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
        } else {
            axios.get("https://karl-area-server.herokuapp.com/spotify/unsubscribe").then((res) => {
                alert("Successfully disconnected: Spotify")
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
        setSpotify(!spotify)
    }

    function handleTwitch() {
        if (!twitch) {
            axios.get("https://karl-area-server.herokuapp.com/twitch/subscribe").then((res) => {
                handleAsync(res.data)
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
        } else {
            axios.get("https://karl-area-server.herokuapp.com/twitch/unsubscribe").then((res) => {
                alert("Successfully disconnected: Twitch")
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
        setTwitch(!twitch)
    }

    function logoutUser() {
        logout()
    }

    return (
        <RequireJwt>
            <View style={styles.wrapperStyle}>
                <View style={styles.mainContainerStyle}>
                    <View style={{marginLeft: 15, marginTop: 15}}>
                        <Text style={styles.tableHeadTextStyle}>Settings</Text>
                        <Linear text='Discord' value={discord} onValueChange={() => handleDiscord()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Reddit' value={reddit} onValueChange={() => handleReddit()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Twitch' value={twitch} onValueChange={() => handleTwitch()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Spotify' value={spotify} onValueChange={() => handleSpotify()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Github' value={github} onValueChange={() => handleGithub()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Text style={styles.tableHeadTextStyle}>SignOut</Text>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => logoutUser()}
                                style={[styles.signIn, {borderColor: '#e9bcbe', borderWidth: 1,
                                    marginTop: 5}]}
                            >
                                <Text style={[styles.textSign, { color: '#e9bcbe'}]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </RequireJwt>
    )
}


function Linear(props) {
    return (
        <View style={{paddingVertical: 10, paddingHorizontal: 90, flexDirection: "row", justifyContent: "flex-end"}}>
            <Text style={{alignSelf: "center", fontSize: 14, paddingRight: 20}}>
                {props.text}
            </Text>
            <Switch
                trackColor={{false: "#CEE3F8", true: "#f06292"}}
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </View>
    );
  }

export default SettingsScreen

const styles = StyleSheet.create({
    wrapperStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 90,
        backgroundColor: "#e9bcbe",
      },
      mainContainerStyle: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
      },
      tableHeadStyle: {
        fontSize: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: "rgba(255,255,255,0.7)",
        height: 50,
        paddingTop: 30,
      },
      tableHeadTextStyle: {
        color: "rgba(0,0,0,0.6)",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 15,
        fontSize: 30,
        paddingBottom: 20
      },
      nutrimentsTextStyle: {
        padding: 15,
      },
      valuesTextStyle: {
        padding: 15,
        textAlign: "right",
      },
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
    button:{
        backgroundColor:'#fff',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    buttonText:{
        color:'#fff',
        fontSize:25
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
})