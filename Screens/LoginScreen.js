import React, { useState, useEffect  } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../config/firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log("Auth User: ", authUser)
            if(authUser) {
                navigation.replace('Home')
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch(err => alert(err))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />

            <Image
                source={{
                    uri: 'https://www.citypng.com/public/uploads/preview/-51610315436n32jf4rpwx.png',
                }}
                style={{ width: 200, height: 200 }}
            />

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus type="email" 
                    value={email} 
                    onChangeText={text => setEmail(text)} 
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="password" 
                    value={password} 
                    onChangeText={text => setPassword(text)} 
                    onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button} title="Login" onPress={signIn} />
            <Button type="outline" containerStyle={styles.button} title="Register" 
                onPress={() => navigation.navigate('Register')} 
            />

        </KeyboardAvoidingView>
    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
