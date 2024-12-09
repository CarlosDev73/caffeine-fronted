import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import { useRouter } from 'expo-router'
import AbsoluteButton from '../components/AbsoluteButton.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx';
import OptionsButtons from '../components/OptionsButtons.jsx';
import { createPost } from '../api/posts';
import * as SecureStore from 'expo-secure-store'

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SliderButton from '../components/SliderButton.jsx'

const CreatePost = () => {

    const router = useRouter();

    const availableTags = ['Git', 'C++', 'Python', 'Laravel', 'Redes', 'Desarrollo Móvil', 'JavaScript'];


    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [codeContent, setCodeContent] = useState('');
    const [tags, setTags] = useState([]);
    const [postImg, setPostImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('post');
    const handleTagSelection = (tag) => {
        setTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };
    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setPostImg(result.assets[0]);
        }
    };

    const handleCreatePost = async () => {
        if (!postTitle || !postContent || tags.length === 0 || !postImg || (type === 'issue' && !codeContent)) {
            ToastAndroid.show('Completa los campos y selecciona una imagen', ToastAndroid.SHORT);
            return;
        }


        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('content', postContent);
        formData.append('type', type); 
        formData.append('tags', tags.join(',')); // Convierte el array a un string separado por comas
        if (type === 'issue') {
            formData.append('codeContent', encodeURIComponent(codeContent));
        }
        if (postImg) {
            formData.append('postImg', {
                uri: postImg.uri,
                name: 'postImg.jpg',
                type: 'image/jpeg',
            });
        }

        console.log('FormData being sent:', formData);
        try {
            const response = await createPost(formData);
            ToastAndroid.show('Post creado exitosamente', ToastAndroid.SHORT);
            router.push('/feed'); // Redirige al feed
        } catch (error) {
            console.error('Error al crear el post:', error);
            Alert.alert('Error', error.message || 'Error al crear el post.');
        } finally {
            setIsLoading(false);
        }
    };



    const translateY = useSharedValue(300);

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 600 });
    }, []);

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
                            <Image source={require('../assets/images/avatar.png')} style={{ borderRadius: 100, borderWidth: 10 }} />
                            <View style={{ marginLeft: 7 }}>
                                <Text style={[{ fontWeight: theme.fonts.bold }]}>Lamborci Mona</Text>
                                <View style={{ backgroundColor: '#F4F5F7', borderRadius: theme.radius.md, padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: widthPercentage(24) }}>
                                    <AntDesign name="star" size={20} color="green" />
                                    <Text style={[{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(1.5) }]}>Expresso</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={{ marginBottom: heightPercentage(1), flexDirection: 'row', width: widthPercentage(87), justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: heightPercentage(3.5), fontWeight: theme.fonts.bold }}>
                                    Crear Post
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text>Issue</Text>
                                    <SliderButton onToggle={(isToggled) => setType(isToggled ? 'issue' : 'post')} />
                                </View>
                            </View>
                            <View style={{ paddingVertical: heightPercentage(1) }}>
                                <Input
                                    placeholder='Titulo de tu post'
                                    onChangeText={(text) => setPostTitle(text)}
                                    value={postTitle}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ flexDirection: 'row-reverse' }}
                                />
                                <Input
                                    placeholder='Código'
                                    onChangeText={(text) => setCodeContent(text)}
                                    value={codeContent}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ height: 'fit-content', marginVertical: heightPercentage(2) }}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <Input
                                    placeholder='Contenido'
                                    onChangeText={(text) => setPostContent(text)}
                                    value={postContent}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ height: 'fit-content', }}
                                    multiline={true}
                                    numberOfLines={7}
                                />
                            </View>
                            <View>
                                <OptionsButtons tags={availableTags} onSelectTag={handleTagSelection} selectedTags={tags} />
                            </View>
                            <Pressable onPress={handleImagePicker}>
                                <View style={styles.postPicContainer}>
                                    {postImg ? (
                                        <Image source={{ uri: postImg.uri }} style={styles.postPic} />
                                    ) : (
                                        <Image source={require('../assets/images/addImage.png')} style={styles.postPic} />
                                    )}
                                    <Text style={styles.postPicText}>Adjuntar Imágenes</Text>
                                </View>

                            </Pressable>
                            <View style={{ marginVertical: heightPercentage(3) }}>
                                <Button
                                    title='Publicar'
                                    buttonStyle={styles.publicBtn}
                                    onPress={handleCreatePost}
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

export default CreatePost;

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
    postPicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentage(2),
        marginBottom: heightPercentage(2),
    },
    postPic: {
        width: widthPercentage(20),
        height: widthPercentage(20),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
    postPicText: {
        marginLeft: widthPercentage(4),
        fontSize: heightPercentage(2),
    },
    text: {

    },
    minText: {}
})