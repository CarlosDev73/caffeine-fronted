import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { theme } from '../constants/theme.js';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import Fontisto from '@expo/vector-icons/Fontisto';

const SearchBar = (props) => {
  return (
    <View style={[styles.container, props.containerStyles && props.containerStyles]}>
      <TextInput
        style={[styles.input, props.inputStyle && props.inputStyle]}
        placeholderTextColor={theme.colors.dark}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    <Fontisto name="search" size={26} color="black" />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: heightPercentage(7, 2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.dark,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
    borderBottomWidth: 4
  },
  input: {
    flex: 1,
    fontSize: heightPercentage(2.5),
  },
});
