import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

function Button({title, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: '#3C3C3C'}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3c3c3c',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
    width: '50%',
    marginVertical: 10,
    top: 200,
  },
});

export default Button;
