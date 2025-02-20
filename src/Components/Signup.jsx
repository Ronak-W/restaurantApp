import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { login } from '../redux/userSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Signup = () => {


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

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '230200919753-c6r3ok8vsp19voiobftt1au0tftcqh8m.apps.googleusercontent.com',
        });
    })

    const handleSignup = () => {
        const { email, password } = user;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                Alert.alert("User Registered Successfully!");
                dispatch(login('user'))
                navigation.navigate('Home');
            }).catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("The email address is already in use!")
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert("The email address is invalid!")
                } else if (error.code === "auth/weak-password") {
                    Alert.alert("The password must be 6 characters!")
                } else {
                    Alert.alert(error.message)
                }
            })




        // if (email === "admin@gmail.com" && password === "admin") {
        //     dispatch(login('admin'));
        //     Alert.alert("Admin Logged In !")
        //     navigation.navigate('Home')
        // } else if (email === "user@gmail.com" && password === "user") {
        //     dispatch(login('user'));
        //     Alert.alert("User Logged In !")
        //     navigation.navigate('Home');
        // } else {
        //     Alert.alert("Please Enter Valid Credentials")
        // }
    };

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();

        // Try the new style of google-sign in result, from v13+ of that module
        idToken = signInResult.data?.idToken;


        console.log("TOKEN ID", idToken);
        Alert.alert("SUCCESS")

        if (!idToken) {
            // if you are using older versions of google-signin, try old style result
            idToken = signInResult.idToken;
            // Alert.alert(idToken)
        }
        if (!idToken) {
            // Alert.alert(idToken)
            throw new Error('No ID token found');
        }

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);


        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Signup</Text>

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

                <TouchableOpacity style={styles.loginButton} onPress={() => handleSignup()} >
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.alreadyExistsContainer} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>
                        Already have an account ? <Text>Login</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={() => onGoogleButtonPress()} >
                    <Text style={styles.buttonText}>Google</Text>
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

export default Signup