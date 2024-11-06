import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import { useRouter } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';

import ActionModal from './ActionModal'; // Asegúrate de que el componente ActionModal esté en la misma ruta o ajusta el import

const FeedPost = () => {
  const router = useRouter();

  const [comments, setComments] = useState(0);
  const [points, setPoints] = useState(0);
  const [likes, setLikes] = useState(0);

  // Estado para controlar la visibilidad del modal de opciones
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  // Definir acciones para el botón de opciones (tres puntos)
  const optionsActions = [
    {
      text: 'Editar',
      icon: <Feather name="edit" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Editar opción seleccionada');
      },
    },
    {
      text: 'Eliminar',
      icon: <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Eliminar opción seleccionada');
      },
    },
    {
      text: 'Compartir',
      icon: <Feather name="share" size={24} color="black" />,
      onPress: () => {
        setOptionsModalVisible(false);
        console.log('Compartir opción seleccionada');
      },
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header del Post */}
      <View style={styles.header}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
          <Text style={styles.text}>Lamborci Mona</Text>
          <Text style={styles.minText}>12 Mar</Text>
        </TouchableOpacity>
        {/* Botón de opciones */}
        <Pressable onPress={() => setOptionsModalVisible(true)}>
          <Feather name="more-vertical" size={20} color="black" />
        </Pressable>
      </View>

      {/* Contenido del Post */}
      <Pressable onPress={() => router.push('post')}>
        <View>
          <Text style={styles.title}>I'm post title, Please 2 line only...</Text>
          <Text style={styles.description}>I have seen examples of connecting to a remote server with Net::SSH</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/example/post1.png')} style={styles.postImage} />
        </View>
      </Pressable>

      {/* Reacciones */}
      <View style={styles.reactionsContainer}>
        <Pressable style={styles.reactions}>
          <MaterialCommunityIcons name="comment-outline" size={20} color="black" />
          <Text style={styles.reactionsText}>{comments}</Text>
        </Pressable>

        <Pressable style={styles.reactions} onPress={() => setLikes(likes + 1)}>
          <Octicons name="heart" size={19} color="black" />
          <Text style={styles.reactionsText}>{likes}</Text>
        </Pressable>

        <Pressable style={styles.reactions} onPress={() => setPoints(points + 1)}>
          <Feather name="star" size={20} color="black" />
          <Text style={styles.reactionsText}>{points}</Text>
        </Pressable>

        <Pressable>
          <Feather name="share" size={20} color="black" />
        </Pressable>
      </View>

      {/* Modal de opciones */}
      <ActionModal visible={optionsModalVisible} onClose={() => setOptionsModalVisible(false)} actions={optionsActions} />
    </View>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 7,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    width: widthPercentage(90),
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl,
    borderWidth: 2,
    borderColor: 'black',
    borderBottomWidth: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  avatar: {
    borderRadius: 100,
    borderWidth: 10,
  },
  text: {
    fontSize: heightPercentage(2),
    fontWeight: theme.fonts.bold,
    marginLeft: 7,
  },
  minText: {
    fontSize: heightPercentage(1.4),
    fontWeight: theme.fonts.bold,
    color: 'gray',
    marginLeft: 12,
  },
  title: {
    fontSize: heightPercentage(3.4),
  },
  description: {
    fontSize: heightPercentage(2.5),
    marginBottom: 10,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  postImage: {
    borderRadius: 17,
    borderWidth: 10,
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
