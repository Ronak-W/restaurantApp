import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

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

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (email === "admin@gmail.com" && password === "admin123") {
                    dispatch(login('admin'));
                    Alert.alert("Admin Logged In Successfully!")
                    navigation.navigate('Home')
                    return;
                } else {
                    dispatch(login('user'))
                    Alert.alert("User Logged In Successfully!")
                    navigation.navigate('Home')
                }
            }).catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    Alert.alert("Invalid credentials")
                } else {
                    Alert.alert("Please enter all the credentials!");
                }
            })
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

            <TouchableOpacity style={styles.alreadyExistsContainer} onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: 'white', fontWeight: '500' }}>
                    Don't have an account ? <Text>Sign up</Text>
                </Text>
            </TouchableOpacity>

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
    alreadyExistsContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 15
    }
});

export default Login;
