import React, { useState } from 'react';
import { Pressable, Alert, ToastAndroid } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import ActionModal from './ActionModal';
import { deletePost } from '../api/posts';

const VerticalDots = ({ isOwner, postId, router }) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Define the actions dynamically based on `isOwner`
    const optionsActions = [
        ...(isOwner
            ? [
                {
                    text: 'Editar',
                    icon: <Feather name="edit" size={24} color="black" />,
                    onPress: () => {
                        setModalVisible(false);
                        router.push({ pathname: '/editMyPost', params: { id: postId } });
                        console.log('Editar opción seleccionada');
                    },
                },
                {
                    text: 'Eliminar',
                    icon: <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />,
                    onPress: async () => {
                        Alert.alert(
                            'Confirmar eliminación',
                            '¿Estás seguro de que deseas eliminar este post?',
                            [
                                { text: 'Cancelar', style: 'cancel' },
                                {
                                    text: 'Eliminar',
                                    onPress: async () => {
                                        try {
                                            await deletePost(postId);
                                            ToastAndroid.show('Post eliminado exitosamente', ToastAndroid.SHORT);
                                            router.push('/feed');
                                        } catch (error) {
                                            console.error('Error eliminando post:', error);
                                            Alert.alert('Error', 'No se pudo eliminar el post.');
                                        }
                                    },
                                },
                            ]
                        );
                    },
                },
            ]
            : []),
        {
            text: 'Compartir',
            icon: <Feather name="share" size={24} color="black" />,
            onPress: () => {
                setModalVisible(false);
                console.log('Compartir opción seleccionada');
            },
        },
    ];

    return (
        <>
            <Pressable onPress={() => setModalVisible(true)}>
                <Feather name="more-vertical" size={20} color="black" />
            </Pressable>
            <ActionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                actions={optionsActions}
            />
        </>
    );
};

export default VerticalDots;
