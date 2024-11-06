import { StyleSheet, Text, View,TouchableOpacity, Modal, SafeAreaView, Animated, Easing} from 'react-native'
import React, { useRef, useState } from 'react'
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';


const SearchPopUp = ({
  buttonStyle,
  backgroundColor,
}) => {

  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const options = [
    {
      title: 'Buscar Post',
      icon: 'image-search-outline',
      action: ()=>{router.push('searchPost')},
    },
    {
      title: 'Buscar Perfil',
      icon: 'account-search-outline',
      action: ()=>{router.push('searchProfile')},
    }
  ]

  const resizeBox = (to) => {
    to === 1 && setVisible(true);
      Animated.timing(scale,{
        toValue:to,
        useNativeDriver:true,
        duration:200,
        easing:Easing.linear,
      }).start(() => to === 0 && setVisible(false))
  }
  return (
    <>
    <TouchableOpacity style={[styles.button, buttonStyle, { backgroundColor }]} 
    onPress={() => resizeBox(1)}
    >
      <Feather name="plus" size={20} color="black" ></Feather>
    </TouchableOpacity>
    <Modal transparent visible={visible}>
      <SafeAreaView 
        style={{flex:1}} 
        onTouchStart={ ()=> resizeBox(0)}>
          <Animated.View style={[styles.popup, {transform:[{scale}]}]}>
          <View style={styles.circle}>

          </View>
            {options.map((option, index)=>(
              <TouchableOpacity style={styles.option} key={index} onPress={ () => option.action()}>
                <MaterialCommunityIcons name={option.icon} size={26} color="black" />
                <Text style={{color:theme.colors.dark}}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

      </SafeAreaView>
    </Modal>
    </>
  )
}

export default SearchPopUp

const styles = StyleSheet.create({
  button: {
    alignSelf:'flex-start',
    height: heightPercentage(5, 5),
    width: heightPercentage(5, 5), 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightPercentage(5, 5) / 2, 
    borderWidth: 2,
    borderColor: 'black',
    borderBottomWidth: 4
  },
  popup:{
    borderRadius: theme.radius.xl,
    borderWidth: 2,       
    borderColor: "black",
    borderBottomWidth: 4,
    backgroundColor: theme.colors.LemonChiffon,
    width: heightPercentage(25),
    height: heightPercentage(14),
    top:heightPercentage(10),
    left:widthPercentage(44),
    justifyContent: 'center',
    alignItems: 'left',
  },
  option:{
    flexDirection:'row',
    justifyContent: 'left',
    alignItems: 'center',
    marginLeft: widthPercentage(4),
    gap: heightPercentage(1),
    paddingVertical: heightPercentage(1),
  },
  circle: {
    width: heightPercentage(6.14), 
    height: heightPercentage(0.5),
    borderRadius: 5, 
    backgroundColor: theme.colors.dark,
    left:widthPercentage(17),
    marginTop: heightPercentage(0.7)
  },
})

