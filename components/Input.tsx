import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  return (
    <TextInput 
      style={styles.input}
      placeholderTextColor="#666"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#EEF2ED',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    elevation: 4,
  },
}); 