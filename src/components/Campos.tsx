import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

export function Campo({title,icon, ...rest}:TextInputProps){
    return (
        <View style={styles.cmp}>

            <Text style={styles.text}>{title}</Text>
            <View style={{flexDirection:"row"}}>

            {icon}
            <TextInput {...rest}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cmp:{
        width: 300,
        height:50,
        fontSize: 8,
        borderRadius: 10,
        backgroundColor: "#EEF2ED",
        margin: 10,
        
    },

    text:{
        marginLeft: "5%",
        color:"#3D423D"

    }
})