import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import "expo-router/entry";

export default function Index() {
    const rota = useRouter();

    return (
        <Container card={false}>
            <View style={styles.card}>
                <Button 
                    icon={<AntDesign name="plus" size={20} color="#2B5B3F" />} 
                    label="Registrar novo resíduo" 
                    onPress={() => rota.push('/cadastrar')} 
                />
                <Button 
                    icon={<MaterialIcons name="list-alt" size={20} color="#2B5B3F" />} 
                    label="Ver registros" 
                    onPress={() => rota.push('/consultar')} 
                />
                <Button 
                    icon={<Feather name="settings" size={20} color="#2B5B3F" />} 
                    label="Configurações" 
                    onPress={() => rota.push('/configuracoes')} 
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 40,
        width: 350,
        height: 400,
        marginTop: 70,
        borderRadius: 25,
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        gap: 20,
      },
});