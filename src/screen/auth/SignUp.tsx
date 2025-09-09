import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TextInputField from '../../utils/TextInputField';
 import Loading from '../../utils/Loader';
import StatusBarCompoent from '../../compoent/StatusBarCompoent';
import ResponsiveSize from '../../utils/ResponsiveSize';
import { styles } from './loginStyle';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SinupCustomer } from '../../Api/apiRequest';
import ScreenNameEnum from '../../routes/screenName.enum';
import ErrorText from '../../compoent/ErrorText';
  

 export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [loading, setLoading] = useState(false); // For loader
      const navigation:any = useNavigation()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
    const handleIdentityText = (value: string) => {
        setEmail(value.trim());

        if (!value.trim()) {
            setEmailError('Please enter your email address.');
            return;
        }

        if (!emailRegex.test(value.trim())) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handlePassText = (value: string) => {
        setPassword(value);

        if (!value) {
            setPasswordError('Please enter your password.');
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
        } else if (/\s/.test(value)) {
            setPasswordError('Password should not contain spaces.');
        } else {
            setPasswordError('');
        }
    };

    const handleNameText = (value: string) => {
        setName(value);

        if (!value.trim()) {
            setNameError('Please enter your full name.');
        } else if (value.trim().length < 3) {
            setNameError('Full name must be at least 3 characters long.');
        } else {
            setNameError('');
        }
    };


    const SinupFunction = async () => {
         const role = await AsyncStorage.getItem('role');
        const trimmedEmail = email.trim();
        const trimmedName = name.trim();
        const passwordWithoutSpaces = password.replace(/\s/g, '');
        if (!trimmedName) {
            setNameError('Please enter your full name.');
            return;
        }
        if (trimmedName.length < 3) {
            setNameError('Full name must be at least 3 characters long.');
            return;
        }
        if (!trimmedEmail) {
            setEmailError('Please enter your email address.');
            return;
        }
        if (!emailRegex.test(trimmedEmail)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setPasswordError('Please enter your password.');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }
        if (/\s/.test(password)) {
            setPasswordError('Password should not contain spaces.');
            return;
        }
        setLoading(true); // Show loader

        try {

            const params = {
                email: trimmedEmail,
                password: passwordWithoutSpaces,
                userName: trimmedName,
                navigation: navigation,
                type: role,
             };
            
            const response = await SinupCustomer(params, setLoading);
            if (response?.success) {
            } else {
                console.log('Signup failed:', response?.message || 'Unknown error');
            }

        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false); // Hide loader
        } finally {
            setLoading(false); // Hide loader
        }
    };
 
 
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'padding'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0} // Adjust if needed
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBarCompoent />
                    {loading ? <Loading /> : null}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                backgroundColor: '#FFF',

                                alignItems: 'center',
                                padding: 15,
                                flex: 1,
                                marginTop: hp(10)

                            }}>
                            <Image
                                source={imageIndex.appLogo}
 style={{ height: 180, width:200,  }}             resizeMode='contain'               />

                            <View style={{ alignItems: 'center', justifyContent: 'center',   }}>
                                <Text style={styles.txtHeading}>Sign Up</Text>
                                <Text style={styles.txtsubHeading}>
                                    Please fill up this form to create an account
                                </Text>
                            </View>

                            <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2) }}>
                                <TextInputField
                                    text={name}
                                    PickCountry={setName}
                                    onChangeText={handleNameText}
                                    placeholder={'Full Name'}
                                    firstLogo={true}
                                    img={imageIndex.profile}
                                />
                                 {nameError ? <ErrorText message={nameError}/>: null}
                                <TextInputField
                                    text={email}
                                    onChangeText={handleIdentityText}
                                    placeholder={'Email Address'}
                                    firstLogo={true}
                                    img={imageIndex.emai}
                                />
                                 {emailError ? <ErrorText message={emailError}/>: null}

                                <TextInputField
                                    text={password}
                                    onChangeText={handlePassText}
                                    placeholder={'Password'}
                                    firstLogo={true}
                                    showEye={true}
                                    hide={true}
                                    img={imageIndex.lock}
                                />
                                 {passwordError ? <ErrorText message={passwordError}/>: null}


                            </View>

                            <CustomButton
                                title={'Sign Up'}
                                onPress={() => {
                                    SinupFunction()
                                }}
                            //  onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}  
                                buttonStyle={{ marginHorizontal: 20, width: "100%", marginTop: 20 }}
                            />


                            <View
                                style={{
                                    height: hp(5),
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    alignSelf: 'center',
                                    marginTop: hp(3),
                                    justifyContent: 'center',
                                }}>
                                <Text style={{ fontSize: 16, lineHeight: 22, color: 'rgba(144, 144, 144, 1)', fontWeight: '600' }}>
                                    Already have an account?{' '}
                                </Text>
                                <TouchableOpacity

                                    onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}

                                >

                                    <Text style={Styles.text}>Login</Text>

                                </TouchableOpacity>
                            </View>


                        </View>

                    </ScrollView>


                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const Styles = StyleSheet.create({

    text: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '700',
        color: 'Black',
    },
    textEr: { color: 'red', fontSize: 12 },
    btn: {
        alignSelf: 'center',
        backgroundColor: 'Black',
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        width: '95%',
    },
});
