import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import { useRouter, useLocalSearchParams } from 'expo-router'
import AbsoluteButton from '../components/AbsoluteButton.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx';
import OptionsButtons from '../components/OptionsButtons.jsx';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SliderButton from '../components/SliderButton.jsx'

import { fetchPostById } from '../api/posts';


const editMyPost = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
    const tags = [
        'Git', 'C++', 'Python', 'Laravel', 'Redes', 'Desarrollo Móvil', 'JavaScript'
    ];

    const handleTag = (tag) => { };

    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [comments, setComments] = useState(0);
    const [points, setPoints] = useState(0);
    const [likes, setLikes] = useState(0);

    const translateY = useSharedValue(300);

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 600 });
        const loadPost = async () => {
            try {
              if (!id) throw new Error('Post ID is missing');
              //  console.log('Fetching post by ID:', id);
              const fetchedPost = await fetchPostById(id); // Fetching the post by ID
              //  console.log('Fetched Post:', fetchedPost);
              setPost(fetchedPost); // Set the fetched post data
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to fetch post data.');
            } finally {
              setLoading(false);
            }
          };
      
          loadPost();
        }, [id]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <ScreenWrapper>
                <View style={styles.exitBtn}>
                    <AbsoluteButton
                        child={<Feather name="x" size={30} color="black" />}
                        buttonStyle={{ top: -10, backgroundColor: 'white' }}
                        onPress={() => { router.push('feed') }}
                    />
                </View>
                <Animated.View style={[animatedStyle, styles.content]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/images/pic.png')} style={{ borderRadius: 100, borderWidth: 10, width:30 , height:30 }} />
                            <View style={{ marginLeft: 7 }}>
                                <Text style={[{ fontWeight: theme.fonts.bold }]}>Lamborci Mona</Text>
                                <View style={{ backgroundColor: '#F4F5F7', borderRadius: theme.radius.md, padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: widthPercentage(24) }}>
                                    <AntDesign name="star" size={20} color="green" />
                                    <Text style={[{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(1.5) }]}>Capuchino</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={{ marginBottom: heightPercentage(1), flexDirection: 'row', width: widthPercentage(87), justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: heightPercentage(3.5), fontWeight: theme.fonts.bold }}>
                                    Editar Post
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text>Issue</Text>
                                    <SliderButton />
                                </View>
                            </View>
                            <View style={{ paddingVertical: heightPercentage(1) }}>
                                <Input
                                    placeholder={post.title}
                                    onChangeText={() => { }}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ flexDirection: 'row-reverse' }}
                                />
                                <Input
                                    placeholder='Código'
                                    onChangeText={() => { }}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ height: 'fit-content', marginVertical: heightPercentage(2) }}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <Input
                                    placeholder={post.content}
                                    onChangeText={() => { }}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ height: 'fit-content', }}
                                    multiline={true}
                                    numberOfLines={7}
                                />
                            </View>
                            <View>
                                <OptionsButtons tags={tags} onSelectTag={handleTag} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: heightPercentage(1) }}>
                                <Image source={require('../assets/images/addImage.png')} style={{ borderRadius: 10, borderWidth: 2, borderColor: '#000' }} />
                                <Text style={{ marginHorizontal: 10, fontSize: heightPercentage(2) }}>Adjuntar Imágenes</Text>
                            </View>
                            <View style={{ marginVertical: heightPercentage(3) }}>
                                <Button
                                    title='Publicar'
                                    buttonStyle={styles.publicBtn}
                                    onPress={() => { }}
                                    backgroundColor={theme.colors.primary}
                                    textColor='black'
                                    textStyle={{ fontWeight: theme.fonts.extraBold }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </Animated.View>
            </ScreenWrapper>
        </View>
  )
}

export default editMyPost

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
publicBtn: {
    width: 'fit-content',
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: heightPercentage(7),
    borderRadius: theme.radius.md,
    borderBottomWidth: 5
},
text: {

},
minText: {}
})