import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export default function AppTextInput({style, width, ...otherProps}) {
  return (
    <View style={[styles.container, {width}]}>
      <TextInput placeholderTextColor="#000" style={[style]} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
