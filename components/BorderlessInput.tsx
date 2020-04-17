import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

interface Props extends TextInputProps {}

export const BorderlessInput: React.FC<Props> = props => {
  return <TextInput style={styles.input} autoFocus {...props} />;
};

const styles = StyleSheet.create({
  input: {
    fontSize: 24,
  },
});
