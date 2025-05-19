import {View, Text, StyleSheet, Button, Alert, ImageBackground} from 'react-native';
import {useState} from 'react';
import {useNavigation} from 'expo-router';
import Fundo from '../../assets/images/Fundo.jpg';

export default function Index(){

    return(
        <View>
            <ImageBackground source={Fundo} resizeMode="cover" style={styles.container}>
                <Text style={styles.text}>Inside</Text>
                <View style={styles.card}>

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
        opacity: 0.5,
        backgroundColor: "#FFFFFF",

    },
});