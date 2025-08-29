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
import ScreenNameEnum from '../../routes/screenName.enum';

export default function LetGetYouStarted() {
     const navigation = useNavigation()
 
    return (
        <SafeAreaView style={{
            backgroundColor: '#FFF',
            padding: 15,
            flex: 1,
        }}>
            <StatusBarComponent />

         
            <View style={{ flex: 1, backgroundColor: "white" }}>
                 <ScrollView showsVerticalScrollIndicator={false}  >
                    <TouchableOpacity
                        style={{ marginTop: 8, width: '15%' }}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image
                            source={imageIndex.backorange}
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
                                    }}>Let's Get You Started!
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
Create your profile in just a few steps to start connecting.  
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
                    
                 </ScrollView>
                <CustomButton title='Start Quick Setup' onPress={() => navigation.navigate(ScreenNameEnum.OtpScreen)} 
                
                buttonStyle={{
                    backgroundColor:"#F39C12"
                }}
                />
 
            </View>
   
        </SafeAreaView>
    );
}
 