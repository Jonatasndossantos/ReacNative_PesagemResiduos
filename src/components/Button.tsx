import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  icon: ReactNode;
  label: string;
  onPress: () => void;
}

export function Button({ icon, label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    alignItems: "center",
    backgroundColor: "#EEF2ED",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    elevation: 4,
  },
  icon: {
    width: 32,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
}); 