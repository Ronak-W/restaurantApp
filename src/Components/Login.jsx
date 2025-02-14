import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [user, setuser] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (field, value) => {
        setuser((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleLogin = () => {
        const { email, password } = user;

        if (email === "admin@gmail.com" && password === "admin") {
            dispatch(login('admin'));
            Alert.alert("Admin Logged In !")
            navigation.navigate('Home')
        } else if (email === "user@gmail.com" && password === "user") {
            dispatch(login('user'));
            Alert.alert("User Logged In !")
            navigation.navigate('Home');
        } else {
            Alert.alert("Please Enter Valid Credentials")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Login</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={user.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />

                <TextInput
                    style={styles.inputField}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={user.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2b2c2b',
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        display: 'flex',
        // backgroundColor: 'yellow',
        width: '90%'
    },
    textStyle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputField: {
        backgroundColor: '#444',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        color: 'white',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#e55d2a',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Login;
