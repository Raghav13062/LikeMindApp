import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
 } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import TextInputField from '../../utils/TextInputField';
import Loading from '../../utils/Loader';
import StatusBarCompoent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import { styles } from './loginStyle';
import ResponsiveSize from '../../utils/ResponsiveSize';
import { wp } from '../../utils/Constant';
import CustomButton from '../../compoent/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCustomer, } from '../../Api/apiRequest';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorText from '../../compoent/ErrorText';
 
export default function Login() {
 
  // const [email, setEmail] = useState('admin@gmail.com');
  //  const [password, setPassword] = useState('123456');
  // const [email, setEmail] = useState('paid@gmail.com');
  // const [password, setPassword] = useState('Aman@1234567');
  const [email, setEmail] = useState('shard112@gmail.com');
  const [password, setPassword] = useState('1234567');

  // const [email, setEmail] = useState('user@gmail.com');
  // const [password, setPassword] = useState('12345678');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation:any = useNavigation();
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const dispatch = useDispatch();
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

  const handlePassText = (value: string) => {
    setPassword(value);
    if (value.trim() === '') {
      setPasswordError('Password is required');
    } 
    // else if (value.trim().length < 6) {
    //   setPasswordError('Password must be at least 6 characters long');
    // } 
    
    else {
      setPasswordError('');
    }
  };

  const LoginFunction = async () => {
    const role = await AsyncStorage.getItem('role');
     const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (trimmedEmail === '') {
      setEmailError('Email   is required');
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Please enter a valid Email Address');
      return;
    } else {
      setEmailError('');
    }
    if (trimmedPassword === '') {
      setPasswordError('Password is required');
      return;
    } else if (trimmedPassword?.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError('');
    }
     try {
      const params = {
        email: email,
        password: password,
        // roleType:role,
        navigation: navigation,
      };
      console.log("params",params)
      const response = await LoginCustomer(params, setLoading,dispatch);
      if (response.status == '1') {
        setLoading(false);
        setToastMessage(response?.message); // ✅ Set success message
 
      } else {
        setLoading(false);
        setToastMessage(response?.message); // ✅ Set error message
      }
      
     } catch (error) {
      console.error("Login error:", error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />
     
      <ScrollView showsVerticalScrollIndicator={false} >
      {loading ? <Loading /> : null}
        <View
          style={{
            backgroundColor: '#FFF',
            alignItems: 'center',
            padding: 15,
            flex: 1,
            marginTop: hp(8)
          }}>
          <Image
            source={imageIndex.appLogo}
            style={{ height: hp(7), width: '100%', marginVertical: 20 }} resizeMode='contain'
          />
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
          <Text style={[styles.txtsubHeading, {
  color: "black",
  fontWeight: "bold",
  fontSize: 20
}]}>
  Welcome Back to{'\n'}Like Minds
</Text>

          </View>
          <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
            <TextInputField
              text={email}
              onChangeText={handleIdentityText}
              placeholder={'Email Address '}
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
              img={imageIndex.lock}
            />
                        {passwordError ? <ErrorText message={passwordError}/>: null}

             <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.PasswordReset)
              }}
              style={{
                alignSelf: 'center',
                marginTop: 15,
                borderBottomWidth: 0.9,
                borderColor: 'rgba(0, 0, 0, 1)',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: '500',
                  lineHeight: 18,
                }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            title={'Sign In'}
            onPress={() => LoginFunction()
            }
            // onPress={() => {
            //   navigation.navigate(ScreenNameEnum.UserTypeSelection)
            // }}
             buttonStyle={{ marginHorizontal: 20, width: "100%", marginTop: 30 }}
          />
       
         </View>
      </ScrollView>
      <View
            style={{
              height: hp(5),
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
              alignSelf: 'center',
              width: wp(100),
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, lineHeight: 22, color: 'rgba(144, 144, 144, 1)', }}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate(ScreenNameEnum.SignUpScreen)
              }}>
              <Text style={Styles.text}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {/* {toastMessage !== '' && (
  <SuccessMessageCustom
    textColor="red"
    color="gray"
    message={toastMessage}
  />
)} */}
 
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '700',
    color: '#8E44AD',
    bottom: 2
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#E8442E',
    height: 55,

    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: wp(90),
  },
});


