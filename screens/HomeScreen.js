import React, { useState, useEffect } from "react";
import {Button, StyleSheet, Switch, Text, View, Alert, FlatList, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Divider } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from 'expo-linear-gradient';
import useJwt from "../Jwt";
import axios from "axios";
import {FAB} from 'react-native-elements';
import { RequireJwt } from "./RequireJwt";

const HomeScreen = ({navigation}) => {
    const [list, setList] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        axios.get("https://karl-area-server.herokuapp.com/user/connections").then((res) => {
            setList([])
            for (const con of res.data["connections"]) {
                setList(arr => [...arr, con]);
            }
        })
    }, [isFocused])

    function deleteConnection(id) {
        axios.delete("https://karl-area-server.herokuapp.com/connection/" + id).then(() => {
            axios.get("https://karl-area-server.herokuapp.com/user/connections").then((res) => {
                setList([])
                for (const con of res.data["connections"]) {
                    setList(arr => [...arr, con]);
                }
            })
        })
    }
    return (
      <RequireJwt>
        {list.length === 0 ?
        <View style={styles.wrapperStyle}>
            <View style={styles.mainContainerStyle}>
                <ScrollView style={{marginLeft: 5, marginTop: 15}}>
                    <Text style={styles.tableHeadTextStyle}>Seems like you don't have any AREAs</Text>
                </ScrollView>
            </View>
        </View> :
        <View style={styles.wrapperStyle}>
            <View style={styles.mainContainerStyle}>
                <View style={{marginLeft: 30, marginTop: 10}}>
                <Text style={styles.tableHeadTextStyle}>My AREAs</Text>
                    <FlatList data={list}
                        keyExtractor={item => item["connection_id"]}
                        renderItem={(({item}) =>
                            <View style={{flexDirection: "column", justifyContent: "space-between", paddingTop: 10}}>
                            <Text style={styles.text_header}>{item["connection_name"]}</Text>
                            <Text style={styles.text_footer}>Action: {item["trigger_name"]}</Text>
                            <Text style={styles.text_footer}>Reaction: {item["reaction_name"]}</Text>
                            <Button
                                title="delete"
                                color='#e9bcbe'
                                onPress={() =>
                                    deleteConnection(item["connection_id"])
                                }
                            />
                            </View>
                            )}
                        ItemSeparatorComponent={(() => <Divider style={{ paddingTop: 5, paddingVertical: 5 }}/> )}/>
                </View>
            </View>
        </View>
        }
      </RequireJwt>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9bcbe'
  },
  FABStyle: {
    position: "absolute",
    bottom: 27,
    right: 20,
    left: 0,
    top: 0,
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
        fontSize: 25,
        paddingBottom: 20
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
      color: '#e9bcbe',
      fontWeight: 'bold',
      fontSize: 22
  },
  text_footer: {
      color: '#05375a',
      fontSize: 16
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
})
