import React, { useLayoutEffect, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { auth, db } from '../config/firebase';

// importing components
import CustomListItem from '../components/CustomListItem';

// importing icons
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => {
            console.log("SNAPSHOT: ", snapshot.docs)
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })

        return unsubscribe;
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5} >
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("AddChat")} 
                        activeOpacity={0.5}
                    >
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map(({id, data: { chatName } }) => (
                        <CustomListItem key={id} id={id} chatName={chatName} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
