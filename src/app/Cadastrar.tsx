import { Campo } from '@/components/Campos';
import { Container } from '@/components/Container';
import { fetchCategories, registerWaste } from '@/services/api';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface CadastrarProps {
    onChange?: (item: { label: string; value: number }) => void;
}

interface Category {
    id: number;
    nome: string;
}

export default function Index({ onChange }: CadastrarProps) {
    const [data, setData] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [peso, setPeso] = useState("")
    const [categories, setCategories] = useState<Array<{ label: string; value: number }>>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
    const navigation = useNavigation();

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const result = await fetchCategories();
            //console.log('Categories from API:', result);
            const formattedCategories = result.map(cat => ({
                label: cat.nome,
                value: cat.id
            }));
            setCategories(formattedCategories);
        } catch (error) {
            console.error('Error loading categories:', error);
            Alert.alert('Erro', 'Não foi possível carregar as categorias');
        } finally {
            setLoading(false);
        }
    }

    const handleDateChange = (dateStr: string) => {
        setData(dateStr);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleWeightChange = (text: string) => {
        setPeso(text);
    };

    async function handleSubmit() {
        if (!data || !selectedCategory || !peso) {
            Alert.alert("Erro", "Por favor preencha todos os campos");
            return;
        }

        // Validate weight format
        const weightNum = parseFloat(peso);
        if (isNaN(weightNum) || weightNum <= 0) {
            Alert.alert("Erro", "Peso inválido. Digite um número maior que zero");
            return;
        }

        try {
            const response = await registerWaste({
                data,
                categoria: selectedCategoryName,
                peso: `${weightNum.toFixed(3)}`
            });

            if (response.status === "created") {
                Alert.alert("Sucesso", `Resíduo registrado com sucesso! ID: ${response.id}`);
                setData("");
                setSelectedDate(null);
                setSelectedCategory(null);
                setSelectedCategoryName("");
                setPeso("");
            } else {
                Alert.alert("Erro", "Não foi possível registrar o resíduo");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Ocorreu um erro ao registrar o resíduo");
        }
    }

    return (
        <Container title="Registrar Resíduo">
            <View style={styles.container}>
                <Campo 
                    type="date"
                    icon={<AntDesign style={styles.calendar} name="calendar" size={20} color="#2B5B3F" />} 
                    onChangeText={handleDateChange}
                    onChangeDate={handleDateSelect}
                    value={data}
                />
                
                <Dropdown
                    style={styles.dropdown}
                    data={categories}
                    labelField="label"
                    valueField="value"
                    placeholder={loading ? "Carregando categorias..." : "Selecione a categoria"}
                    placeholderStyle={styles.text}
                    selectedTextStyle={styles.text}
                    itemTextStyle={styles.text}
                    search
                    searchPlaceholder="Buscar categoria..."
                    value={selectedCategory}
                    onChange={item => {
                        setSelectedCategory(item.value);
                        setSelectedCategoryName(item.label);
                        onChange?.(item);
                    }}
                    disable={loading}
                />

                <Campo 
                    type="weight"
                    onChangeText={handleWeightChange}
                    value={peso}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Index')}
                >
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    dropdown: {
        width: 300,
        height: 50,
        fontSize: 5,
        borderRadius: 10,
        backgroundColor: "#EEF2ED",
        margin: 10,
    },
    text: { 
        fontSize: 15, 
        color: '#3D423D', 
        marginLeft: 14 
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
});


