import { Campo } from '@/components/Campos';
import { Container } from '@/components/Container';
//import { ClienteDataBase } from '@/database/useClienteDataBase';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function Index({ onChange }) {
    const [id, setId] = useState("")
    const [data, setData] = useState("")
    const [categoria, setCategoria] = useState("")
    const [peso, setPeso] = useState("")
    //const ClienteDataBase = useClienteDataBase();
    const navigation = useNavigation();

    const categorias = [
        'Não reciclável', 'Reciclável', 'Óleo', 'Tampinhas plásticas',
        'Lacres de alumínio', 'Tecidos', 'Meias', 'Material de escrita',
        'Esponjas', 'Eletrônicos', 'Pilhas e baterias', 'Infectante',
        'Químicos', 'Lâmpada fluorescente', 'Tonners de impressora',
        'Esmaltes', 'Cosméticos', 'Cartela de medicamento'
      ].map((item, index) => ({ label: item, value: String(index) }));

      const [value, setValue] = useState(null);
    async function create(){
        try{

            const response = await ClienteDataBase.create({
                data,
                categoria,
                peso
            })

            Alert.alert("Cliente cadastrado com sucesso! ID: " + response.insertedRowId)
        }catch(error){
            console.log(error)
        }
    }

    
    return (
        
        <Container title = "Registrar Resíduo">
            <View style={styles.container}>
            
            <Campo icon={<AntDesign style={styles.calendar} name="calendar" size={20} color="#2B5B3F" /> } onChangeText={setData} value={data}/>
            
            <Dropdown
               
                style={styles.dropdown}
                data={categorias}
                labelField="label"
                valueField="value"
                placeholder="Selecione a categoria"                
                placeholderStyle={styles.text}
                selectedTextStyle={styles.text}
                itemTextStyle={styles.text}
                search
                value={value}
                onChange={item => {
                setValue(item.value);
                onChange?.(item);
                }}
            />
            <Campo title={"Peso"} onChangeText={setPeso} value={peso}/>

            <Button style={styles.bn} 
            title="Registrar" 
            onPress={() => console.log("Resíduo registrado")} 
        />
            </View>
            </Container>

        
        
    );
}
    const styles = StyleSheet.create({

        dropdown:{
            width: 300,
            height:50,
            fontSize: 5,
            borderRadius: 10,
            backgroundColor: "#EEF2ED",
            margin: 10,
        },
        text:{ fontSize: 15, color: '#3D423D', marginLeft:14 },

        calendar:{
            marginLeft:10,
           
        },

        bn:{
            backgroundColor: "#2A5B3F"
        }


});


