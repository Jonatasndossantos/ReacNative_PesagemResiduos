import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fundo from '../../assets/images/Fundo.jpg';
import Logo from '../../assets/images/Logo.png';

export default function Index(){

    const navigation = useNavigation();

    return(
        <View>
            <ImageBackground source={Fundo} resizeMode="cover" style={styles.container}>
                <View style={styles.header}>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.title}>Gestão de Resíduos</Text>
                </View>
                
                <View style={styles.card}>
                    <ButtonItem icon={<AntDesign name="plus" size={20} color="#2B5B3F" />} label="Registrar novo resíduo" onPress={() => navigation.navigate('Cadastrar')} />
                    <ButtonItem icon={<MaterialIcons name="list-alt" size={20} color="#2B5B3F" />} label="Ver registros" onPress={() => navigation.navigate('records')} />
                    <ButtonItem icon={<Feather name="refresh-ccw" size={20} color="#2B5B3F" />} label="Sincronizar com planilha" onPress={() => navigation.navigate('settings')} />
                    <ButtonItem icon={<Feather name="settings" size={20} color="#2B5B3F" />} label="Configurações" onPress={() => navigation.navigate('settings')} />
                </View>
            </ImageBackground>
        </View>
    )

}
function ButtonItem({ icon, label, onPress }) {
    return (
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <View style={styles.icon}>{icon}</View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 10,
        marginTop: 70,
        marginBottom: 70,
      },      
    logo: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        color: "#2B5B3F",
        fontWeight: "bold",
    },
    card:{
        width: 350,
        height: 400,
        borderRadius: 25,
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparência aplicada apenas ao fundo
        gap: 20,
    },
    btn:{
        padding: 12,
        alignItems: "center",
        backgroundColor: "#EEF2ED",
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        elevation: 4, // sombra visível no Android
    },
    icon:{
        width: 32,
        padding: 5,
        backgroundColor: "white",
        borderRadius: 50,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
    },
});