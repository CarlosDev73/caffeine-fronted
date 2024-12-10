import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { theme } from '../constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { widthPercentage } from '../helpers/common';

const SliderButton = ({ onToggle }) => {

    const width = 40;
    const [isToggled, setIsToggled] = useState(false);
    const translateX = useSharedValue(0);
    const SLIDE_WIDTH = width * 0.8;
    const BUTTON_WIDTH = 23;

    const handlePress = () => {

        const newState = !isToggled; // Invierte el estado
        setIsToggled(newState); // Actualiza el estado visual
        translateX.value = withSpring(newState  ? SLIDE_WIDTH - BUTTON_WIDTH : 0);

        if (typeof onToggle === 'function') {
            onToggle(newState); // Notify the parent of the new state
        }
    };

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            <View style={[styles.slider, {width: width * 0.8}, !isToggled && styles.active]}>
                <Pressable onPress={handlePress}>
                    <Animated.View style={[styles.button, animatedButtonStyle]}>
                        <FontAwesome name="circle-o" size={10} color="black" />
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    );
};

export default SliderButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    slider: {
        height: 20,
        backgroundColor: theme.colors.secondary,
        marginHorizontal: widthPercentage(2),
        borderRadius: 30,
        borderWidth: 2,
        borderBottomWidth: 3,
        justifyContent: 'center',
    },
    active: {
        backgroundColor: theme.colors.LemonChiffon
    },
    button: {
        width: 20,
        height: 18,
        borderRadius: 100,
        borderWidth: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});