import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ResidueItemProps {
    data: {
        id: number;
        data: string;
        categoria: string;
        peso: number;
    };
    onEdit?: () => void;
    onDelete?: () => void;
}

export function ResidueItem({ data, onEdit, onDelete }: ResidueItemProps) {
    const formattedWeight = data.peso.toFixed(3).replace('.', ',');

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.date}>{data.data}</Text>
                    <Text style={styles.category}>{data.categoria}</Text>
                </View>
                <Text style={styles.weight}>{formattedWeight}kg</Text>
            </View>
            <View style={styles.iconsRow}>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <MaterialIcons name="delete" size={24} color="#222" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <MaterialIcons name="edit" size={24} color="#222" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    date: {
        fontSize: 13,
        color: '#666',
        marginBottom: 2,
    },
    category: {
        fontSize: 16,
        color: '#2B5B3F',
        fontWeight: '600',
    },
    weight: {
        fontSize: 16,
        color: '#2B5B3F',
        fontWeight: '500',
        textAlign: 'right',
    },
    iconsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
        gap: 16,
    },
    iconBtn: {
        marginLeft: 8,
    },
});