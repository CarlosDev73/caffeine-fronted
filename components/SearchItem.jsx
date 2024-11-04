import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const SearchItem = ({ nombre, usuario, imagen }) => {
  return (
    <View style={styles.container}>
      {/* Imagen circular */}
      <Image source={require('../assets/images/avatar.png')} style={styles.image} />
      
      {/* Información de contacto */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{nombre}</Text>
        <Text style={styles.username}>@{usuario}</Text>
      </View>
    </View>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Esto hace que sea circular
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
});
