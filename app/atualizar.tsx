import { Campo } from '../components/Campos'
import { Container } from '../components/Container'
import { fetchCategories, updateWasteRecord } from '../services/api'
import { AntDesign } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

export default function Atualizar() {
    const rota = useRouter()
    const { item } = useLocalSearchParams<{ item: string }>()
    const parsedItem = typeof item === 'string' ? JSON.parse(item) : item

    const [id, setId] = useState<number | null>(null)
    const [data, setData] = useState('')
    const [peso, setPeso] = useState('')
    const [categoria, setCategoria] = useState('')
    const [categories, setCategories] = useState<Array<{ label: string; value: string }>>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (parsedItem) {
            setId(parsedItem.id)
            setData(parsedItem.data)
            setCategoria(parsedItem.categoria)
            // Convert number to string for input field, format to 3 decimal places
            setPeso(parsedItem.peso.toFixed(3))
        }
        fetchCategories().then(cats => {
            setCategories(cats.map(cat => ({ label: cat.nome, value: cat.nome })))
            setLoading(false)
        })
    }, [item])

    async function handleUpdate() {
        if (!id || !data || !categoria || !peso) {
            Alert.alert('Erro', 'Preencha todos os campos')
            return
        }

        // Validate weight format
        const weightNum = parseFloat(peso);
        if (isNaN(weightNum) || weightNum <= 0) {
            Alert.alert("Erro", "Peso inválido. Digite um número maior que zero");
            return;
        }

        try {
            await updateWasteRecord({ 
                id, 
                data, 
                categoria, 
                peso: weightNum // Send as number, not string
            })
            Alert.alert('Sucesso', 'Registro atualizado com sucesso!', [
                { text: 'OK', onPress: () => rota.push('/') }
            ])
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o registro')
        }
    }

    return (
        <Container title="Atualizar Resíduo">
            <View style={styles.container}>
                <Campo
                    type="date"
                    icon={<AntDesign style={styles.calendar} name="calendar" size={20} color="#2B5B3F" />}
                    onChangeText={setData}
                    value={data}
                />
                <Dropdown
                    style={styles.dropdown}
                    data={categories}
                    labelField="label"
                    valueField="value"
                    placeholder={loading ? "Carregando categorias..." : "Selecione a categoria"}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    value={categoria}
                    onChange={item => setCategoria(item.value)}
                    disable={loading}
                />
                <Campo
                    type="weight"
                    onChangeText={setPeso}
                    value={peso}
                />
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => rota.back()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    dropdown: {
        width: 300,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#EEF2ED",
        margin: 10,
        paddingHorizontal: 16,
    },
    placeholderStyle: {
        color: '#666666',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#2B5B3F',
        fontSize: 16,
    },
    itemTextStyle: {
        color: '#3D423D',
        fontSize: 15,
    },
    calendar: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#2A5B3F",
        width: 300,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
        