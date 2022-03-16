import React, { useState, useEffect } from "react";
import {Button, StyleSheet, Switch, Text, View, Alert, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import useJwt from "../Jwt";
import axios from "axios";
import { RequireJwt } from "./RequireJwt";

function SpotifyActions(props) {
    const [songPlaylistID, setSongPlaylistID] = useState("")

    function createSong() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/spotify/playlist", {
            'playlist_link': songPlaylistID,
        }).then((res) =>
            props.setAction(res.data.user_trigger_id)
        ).catch((error) => {
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

    return (
        <View style={styles.wrapperStyle}>
            <View style={styles.mainContainerStyle}>
                <ScrollView style={{marginLeft: 15, marginTop: 15}}>

                    <Text style={styles.tableHeadTextStyle}>On Song added to Playlist</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Playlist Link"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setSongPlaylistID(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createSong()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

function SpotifyReactions(props) {
    const [playlistID, setPlaylistID] = useState("")
    const [name, setName] = useState("")

    function createPlaylist() {
        axios.post("https://karl-area-server.herokuapp.com/reaction/spotify/song_to_playlist", {
            'playlist_link': playlistID,
            'trigger_reaction_name': name,
            'user_trigger_id': props.action
        }).then(() => props.setAction("")).catch((error) => {
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

    function createQueue() {
        axios.post("https://karl-area-server.herokuapp.com/reaction/spotify/song_to_queue", {
            'trigger_reaction_name': name,
            'user_trigger_id': props.action
        }).then(() => props.setAction("")).catch((error) => {
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

    return (
        <View style={styles.wrapperStyle}>
            <View style={styles.mainContainerStyle}>
                <ScrollView style={{marginLeft: 15, marginTop: 15}}>

                    <Text style={styles.tableHeadTextStyle}>AREA Name</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Set name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setName(value)}
                        />
                    </View>
                    <Text style={styles.tableHeadTextStyle}>Add Song to Playlist</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Playlist Link"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setPlaylistID(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createPlaylist()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.tableHeadTextStyle}>Add Song to Queue</Text>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createQueue()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export {SpotifyActions, SpotifyReactions}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9bcbe'
    },
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
      tableHeadTextStyle: {
        color: "rgba(0,0,0,0.6)",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 15,
        fontSize: 20,
        paddingBottom: 10
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
        marginTop: 20
    },
    signIn: {
        width: '70%',
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