import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addData, updateData } from '../redux/fetchDataSlice';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const AddItem = ({ item }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        name: item ? item.name : '',
        image: item ? item.image : '',
        price: item ? item.price : ''
    });

    //To populate the form fileds to update
    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                image: item.image,
                price: item.price
            });
        }
    }, [item]);

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleAddItem = () => {
        if (!formData.name || !formData.image || !formData.price) {
            Alert.alert(
                "Invalid Input!",
                "Please fill all the fields",
                [
                    {
                        text: "OK",
                    }
                ]
            );
            return;
        }

        //to update if item and it's id is present 
        if (item && item.id) {
            dispatch(updateData({ ...formData, id: item.id }));
            Alert.alert("Food Item Updated Successfully!")
            navigation.navigate('Home')
        } else {
            dispatch(addData(formData));
            Alert.alert("Food Item Added Successfully")
            navigation.navigate('Home');
        }

        setFormData({
            name: '',
            image: '',
            price: ''
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Enter Food Details:</Text>

            {formData.image ?
                (
                    <Image style={styles.imageStyle} source={{ uri: formData.image }} />
                ) : (
                    null
                )}

            <TextInput
                style={styles.inputField}
                placeholder="Food Item Name"
                placeholderTextColor="#aaa"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Food Image URL"
                placeholderTextColor="#aaa"
                value={formData.image}
                onChangeText={(text) => handleInputChange('image', text)}
            />

            <TextInput
                style={styles.inputField}
                placeholder="Food Price"
                placeholderTextColor="#aaa"
                value={formData.price}
                onChangeText={(text) => handleInputChange('price', text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem()}>
                <Text style={styles.buttonText}>{item ? 'Update Item' : 'Add Item'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2c2b',
        padding: 20,
    },
    textStyle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputField: {
        backgroundColor: '#444',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        color: 'white',
        fontSize: 16,
    },
    addButton: {
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
    imageStyle: {
        display: 'flex',
        alignSelf: 'center',
        height: 200,
        width: 200,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'white'
    }
});
