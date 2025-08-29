import React from 'react';
import {
    Image,
    View,
    Pressable,
    Text,
    StyleSheet,
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageIndex from '../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../routes/screenName.enum';

const ChooseRole = () => {
    const navigation = useNavigation();

    const handleChangerRole = async (role) => {
        await AsyncStorage.setItem("role", role);
         navigation.navigate(ScreenNameEnum.OnboardingScreen); // replace 'Home' with your actual screen
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBarComponent />
            <View style={styles.container}>
                <Image source={imageIndex.appLogo} style={styles.logo} />

                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subText}>
                    Please select your role to continue
                </Text>

                <View style={styles.buttonWrapper}>
                    <Pressable
                        onPress={() => handleChangerRole('USER')}
                        style={({ pressed }) => [styles.roleButton, pressed && styles.pressed]}
                    >
                        <View style={styles.roleRow}>
                            <Image source={imageIndex.people} style={styles.icon} />
                            <Text style={styles.roleText}>User Role</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => handleChangerRole('PAID')}
                        style={({ pressed }) => [styles.roleButton, pressed && styles.pressed]}
                    >
                        <View style={styles.roleRow}>
                            <Image source={imageIndex.expert} style={styles.icon} />
                            <Text style={styles.roleText}>Paid Expert</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => handleChangerRole('PARTNER')}
                        style={({ pressed }) => [styles.roleButton, pressed && styles.pressed]}
                    >
                        <View style={styles.roleRow}>
                            <Image source={imageIndex.equity} style={styles.icon} />
                            <Text style={styles.roleText}>Shared Interest</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 40,
        justifyContent:"center"
    },
    logo: {
        width: 200,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 40,
        textAlign: 'center',
        lineHeight: 22,
        marginTop:11,
        fontWeight:"500"
    },
    buttonWrapper: {
        width: '100%',
    },
    roleButton: {
        backgroundColor: '#150149',
 
        borderRadius: 14,
          marginBottom: 16,
        height:55 ,
        justifyContent:"center",
        alignItems:"center"
    },
    roleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roleText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginLeft: 12,
    },
    icon: {
        width: 36,
        height: 36,
        tintColor:"white",
        resizeMode: 'contain',
    },
    pressed: {
        backgroundColor: '#e0e0e0',
    },
});

export default ChooseRole;
