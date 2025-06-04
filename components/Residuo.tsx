import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, PressableProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


type Props = PressableProps & {
    data:{
        id: string
        data: string
        categoria: string
        peso: string
    }
    onDelete: () => void
    onEditar: () => void
}

    export function Residuo ({data, onDelete, onEditar, ...rest}:Props){
        return (
            <View style={styles.container}>
                <Pressable style={styles.fundo} {...rest}>
                    <Text style={styles.texto}>
                        {data.id} - {data.nome} - {data.telefone} - {data.endereco}
                    </Text>
    
                    <TouchableOpacity onPress={onEditar}>
                        <MaterialIcons name="edit" size={24} color="#3232aa"/>
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={onDelete}>
                        <MaterialIcons name="delete" size={24} color="red"/>
                    </TouchableOpacity>
                </Pressable>
            </View>
            
        );
    }
    
    const styles = StyleSheet.create({
        container:{
            width: "100%",
            justifyContent: "center",
            marginLeft: 20,
            marginRight: 50,
        },
        fundo:{
            width: "80%",
            backgroundColor: "#CECECE",
            padding: 24,
            borderRadius: 5,
            gap: 12,
            flexDirection: "row",
        },
    });