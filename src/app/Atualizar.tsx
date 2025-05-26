import { Campo } from '@/components/Campos'
import { Container } from '@/components/Container'
//import { ClienteDataBase } from '@/database/useClienteDataBase'
import { AntDesign } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

export default function Atualizar(){
    const [id, setId] = useState("")
    const [data, setData] = useState("")
    const [categoria, setcategoria] = useState("")
    const [peso, setPeso] = useState("")
    //const [Residuo, setResiduo] = useState<ClienteDataBase[]>()
    //const clienteDataBase = useClienteDataBase();
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
  //Determinar os conteúdos dos campos
  useEffect(() => {
    if(item){
        setId(item.id.toString());
        setData(item.data);
        setcategoria(item.categoria);
        setPeso(item.peso);
    }
}, []);

    async function atualizar(){

        try{
            await ClienteDataBase.atualizar({
                id: Number(id),
                data,
                categoria,
                peso
            });
            Alert.alert(
                "Sucesso!",
                "Dados atualizados com sucesso!",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("Consultar"),
                    },
                ],
                { cancelable: false }
            );
        }catch(error){
            console.log(error)
        }
    }//fim do atualizar

    async function salvarAtualizacao(){
        try{
            if(id){
                await atualizar()
            }
        }catch(error){
            console.log(error)
        }
        setId("");
        setData("");
        setCategoria("");
        setPeso("");
    }//fim do salvarAtualizacao

    return(
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

   
        </View>
        </Container>
)}
        