import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ResidueItemProps {
    data: {
        id: number;
        data: string;
        categoria: string;
        peso: string;
    };
    onPress?: () => void;
}

export function ResidueItem({ data, onPress }: ResidueItemProps) {
    // Format weight to always show 3 decimal places
    const formattedWeight = Number(data.peso).toFixed(3);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.date}>{data.data}</Text>
                    <Text style={styles.category}>{data.categoria}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.weight}>{formattedWeight}kg</Text>
                    <AntDesign name="right" size={20} color="#2B5B3F" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    category: {
        fontSize: 16,
        color: '#2B5B3F',
        fontWeight: '600',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    weight: {
        fontSize: 16,
        color: '#2B5B3F',
        fontWeight: '500',
    },
}); 