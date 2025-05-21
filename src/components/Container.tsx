import { ReactNode } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

interface ContainerProps {
  children: ReactNode;
  title?: string;
  showLogo?: boolean;
}

export function Container({ children, title = "Gestão de Resíduos", showLogo = true }: ContainerProps) {
  return (
    <View>
      <ImageBackground source={require('../../assets/images/Fundo.jpg')} resizeMode="cover" style={styles.container}>
        {showLogo && (
          <View style={styles.header}>
            <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        <View style={styles.card}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 10,
    marginTop: 70,
    marginBottom: 70,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    color: "#2B5B3F",
    fontWeight: "bold",
  },
  card: {
    width: 350,
    height: 400,
    borderRadius: 25,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    gap: 20,
  },
}); 