import React, { useState, useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import {DiscordActions, DiscordReactions} from './DiscordScreen'
import {TwitchActions, TwitchReactions} from './TwitchScreen'
import {GithubActions, GithubReactions} from './GithubScreen'
import {SpotifyActions, SpotifyReactions} from './SpotifyScreen'
import {RedditActions, RedditReactions} from './RedditScreen'
import { useIsFocused } from '@react-navigation/native';
import useJwt from "../Jwt"
import axios from "axios";
import { RequireJwt } from "./RequireJwt";

const DiscordCard = (props) => {
    return (
        <View style={styles.discordContainer}>
            <Image style={styles.imagineStyle} source={require('../assets/discord_image.png')} />
            <View style={styles.infoStyle}>
                <Text style={styles.titleStyle}>{props.text}</Text>
            </View>
        </View>
    );
};

const TwitchCard = (props) => {
    return (
        <View style={styles.twitchContainer}>
            <Image style={styles.imagineStyle} source={require('../assets/twitch-logo.jpg')} />
            <View style={styles.infoStyle}>
                <Text style={styles.titleStyle}>{props.text}</Text>
            </View>
        </View>
    );
};

const GithubCard = (props) => {
    return (
        <View style={styles.githubContainer}>
            <Image style={styles.imagineStyle} source={require('../assets/github-logo.jpg')} />
            <View style={styles.infoStyle}>
                <Text style={styles.titleBlackStyle}>{props.text}</Text>
            </View>
        </View>
    );
};

const RedditCard = (props) => {
    return (
        <View style={styles.redditContainer}>
            <Image style={styles.imagineStyle} source={require('../assets/reddit-logo.jpg')} />
            <View style={styles.infoStyle}>
                <Text style={styles.titleStyle}>{props.text}</Text>
            </View>
        </View>
    );
};

const SpotifyCard = (props) => {
    return (
        <View style={styles.spotifyContainer}>
            <Image style={styles.imagineStyle} source={require('../assets/spotify-logo.png')} />
            <View style={styles.infoStyle}>
                <Text style={styles.titleStyle}>{props.text}</Text>
            </View>
        </View>
    );
};


function ActionMenu(props) {
    const [discord, setDiscord] = useState(false)
    const [github, setGithub] = useState(false)
    const [reddit, setReddit] = useState(false)
    const [spotify, setSpotify] = useState(false)
    const [twitch, setTwitch] = useState(false)
    const isFocused = useIsFocused();

    useEffect(() => {
        axios.get("https://karl-area-server.herokuapp.com/user/subscriptions").then((res) => {
            setDiscord(res.data.services.indexOf("discord") > -1)
            setGithub(res.data.services.indexOf("github") > -1)
            setReddit(res.data.services.indexOf("reddit") > -1)
            setSpotify(res.data.services.indexOf("spotify") > -1)
            setTwitch(res.data.services.indexOf("twitch") > -1)
        });
    }, [isFocused]);

    return (
        <View style={styles.wrapperStyle}>
            <View style={styles.mainContainerStyle}>
                <ScrollView style={{marginLeft: 15, marginTop: 15}}>
                    {discord ?
                        <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("discord")}>
                            <DiscordCard text={"Clic to add an action"}/>
                        </TouchableOpacity> :
                        <View style={{paddingBottom: 15 }}>
                            <DiscordCard text={"Discord Not linked"}/>
                        </View>}
                    {twitch ?
                        <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("twitch")}>
                            <TwitchCard text={"Clic to add an action"}/>
                        </TouchableOpacity> :
                        <View style={{paddingBottom: 15 }}>
                            <TwitchCard text={"Twitch Not linked"}/>
                        </View>}
                    {github ?
                        <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("github")}>
                            <GithubCard text={"Clic to add an action"}/>
                        </TouchableOpacity> :
                        <View style={{paddingBottom: 15 }}>
                            <GithubCard text={"Github Not linked"}/>
                        </View>}
                    {spotify ?
                        <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("spotify")}>
                            <SpotifyCard text={"Clic to add an action"}/>
                        </TouchableOpacity> :
                        <View style={{paddingBottom: 15 }}>
                            <SpotifyCard text={"Spotify Not linked"}/>
                        </View>}
                    {reddit ?
                        <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("reddit")}>
                            <RedditCard text={"Clic to add an action"}/>
                        </TouchableOpacity> :
                        <View style={{paddingBottom: 15 }}>
                            <RedditCard text={"Reddit Not linked"}/>
                        </View>}
                </ScrollView>
            </View>
        </View>
    )
}

function ChooseAction(props) {
    const [service, setService] = useState("");

    function ActionWindow() {
        switch (service) {
            case "discord":
                return <DiscordActions setAction={props.setAction}/>
            case "github":
                return <GithubActions setAction={props.setAction}/>
            case "reddit":
                return <RedditActions setAction={props.setAction}/>
            case "spotify":
                return <SpotifyActions setAction={props.setAction}/>
            case "twitch":
                return <TwitchActions setAction={props.setAction}/>
        }
    }

    return (
        <View>
            {service === "" ? <ActionMenu setService={setService}/> : <ActionWindow/>}
        </View>
    )
}

function ReactionMenu(props) {
    const [discord, setDiscord] = useState(false)
    const [reddit, setReddit] = useState(false)
    const [spotify, setSpotify] = useState(false)
    const [twitch, setTwitch] = useState(false)
    const isFocused = useIsFocused();

    useEffect(() => {
        axios.get("https://karl-area-server.herokuapp.com/reactions_to_user_trigger/" + props.action.toString()).then((res) => {
            axios.get("https://karl-area-server.herokuapp.com/user/subscriptions").then((res2) => {
                for (const object of res.data) {
                    if (object["service"] === "discord" && res2.data.services.indexOf("discord") > -1)
                        setDiscord(true)
                    if (object["service"] === "reddit" && res2.data.services.indexOf("reddit") > -1)
                        setReddit(true)
                    if (object["service"] === "spotify" && res2.data.services.indexOf("spotify") > -1)
                        setSpotify(true)
                    if (object["service"] === "twitch" && res2.data.services.indexOf("twitch") > -1)
                        setTwitch(true)
                }
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                } else if (error.request)
                    console.log(error.request)
                else {
                    console.log(error.message)
                }
            })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request)
                console.log(error.request)
            else {
                console.log(error.message)
            }
        })
    }, [isFocused])

    return (
        <View style={styles.wrapperStyle}>
            <View style={styles.mainContainerStyle}>
                <ScrollView style={{marginLeft: 15, marginTop: 15}}>
                    {discord ?
                    <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("discord")}>
                        <DiscordCard text={"add a Discord reaction"}/>
                    </TouchableOpacity> :
                    <View style={{paddingBottom: 15 }}>
                        <DiscordCard text={"No existing reaction"}/>
                    </View>
                    }
                    {reddit ?
                    <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("reddit")}>
                        <RedditCard text={"add a Reddit reaction"}/>
                    </TouchableOpacity> :
                    <View style={{paddingBottom: 15 }}>
                        <RedditCard text={"No existing reaction"}/>
                    </View>
                    }
                    {spotify ?
                    <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("spotify")}>
                        <SpotifyCard text={"add a Spotify reaction"}/>
                    </TouchableOpacity> :
                    <View style={{paddingBottom: 15 }}>
                        <SpotifyCard text={"No existing reaction"}/>
                    </View>
                    }
                    {twitch ?
                    <TouchableOpacity style={{paddingBottom: 15 }} onPress={() => props.setService("twitch")}>
                        <TwitchCard text={"add a Twitch reaction"}/>
                    </TouchableOpacity> :
                    <View style={{paddingBottom: 15 }}>
                        <TwitchCard text={"No existing reaction"}/>
                    </View>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

function ChooseReaction(props) {
    const [service, setService] = useState("");

    function ReactionWindow() {
        switch (service) {
            case "discord":
                return <DiscordReactions setAction={props.setAction} action={props.action}/>
            case "github":
                return <GithubReactions setAction={props.setAction} action={props.action}/>
            case "reddit":
                return <RedditReactions setAction={props.setAction} action={props.action}/>
            case "spotify":
                return <SpotifyReactions setAction={props.setAction} action={props.action}/>
            case "twitch":
                return <TwitchReactions setAction={props.setAction} action={props.action}/>

        }
    }

    return (
        <View>
            {service === "" ? <ReactionMenu action={props.action} setService={setService}/> : <ReactionWindow/>}
        </View>
    )
}

const PostScreen = ({navigation}) => {
    const [action, setAction] = useState("");
    return (
        <RequireJwt>
            <View>
                {action === "" ? <ChooseAction setAction={setAction}/> : <ChooseReaction setAction={setAction} action={action}/>}
            </View>
        </RequireJwt>
    )
}

export default PostScreen

const deviceWidth = Math.round(Dimensions.get('window').width) - 80
const styles = StyleSheet.create({
    discordContainer: {
        width: deviceWidth,
        backgroundColor: '#7289DA',
        height: 180,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.75,
        elevation: 9,
    },
    githubContainer: {
        width: deviceWidth,
        backgroundColor: '#fff',
        height: 180,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.75,
        elevation: 9,
    },
    spotifyContainer: {
        width: deviceWidth,
        backgroundColor: '#1ed760',
        height: 180,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.75,
        elevation: 9,
    },
    twitchContainer: {
        width: deviceWidth,
        backgroundColor: '#6441a5',
        height: 180,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.75,
        elevation: 9,
    },
    redditContainer: {
        width: deviceWidth,
        backgroundColor: '#FF4500',
        height: 180,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.75,
        elevation: 9,
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
    titleStyle: {
        fontSize: 20,
        fontWeight: '300',
        color: '#fff'
    },
    titleBlackStyle: {
        fontSize: 20,
        fontWeight: '300',
        color: 'black'
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
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
      tableHeadStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: "rgba(255,255,255,0.7)",
        height: 50,
        flexDirection: "row",
      },
      tableHeadTextStyle: {
        color: "rgba(0,0,0,0.6)",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 15,
        fontSize: 20
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
        backgroundColor:'#0275d8',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    buttonText:{
        color:'#fff',
        fontSize:25
    }
})