import { View, Text, Image,KeyboardAvoidingView,TouchableWithoutFeedback, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Keyboard, Platform } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    useNavigation,
} from '@react-navigation/native';
import Loading from '../../utils/Loader';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomButton from '../../compoent/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restEmailOtpScreen } from '../../Api/apiRequest';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../utils/TextInputField';
 
export default function PasswordReset() {
    const [email, setEmail] = useState('');
    // const [email, setEmail] = useState('user@gmail.com');
    const [emailError, setEmailError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    const handleIdentityText = (value: string) => {
        setEmail(value.trim());

        if (value.trim() === '') {
            setEmailError('Email is required');
            return;
        }

        if (!emailRegex.test(value.trim())) {
            setEmailError('Please enter a valid Email Address');
        } else {
            setEmailError('');
        }
    };
     const passFunction = async () => {
        try {
            const role = await AsyncStorage.getItem('userRole');
            const trimmedEmail = email.trim();
    
            // Reset previous error messages
            setEmailError('');
    
            // Validate email input
            if (!trimmedEmail) {
                setEmailError('Email is required');
                return;
            }
    
            if (!emailRegex.test(trimmedEmail)) {
                setEmailError('Please enter a valid Email Address');
                return;
            }
    
            // Prepare API parameters
            const params = {
                email: trimmedEmail,
                navigation: navigation,
            };
    
            // Call API to send OTP
            const response = await restEmailOtpScreen(params, setLoading);
    
            if (!response) {
                setEmailError('Failed to send OTP. Please try again.');
            }
    
        } catch (error) {
            console.error("Login error:", error);
            setEmailError('Something went wrong. Please try again.');
        }
    };
    
    // Handling Password Input Change


    return (
        <SafeAreaView style={{
            backgroundColor: '#FFF',
            padding: 15,
            flex: 1,
        }}>
            <StatusBarComponent />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust based on header
        >
            <View style={{ flex: 1, backgroundColor: "white" }}>
                {loading ? <Loading /> : null}
                <ScrollView showsVerticalScrollIndicator={false}  >
                    <TouchableOpacity
                        style={{ marginTop: 8, width: '15%' }}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image
                            source={imageIndex.back}
                            style={{ height: 32, width: 32 }}
                        />
                    </TouchableOpacity>
                    <View style={{ marginTop: 15, }}>
                        <View style={{ height: hp(9), }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontWeight: '700',
                                        color: 'rgba(0, 0, 0, 1)',
                                        lineHeight: 36,
                                        marginTop: 15,
                                    }}>Password Reset
                                </Text>
                            </View>
                            <View style={{ width: '85%', }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: '500',
                                        color: '#3D4049',
                                         marginTop: 2

                                    }}>
Please put your mobile number to reset your password      
</Text>
                      </View>
                        </View>
                    </View>

                    <View style={{
                        justifyContent:"center",
                        alignItems:"center" ,
                        marginTop:55
                    }}>
                        <Image source={imageIndex.passBag} style={{
                            height:395,
                            width:395 ,
                            resizeMode:"contain"
                        }}/>
                    </View>
                    
                    <TextInputField
              text={email}
              onChangeText={handleIdentityText}
              placeholder={'Email Address '}
              firstLogo={true}
              img={imageIndex.emai}
            />
                    {emailError ? <Text style={{ color: 'red', fontSize: 12,  }}>{emailError}</Text> : null}
                </ScrollView>
                {/* <CustomButton title='Submit' onPress={() => passFunction()} /> */}
        <CustomButton title='Submit' 
        onPress={() => passFunction()} 

        // onPress={() => navigation.navigate(ScreenNameEnum.OtpScreen)}
         />  

            </View>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
 