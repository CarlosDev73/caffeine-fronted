import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
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

import { fetchPostById, updatePost } from '../api/posts';


const editMyPost = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const availableTags = ['Git', 'C++', 'Python', 'Laravel', 'Redes', 'Desarrollo Móvil', 'JavaScript'];

    const handleTag = (tag) => { };

    const [post, setPost] = useState({});
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [tags, setTags] = useState([]);
    const [postImg, setPostImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('post');

    const translateY = useSharedValue(300);

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 600 });
        const loadPost = async () => {
            try {
                const fetchedPost = await fetchPostById(id); // Fetching the post
                setPostTitle(fetchedPost.title);
                setPostContent(fetchedPost.content);
                setTags(fetchedPost.tags || []);
                setType(fetchedPost.type || 'post');
                if (fetchedPost.media?.secure_url) {
                    setPostImg({ uri: fetchedPost.media.secure_url });
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch post data.');
            }
        };
        loadPost();
    }, [id]);

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
    const handleUpdatePost = async () => {
        if (!postTitle || !postContent || tags.length === 0 || !postImg) {
            ToastAndroid.show('Title and content are required.', ToastAndroid.SHORT);
            return;
        }
        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('content', postContent);
        formData.append('type', type);
        formData.append('tags', tags.join(',')); // Convert array to string

        if (postImg) {
            formData.append('postImg', {
                uri: postImg.uri,
                name: 'postImg.jpg',
                type: 'image/jpeg',
            });
        }
        console.log('FormData being sent:', formData);
        try {
            const response = await updatePost(id, formData); // Call updatePost API
            ToastAndroid.show('Post actualizado exitosamente', ToastAndroid.SHORT);
            router.push('/feed'); // Redirige al feed
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update the post.');
        } finally {
            setIsLoading(false);
        }
    };

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
                            <Image source={require('../assets/images/pic.png')} style={{ borderRadius: 100, borderWidth: 10, width: 30, height: 30 }} />
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
                                    <SliderButton onToggle={(isToggled) => setType(isToggled ? 'issue' : 'post')} isToggled={type === 'issue'} />
                                </View>
                            </View>
                            <View style={{ paddingVertical: heightPercentage(1) }}>
                                <Input
                                    placeholder={post.title}
                                    onChangeText={(text) => setPostTitle(text)}
                                    value={postTitle}
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
                                    onChangeText={(text) => setPostContent(text)}
                                    value={postContent}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ height: 'fit-content', }}
                                    multiline={true}
                                    numberOfLines={7}
                                />
                            </View>
                            <View>
                                <OptionsButtons tags={availableTags} onSelectTag={(tag) => setTags([...tags, tag])} selectedTags={tags} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: heightPercentage(1) }}>
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
                            </View>
                            <View style={{ marginVertical: heightPercentage(3) }}>
                                <Button
                                    title='Guardar cambios'
                                    buttonStyle={styles.publicBtn}
                                    onPress={handleUpdatePost}
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