import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageIndex from '../assets/imageIndex';

interface BackButtonWithLabelProps {
    label?: string;
    imageSource?: any;
    onPress?: () => void;
    imageProps?:any,
    mainView?:any
}

const CustomHeader: React.FC<BackButtonWithLabelProps> = ({
    label = "",
    imageSource,
    onPress,
    imageProps,
    mainView
}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.container,mainView]}>
            {/* Back Button - Aligned to Left */}
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Image source={imageIndex.back} style={[styles.image,imageProps]}
                resizeMode='cover'
                />
            </TouchableOpacity>

            {/* Centered Label */}
            {label && <View style={styles.labelContainer}>
                <Text style={styles.text}>{label}</Text>
            </View>
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        position: 'relative',
        marginHorizontal:8
        
    },
    button: {
        position: 'absolute',
        left: 0,
        padding: 8,
        zIndex: 1, // Ensure it's on top if needed
    },
    image: {
        height: 30,
        width: 30,
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default CustomHeader;
