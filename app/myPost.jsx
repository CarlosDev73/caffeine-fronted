import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { widthPercentage, heightPercentage } from '../helpers/common.js';
import { theme } from '../constants/theme.js';
import { useRouter } from 'expo-router';
import AbsoluteButton from '../components/AbsoluteButton.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import CommentModal from '../components/CommentModal';
import ActionModal from '../components/ActionModal'; // Asegúrate de importar ActionModal correctamente
import DeleteConfirmationModal  from '../components/DeleteConfirmationModal.jsx'// here

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const Post = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false); // Estado para ActionModal
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal status to confirm delete

  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [comments, setComments] = useState(0);
  const [points, setPoints] = useState(0);
  const [likes, setLikes] = useState(0);

  const translateY = useSharedValue(300);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const sampleComments = [
    { avatar: '../assets/images/charlie.jpg', date: '12 March, 20', text: 'Tuve ese mismo problema en mi equipo y resultó ser un error de la terminal de windows' },
    { avatar: '../assets/images/charlie.jpg', date: '12 March, 20', text: '¡Tengo el mismo problema! Si encuentras una solución por favor compartela' },
    { avatar: '../assets/images/charlie.jpg', date: '12 March, 20', text: 'Tuve ese mismo problema en mi equipo y resultó ser un error de la terminal de windows' },
  ];


 

  // Acciones para el ActionModal de opciones
  const optionsActions = [
    {
      text: 'Editar',
      icon: <Feather name="edit" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        router.push('editMyPost');
        // Agregar lógica de edición aquí
      },
    },
    {
      text: 'Eliminar',
      icon: <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        setIsModalVisible(true);
        // Agregar lógica de eliminación aquí
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenWrapper>
        <View style={styles.exitBtn}>
          <AbsoluteButton 
            child={<Feather name="x" size={30} color="black" />} 
            buttonStyle={{ top: -10, backgroundColor: 'white' }} 
            onPress={() => { router.push('profile') }} 
          />
        </View>
        <Animated.View style={[animatedStyle]}>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/images/pic.png')} style={{ borderRadius: 100, borderWidth: 10, width:30 , height:30 }} />
                <View style={{ marginLeft: 7 }}>
                  <Text style={[{ fontWeight: theme.fonts.bold }]}>Katrisa Feona</Text>
                  <View style={styles.statusContainer}>
                    <AntDesign name="star" size={20} color="green" />
                    <Text style={[{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(1.5) }]}>Capuchino</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Botón de opciones (tres puntos) */}
              <Pressable onPress={() => setOptionsModalVisible(true)}>
                <Feather name="more-vertical" size={20} color="black" />
              </Pressable>
            </View>
            <View style={{flex:1}}>
              <ScrollView>
                <Text style={styles.title}>Importancia del Modelo OSI en la Actualidad</Text>
                <View style={styles.dateTags}>
                  <Text>21 Marzo, 2024</Text>
                  <Text>Redes, Modelo OSI</Text>
                </View>
                <View style={styles.imageTextContainer}>
                  <Image source={require('../assets/images/example/post1.png')} style={styles.postImage}/>
                  <Text style={styles.description}>Actualmente el avance en la infraestructura de redes hace necesario la contemplación de teorías antiguas como la del modelo OSI para realizar un análisis exhaustivo de la misma.</Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.reactionsSection}>
              <View style={styles.reactionsContainer}>
                <Pressable style={styles.reactions} onPress={() => setModalVisible(true)}>
                  <MaterialCommunityIcons name="comment-outline" size={20} color="black" />
                  <Text style={styles.reactionsText}>{comments}</Text>
                </Pressable>
                <Pressable style={styles.reactions} onPress={() => setLikes(likes + 1)}>
                  <Octicons name="heart" size={19} color="black" />
                  <Text style={styles.reactionsText}>{likes}</Text>
                </Pressable>
                <Pressable style={styles.reactions}>
                  <Feather name="share" size={20} color="black" />
                  <Text style={styles.reactionsText}>{points}</Text>
                </Pressable>
                <Pressable style={styles.reactions} onPress={() => setPoints(points + 1)}>
                  <Feather name="star" size={20} color="black" />
                  <Text style={styles.reactionsText}>{points}</Text>
                </Pressable>
              </View>
              <Input
                icon={<FontAwesome5 name="comment" size={24} color="black" />}
                placeholder='Escribe un comentario...'
                onChangeText={() => {}}
                inputStyle={{ fontSize: heightPercentage(1.5) }}
                containerStyles={{flexDirection: 'row-reverse'}} 
              />
            </View>
          </View>
        </Animated.View>
      </ScreenWrapper>
      <CommentModal visible={modalVisible} onClose={() => setModalVisible(false)} comments={sampleComments} />
      <ActionModal visible={optionsModalVisible} onClose={() => setOptionsModalVisible(false)} actions={optionsActions} />
      <DeleteConfirmationModal visible={isModalVisible} onClose={() => setIsModalVisible(false)}/>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#bababc',
    paddingHorizontal: widthPercentage(4),
    height: heightPercentage(100)
  },
  exitBtn: {
    width: widthPercentage(100), 
    height: heightPercentage(10), 
    flexDirection: 'row', 
    justifyContent: 'center', 
    backgroundColor: 'transparent'
  },
  content: {
    flex: 1,
    height: heightPercentage(100),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: 'black',
    borderTopWidth: 5,
    borderWidth: 2,
    paddingHorizontal: widthPercentage(5)
  },
  statusContainer: {
    backgroundColor: '#F4F5F7',
    borderRadius: theme.radius.md,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: widthPercentage(24),
  },
  followBtn: {
    width: 'fit-content', 
    paddingVertical: 3, 
    paddingHorizontal: 10, 
    height: heightPercentage(4.5), 
    borderRadius: theme.radius.md, 
    borderBottomWidth: 3
  },
  title: {
    fontSize: heightPercentage(5),
    fontWeight: theme.fonts.bold,
  },
  dateTags: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageTextContainer: {
    paddingVertical: heightPercentage(2)
  },
  postImage: {
    borderRadius: 17,
    borderWidth: 1
  },
  description: {
    marginTop: 10
  },
  reactionsSection: {
    height: heightPercentage(25)
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionsText: {
    marginLeft: 4,
    fontWeight: theme.fonts.bold,
  },
});
