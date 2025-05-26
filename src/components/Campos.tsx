import DateTimePicker from '@react-native-community/datetimepicker';
import { ReactNode, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface CampoProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    title?: string;
    icon?: ReactNode;
    type?: 'text' | 'date' | 'weight';
    value?: string | Date;
    onChangeText?: (value: string) => void;
    onChangeDate?: (date: Date) => void;
}

export function Campo({ 
    title, 
    icon, 
    type = 'text',
    value,
    onChangeText,
    onChangeDate,
    ...rest 
}: CampoProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(
        value instanceof Date ? value : new Date()
    );

    const formatWeight = (text: string) => {
        // Remove any non-digit characters except decimal point
        const cleanedText = text.replace(/[^\d.]/g, '');
        
        // Ensure only one decimal point
        const parts = cleanedText.split('.');
        if (parts.length > 2) {
            return value as string; // Return previous value if multiple decimal points
        }
        
        // Format to 3 decimal places if there's a decimal point
        if (parts.length === 2) {
            if (parts[1].length > 3) {
                return `${parts[0]}.${parts[1].slice(0, 3)}`;
            }
        }
        
        return cleanedText;
    };

    const handleWeightChange = (text: string) => {
        const formattedWeight = formatWeight(text);
        onChangeText?.(formattedWeight);
    };

    const handleDateChange = (event: any, date?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) {
            setSelectedDate(date);
            const formattedDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            onChangeText?.(formattedDate);
            onChangeDate?.(date);
        }
    };

    const renderInput = () => {
        switch (type) {
            case 'date':
                return (
                    <View style={styles.dateContainer}>
                        <TouchableOpacity 
                            style={styles.dateButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            {icon}
                            <Text style={styles.dateText}>
                                {value ? value.toString() : 'Selecione a data'}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={handleDateChange}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>
                );
            case 'weight':
                return (
                    <View style={styles.weightContainer}>
                        <TextInput
                            {...rest}
                            style={[styles.input, styles.weightInput]}
                            value={value as string}
                            onChangeText={handleWeightChange}
                            keyboardType="decimal-pad"
                            placeholder="0.000"
                        />
                        <Text style={styles.weightUnit}>kg</Text>
                    </View>
                );
            default:
                return (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {icon}
                        <TextInput 
                            style={styles.input} 
                            value={value as string}
                            onChangeText={onChangeText}
                            {...rest} 
                        />
                    </View>
                );
        }
    };

    return (
        <View style={styles.cmp}>
            {title && <Text style={styles.text}>{title}</Text>}
            {renderInput()}
        </View>
    );
}

const styles = StyleSheet.create({
    cmp: {
        width: 300,
        height: 50,
        fontSize: 8,
        borderRadius: 10,
        backgroundColor: "#EEF2ED",
        margin: 10,
        justifyContent: "center",
    },
    text: {
        marginLeft: "5%",
        color: "#3D423D",
        marginBottom: 4,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        color: "#3D423D",
        fontSize: 16,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        height: 40,
    },
    dateText: {
        flex: 1,
        color: "#3D423D",
        fontSize: 16,
        marginLeft: 10,
    },
    weightContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    weightInput: {
        textAlign: 'right',
        paddingRight: 5,
    },
    weightUnit: {
        color: "#3D423D",
        fontSize: 16,
        marginLeft: 5,
        marginRight: 10,
    }
});