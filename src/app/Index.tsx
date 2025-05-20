import {View, Text, StyleSheet, Button, Alert, ImageBackground, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {useNavigation} from 'expo-router';
import Fundo from '../../assets/images/Fundo.jpg';
import materialIcon from '@expo/vector-icons'

export default function Index(){

    return(
        <View>
            <ImageBackground source={Fundo} resizeMode="cover" style={styles.container}>
                <Text style={styles.text}>Inside</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.btn}>
                        <Text>texte</Text>
                    </TouchableOpacity>
                    
                </View>
            </ImageBackground>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: "center",
    },
    card:{
        width: 350,
        height: 400,
        borderRadius: 25,
        padding: 20,
        opacity: 0.5,
        backgroundColor: "#FFFFFF",

        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 10,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10,

        elevation: 10,
    },
    btn:{
        width: "100%",
        height: 50,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#EEF2ED",
        borderRadius: 10,
    }
});