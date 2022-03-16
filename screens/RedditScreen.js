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

function RedditActions(props) {
    const [subredditName, setSubredditName] = useState("")
    const [votePostID, setVotePostID] = useState("")
    const [upvotePostID, setUpvotePostID] = useState("")
    const [downvotePostID, setDownvotePostID] = useState("")
    const [limitPostID, setLimitPostID] = useState("")
    const [limitVoteLimit, setLimitVoteLimit] = useState("")

    function createSubreddit() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/reddit/updateOnSubreddit", {
            'subreddit': subredditName,
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

    function createFeed() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/reddit/updateOnFeed"
            ).then((res) =>
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

    function createVote() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/reddit/updateOnPostVote", {
            'post_id': votePostID,
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

    function createUpvote() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/reddit/updateOnPostUpvote", {
            'post_id': upvotePostID,
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


    function createDownvote() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/reddit/updateOnPostDownvote", {
            'post_id': downvotePostID,
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

    function createLimit() {
        axios.post("https://karl-area-server.herokuapp.com/trigger/reddit/updateOnPostVotelimit", {
            'post_id': limitPostID,
            'votelimit': limitVoteLimit,
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

                    <Text style={styles.tableHeadTextStyle}>On Post on Subreddit</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Subreddit Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setSubredditName(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createSubreddit()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.tableHeadTextStyle}>On Post on Feed</Text>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createFeed()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.tableHeadTextStyle}>On Post Vote</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Post ID"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setVotePostID(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createVote()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.tableHeadTextStyle}>On Post on Upvote</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Post ID"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setUpvotePostID(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createUpvote()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.tableHeadTextStyle}>On Post on Downvote</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Post ID"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setDownvotePostID(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createDownvote()}
                            style={styles.signIn}>
                            <LinearGradient
                                colors={['#e9bcbe', '#f06292']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.tableHeadTextStyle}>On Post reaches Vote Limit</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Post ID"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setLimitPostID(value)}
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Vote Limit"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setLimitVoteLimit(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createLimit()}
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

function RedditReactions(props) {
    const [postID, setPostID] = useState("")
    const [name, setName] = useState("")

    function createMessage() {
        axios.post("https://karl-area-server.herokuapp.com/reaction/reddit/upvotePost", {
            'post_id': postID,
            'trigger_reaction_name': name,
            'user_trigger_id': props.action,
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
                    <Text style={styles.tableHeadTextStyle}>Upvote Post</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Post ID"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(value) => setPostID(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => createMessage()}
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

export {RedditActions, RedditReactions}

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