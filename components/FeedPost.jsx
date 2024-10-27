import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../constants/theme'
import { heightPercentage, widthPercentage } from '../helpers/common'
import { useRouter } from 'expo-router'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';

const FeedPost = ({
}) => {

  const router = useRouter();

  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [comments, setComments] = useState(0);
  const [points, setPoints] = useState(0);
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-between'}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../assets/images/avatar.png')} style={{ borderRadius: 100, borderWidth: 10}}/>
          <Text style={[styles.text, {marginLeft: 7}]}>Lamborci Mona</Text>
          <Text style={[styles.minText]}>12 Mar</Text>
        </TouchableOpacity>
        <Pressable>
          <Feather name="more-vertical" size={20} color="black" />
        </Pressable>
      </View>
      <Pressable onPress={()=>{router.push('post')}} >
        <View>
          <Text style={[styles.text, {fontSize: heightPercentage(3.4)}]}>I'm post title, Please 2 line only...</Text>
          <Text style={{fontSize: heightPercentage(2.5), marginBottom: 10}}>I have seen examples of connecting to a remote server with Net::SSH</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Image source={require('../assets/images/example/post1.png')} style={{ borderRadius: 17, borderWidth: 10}}/>
        </View>
      </Pressable>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
        <Pressable style={[styles.reactions]}>
            <MaterialCommunityIcons name="comment-outline" size={20} color="black" />
            <Text style={[styles.reactions.textStyle]}>{comments}</Text>
        </Pressable>
        <Pressable style={[styles.reactions]} onPress={ () => { setLikes(likes+1) }}>
            <Octicons name="heart" size={19} color="black" />
            <Text style={[styles.reactions.textStyle]}>{likes}</Text>
        </Pressable>
        <Pressable style={[styles.reactions]} onPress={ () => { setPoints(points+1) }}>
            <Feather name="star" size={20} color="black" />
            <Text style={[styles.reactions.textStyle]}>{points}</Text>
        </Pressable>
        <Pressable>
          <Feather name="share" size={20} color="black" />
        </Pressable>
      </View>
    </View>
    
  )
}

export default FeedPost

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
    borderColor: "black",
    borderBottomWidth: 5
  },
  icon: {

  },
  button:{
    height: heightPercentage(7,7),
    width: widthPercentage(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  text:{
    fontSize: heightPercentage(2),
    fontWeight: theme.fonts.bold,
  },
  minText:{
    fontSize: heightPercentage(1.4),
    fontWeight: theme.fonts.bold,
    color: 'gray',
    marginLeft: 12
  },
  active: {
    color: 'black'
  },

  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    textStyle: {
      marginLeft: 4, 
      fontWeight: theme.fonts.bold
    }
  },
})