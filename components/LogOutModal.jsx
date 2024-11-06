import { StyleSheet, View, Text, Modal, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import Button from './Button';
import { router } from 'expo-router';

const LogOutModal = ({ visible, onClose}) => {

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: true,
        duration: 200,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
        easing: Easing.linear,
      }).start(() => onClose());
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible}>
      <TouchableOpacity style={styles.overlay} onPress={() => onClose()}>
        <Animated.View style={[styles.popup, { transform: [{ scale }] }]}>

        <View style={{gap:5}}>
          <Text style={styles.title}>¿Estás seguro de que desea cerrar sesion?</Text>
          <Text style={styles.punchline}>¡No te vayas! Prometemos no enviar más notificaciones de assembler... por hoy...</Text>
        </View>

      {/*Footer*/}
        <View style={styles.footer}>
          <Button
            title='Cancelar'
            buttonStyle={styles.btnDelete}
            onPress={() => onClose()}
            backgroundColor={'white'}
            textColor='black'
            textStyle={{ fontSize: heightPercentage(2)}}
          />  
          <Button
            title='Cerrar sesión'
            buttonStyle={styles.btnDelete}
            onPress={() => router.push('login')}
            backgroundColor={theme.colors.textTitles}
            textColor='white'
            textStyle={{ fontSize: heightPercentage(2)}}
          /> 
        </View>

        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
};

export default LogOutModal; 

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    borderRadius: theme.radius.xl,
    borderWidth: 2,
    borderColor: 'black',
    borderBottomWidth: 4,
    backgroundColor: theme.colors.LemonChiffon,
    width: '80%',
    padding: 20,
    alignItems: 'center',
  },

  title:{
    color: theme.colors.textTitles, 
    fontSize: heightPercentage(2.5),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold
  },
  punchline:{
    textAlign: 'center',
    paddingHorizontal: widthPercentage(10),
    fontSize: heightPercentage(2),
    color: theme.colors.text
  },

  footer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnDelete:{
    width: widthPercentage(30),
    marginHorizontal:widthPercentage(3),
    marginVertical: widthPercentage(3),
  }
})