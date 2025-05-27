import { Container } from '@/components/Container';
import { fetchWasteRecords } from '@/services/api';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useNavigation } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Configuracoes() {
    const navigation = useNavigation();
    const [isExporting, setIsExporting] = useState(false);

    const handleConnectGoogle = () => {
        Alert.alert(
            'Conectar com Google',
            'Esta funcionalidade permite sincronizar seus dados com o Google Sheets. Deseja continuar?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Conectar', 
                    onPress: () => {
                        // Aqui você pode implementar a autenticação com Google
                        Alert.alert('Info', 'Funcionalidade em desenvolvimento');
                    }
                }
            ]
        );
    };

    const handleExportCsv = async () => {
        try {
            setIsExporting(true);
            const records = await fetchWasteRecords();
            const csvHeader = 'ID,Data,Categoria,Peso,Atualizado em\n';
            const csvData = records.map(record =>
                `${record.id},"${record.data}","${record.categoria}",${record.peso},"${record.atualizado_em}"`
            ).join('\n');
            const csvContent = csvHeader + csvData;

            const path = FileSystem.documentDirectory + 'residuos.csv';
            await FileSystem.writeAsStringAsync(path, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
            await Sharing.shareAsync(path);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível exportar o CSV');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPdf = async () => {
        try {
            setIsExporting(true);
            const records = await fetchWasteRecords();
            const html = `
              <html>
                <body>
                  <h1>Relatório de Resíduos</h1>
                  <table border="1" style="width:100%;text-align:left;">
                    <tr><th>ID</th><th>Data</th><th>Categoria</th><th>Peso (kg)</th></tr>
                    ${records.map(r => `
                      <tr>
                        <td>${r.id}</td><td>${r.data}</td><td>${r.categoria}</td><td>${r.peso.toFixed(3)}</td>
                      </tr>
                    `).join('')}
                  </table>
                </body>
              </html>
            `;
            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível exportar o PDF');
        } finally {
            setIsExporting(false);
        }
    };

    const handleAboutApp = () => {
        Alert.alert(
            'Sobre o App',
            'Gestão de Pesagem de Resíduos\n\nVersão: 1.0.0\n\nDesenvolvido para facilitar o controle e monitoramento de resíduos, permitindo registro, consulta e exportação de dados de forma simples e eficiente.',
            [{ text: 'OK' }]
        );
    };

    return (
        <Container title="Configurações">
            <View style={styles.container}>
                {/* Seção Integração */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Integração com Planilha</Text>
                    <Text style={styles.sectionSubtitle}>Conectar com planilha</Text>
                    
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleConnectGoogle}
                    >
                        <MaterialIcons name="cloud" size={24} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Conectar com o Google</Text>
                    </TouchableOpacity>
                </View>

                {/* Seção Exportar */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.button} onPress={handleExportCsv} disabled={isExporting}>
                        <MaterialIcons name="table-chart" size={24} color="#FFF" />
                        {isExporting ? (
                            <>
                                <ActivityIndicator size="small" color="#FFF" style={{ marginLeft: 10 }} />
                                <Text style={styles.buttonText}>Exportando...</Text>
                            </>
                        ) : (
                            <Text style={styles.buttonText}>Exportar CSV</Text>
                        )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button} onPress={handleExportPdf} disabled={isExporting}>
                        <MaterialIcons name="picture-as-pdf" size={24} color="#FFF" />
                        {isExporting ? (
                            <>
                                <ActivityIndicator size="small" color="#FFF" style={{ marginLeft: 10 }} />
                                <Text style={styles.buttonText}>Exportando...</Text>
                            </>
                        ) : (
                            <Text style={styles.buttonText}>Exportar PDF</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Seção Sobre */}
                <View style={styles.section}>
                    <Text style={styles.aboutTitle}>Sobre o App</Text>
                    <TouchableOpacity onPress={handleAboutApp}>
                        <Text style={styles.aboutSubtitle}>Gestão de Pesagem</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão Voltar */}
                <TouchableOpacity 
                    style={styles.backButton}
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
        justifyContent: 'space-between',
    },
    section: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2B5B3F',
        marginBottom: 8,
        textAlign: 'center',
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2B5B3F',
        width: 300,
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonDisabled: {
        backgroundColor: '#999999',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    exportInfo: {
        fontSize: 16,
        color: '#2B5B3F',
        fontWeight: '600',
        textAlign: 'center',
    },
    aboutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B5B3F',
        marginBottom: 8,
        textAlign: 'center',
    },
    aboutSubtitle: {
        fontSize: 16,
        color: '#2B5B3F',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    backButton: {
        backgroundColor: '#2B5B3F',
        width: 300,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
