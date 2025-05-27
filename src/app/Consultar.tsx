import { Container } from '@/components/Container';
import { ResidueItem } from '@/components/ResidueItem';
import { deleteWasteRecord, fetchCategories, fetchWasteRecords } from '@/services/api';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface WasteRecord {
    id: number;
    data: string;
    categoria: string;
    peso: number;
    atualizado_em: string;
}

export default function Consultar() {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState<WasteRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<WasteRecord[]>([]);
    const [categories, setCategories] = useState<Array<{ label: string; value: string }>>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    
    const navigation = useNavigation();

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const [recordsData, categoriesData] = await Promise.all([
                fetchWasteRecords(),
                fetchCategories()
            ]);

            // Sort records by date (most recent first)
            const sortedRecords = recordsData.sort((a, b) => {
                const dateA = new Date(a.data.split('/').reverse().join('-'));
                const dateB = new Date(b.data.split('/').reverse().join('-'));
                return dateB.getTime() - dateA.getTime();
            });

            setRecords(sortedRecords);
            setFilteredRecords(sortedRecords);

            const formattedCategories = categoriesData.map(cat => ({
                label: cat.nome,
                value: cat.nome
            }));
            setCategories(formattedCategories);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCategoryFilter = (category: string | null) => {
        setSelectedCategory(category);
        if (category) {
            const filtered = records.filter(record => record.categoria === category);
            setFilteredRecords(filtered);
        } else {
            setFilteredRecords(records);
        }
    };

    const handleRefresh = () => {
        loadData();
    };

    async function handleDelete(id: number, categoria: string) {
        Alert.alert(
            'Confirmar exclusão',
            `Tem certeza que deseja excluir o registro de ${categoria}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteWasteRecord(id);
                            await loadData();
                            Alert.alert('Sucesso', 'Registro excluído com sucesso!');
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível excluir o registro');
                        }
                    },
                },
            ]
        );
    }

    if (loading) {
        return (
            <Container card={false}>
                <ActivityIndicator size="large" color="#2B5B3F" />
            </Container>
        );
    }

    return (
        <Container card={false} title="Registros de Resíduos">
            <View style={styles.card}>
                {/* Header - Fixed */}
                <View style={styles.header}>
                    <View style={styles.filterContainer}>
                        <Dropdown
                            style={styles.dropdown}
                            data={[{ label: 'Todas as categorias', value: '' }, ...categories]}
                            labelField="label"
                            valueField="value"
                            placeholder="Filtrar por categoria"
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            value={selectedCategory}
                            onChange={item => handleCategoryFilter(item.value || null)}
                            renderLeftIcon={() => (
                                <Feather name="filter" size={20} color="#2B5B3F" style={styles.icon} />
                            )}
                        />
                    </View>
                </View>

                {/* Content - Scrollable */}
                <View style={styles.content}>
                    <FlatList
                        data={filteredRecords}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <ResidueItem 
                                data={item}
                                onEdit={() => {
                                    // Navigate to update page - this will be fixed when navigation types are updated
                                    (navigation as any).navigate('Atualizar', { item: JSON.stringify(item) });
                                }}
                                onDelete={() => handleDelete(item.id, item.categoria)}
                            />
                        )}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
                            </View>
                        )}
                        refreshing={loading}
                        onRefresh={handleRefresh}
                    />
                </View>

                {/* Footer - Fixed */}
                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('Index')}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 350,
        height: "85%",
        borderRadius: 25,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        overflow: 'hidden',
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: 1,
    },
    content: {
        flex: 1,
    },
    footer: {
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    filterContainer: {
        marginBottom: 16,
    },
    dropdown: {
        height: 50,
        backgroundColor: '#EEF2ED',
        borderRadius: 10,
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 8,
    },
    placeholderStyle: {
        color: '#666666',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#2B5B3F',
        fontSize: 16,
    },
    list: {
        padding: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#666666',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2B5B3F',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});