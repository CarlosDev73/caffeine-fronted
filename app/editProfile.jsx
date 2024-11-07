import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { widthPercentage, heightPercentage } from '../helpers/common.js'
import { theme } from '../constants/theme.js'
import { useRouter } from 'expo-router'
import AbsoluteButton from '../components/AbsoluteButton.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx';
import OptionsButtons from '../components/OptionsButtons.jsx';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const EditProfile = () => {

    const router = useRouter();

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
                            <Image source={require('../assets/images/pic.png')} style={{ borderRadius: 100, borderWidth: 10, width: 30, height: 30 }} />
                            <View style={{ marginLeft: 7 }}>
                                <Text style={[{ fontWeight: theme.fonts.bold }]}>Katrisa Feona</Text>
                                <View style={{ backgroundColor: '#F4F5F7', borderRadius: theme.radius.md, padding: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: widthPercentage(24) }}>
                                    <AntDesign name="star" size={20} color="green" />
                                    <Text style={[{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(1.5) }]}>Capuchino</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Pressable>
                            <Feather name="more-vertical" size={20} color="black" />
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, }}>
                        <ScrollView>
                            <View style={{ marginBottom: heightPercentage(1), flexDirection: 'row', width: widthPercentage(87), justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: heightPercentage(3.5), fontWeight: theme.fonts.bold }}>
                                    Editar Perfil
                                </Text>
                            </View>
                            <View style={{ paddingVertical: heightPercentage(1) }}>
                                <Input
                                    placeholder='@ Usuario'
                                    onChangeText={() => { }}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ marginBottom: heightPercentage(2) }}
                                />
                                <Input
                                    placeholder='Biografía'
                                    icon={<Ionicons name="document-text-outline" size={24} color="black" />}
                                    onChangeText={() => { }}
                                    inputStyle={{ fontSize: heightPercentage(2) }}
                                    containerStyles={{ height: 'fit-content', }}
                                    multiline={true}
                                    numberOfLines={7}
                                />
                            </View>
                            <View style={{ marginVertical: heightPercentage(2) }}>
                                <Text style={{ fontSize: heightPercentage(2.5) }}>Intereses</Text>
                                <OptionsButtons tags={tags} onSelectTag={handleTag} />
                            </View>
                            <View>
                                <Text style={{ fontSize: heightPercentage(2.5) }}>Foto de Perfil</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: heightPercentage(1) }}>
                                    <Image source={require('../assets/images/addImage.png')} style={{ borderRadius: 10, borderWidth: 2, borderColor: '#000' }} />
                                    <Text style={{ marginHorizontal: 10, fontSize: heightPercentage(2) }}>Adjuntar Imágenes</Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: heightPercentage(3) }}>
                                <Button
                                    title='Guardar'
                                    buttonStyle={styles.publicBtn}
                                    onPress={() => { router.push('profile')}}
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

export default EditProfile;

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
    minText: {},
    reactions: {
        flexDirection: 'row',
        alignItems: 'center',
        textStyle: {
            marginLeft: 4,
            fontWeight: theme.fonts.bold
        }
    },
})