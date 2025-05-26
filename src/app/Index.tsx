import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function Index() {
    const navigation = useNavigation();

    return (
        <Container>
            <Button 
                icon={<AntDesign name="plus" size={20} color="#2B5B3F" />} 
                label="Registrar novo resíduo" 
                onPress={() => navigation.navigate('Cadastrar')} 
            />
            <Button 
                icon={<MaterialIcons name="list-alt" size={20} color="#2B5B3F" />} 
                label="Ver registros" 
                onPress={() => navigation.navigate('Consultar')} 
            />
            <Button 
                icon={<Feather name="refresh-ccw" size={20} color="#2B5B3F" />} 
                label="Sincronizar com planilha" 
                onPress={() => navigation.navigate('settings')} 
            />
            <Button 
                icon={<Feather name="settings" size={20} color="#2B5B3F" />} 
                label="Configurações" 
                onPress={() => navigation.navigate('settings')} 
            />
        </Container>
    );
}