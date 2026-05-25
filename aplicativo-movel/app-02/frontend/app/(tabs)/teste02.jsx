import { View, Alert, Text, StyleSheet, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";


// Alert = Usa para pedir o a autorização para entrar na camera e arquivos do seu celular.
export default function Teste02() {

    const [image, setImage] = useState(null); // null:

    const pickImage = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permissão do aplicativo', 'Precisa da sua permissão.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    //Função para câmera do celular
    const pickFoto = async () => {

        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permissão do aplicativo', 'Precisa da sua permissão para acessar a Câmera.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.texto1}>Click no icone abaixo para tirar foto</Text>

                <View style={styles.caixa1}>
                    <Pressable onPress={pickImage} style={styles.btn}>
                        <Text style={styles.texto}>Galeria</Text>
                    </Pressable>

                    <Pressable title="Camera" onPress={pickFoto} style={styles.btn} >
                        <Text style={styles.texto}>Foto</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>

            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000ff'
    },

    texto1: {
        fontSize: 25,
        textAlign: 'center',
        color: '#000000ff',
        marginBottom: 10
    },

    box1: {
        backgroundColor: '#03497fff',
        height: 450,
        width: 350,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#e9e5e5ff',
        borderWidth: 3
    },

    image: {
        borderRadius: 5,
        width: 280,
        height: 220,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20
    },

    caixa1: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },

    texto: {
        textAlign: 'center',
    },
    btn: {
        height: 50,
        width: 100,
        backgroundColor: '#d50b0bff',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 5,
        justifyContent: 'center',
        alignContent: 'center'
        
    }




});