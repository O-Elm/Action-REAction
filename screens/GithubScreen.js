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

function GithubActions(props) {
    const [pushRepoName, setPushRepoName] = useState("")
    const [pushUserName, setPushUserName] = useState("")
    const [prRepoName, setPRRepoName] = useState("")
    const [prUserName, setPRUserName] = useState("")

    function createPush() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/github/updateOnGithubPush", {
            'github_repo_name': pushRepoName,
            'github_username': pushUserName
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

    function createPR() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/github/updateOnPullRequest", {
            'github_repo_name': prRepoName,
            'github_username': prUserName
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

                    <Text style={styles.tableHeadTextStyle}>On Push</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Repo Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setPushRepoName(value)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setPushUserName(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createPush()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.tableHeadTextStyle}>On Pull Request</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Server ID"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setPRRepoName(value)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Command Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setPRUserName(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createPR()}
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

function GithubReactions(props) {

    return (
        <View style={styles.wrapperStyle}>
            <View style={styles.mainContainerStyle}>
                <ScrollView style={{marginLeft: 15, marginTop: 15}}>
                </ScrollView>
            </View>
        </View>
    )
}

export {GithubActions, GithubReactions}

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