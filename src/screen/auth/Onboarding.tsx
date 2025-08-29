import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
 
const WelcomeScreen = () => {
  const nav:any = useNavigation()
  return (
      <ImageBackground
        source={imageIndex.onBag} // put your background image URL here
        style={styles.imageBackground}
        resizeMode="cover"
      >
              <StatusBarComponent barStyle="light-content" backgroundColor="transparent" translucent />
       <View style={styles.bottomSheet}> 
        <View style={{
            justifyContent:"center",
            alignItems:"center"
        }}>
        <Image source={imageIndex.welcomeLike} style={{
            height:30,
            width:308,
            resizeMode:"contain"
        }}/>
        </View>
        <View style={{
            marginTop:35
        }}>
        <TouchableOpacity style={styles.buttonEmail}>
        <Image source={imageIndex.sms}  style={styles.img}/>
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonFacebook}>
        <Image source={imageIndex.fb}   style={styles.img}/>

          {/* <Icon name="logo-facebook" size={20} color="#fff" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonGoogle}>
            <Image source={imageIndex.google}  style={styles.img}/>
           <Text style={[styles.buttonText, { color: '#000' }]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonApple}>
        <Image source={imageIndex.apple}  style={styles.img}/>

          {/* <Icon name="logo-apple" size={20} color="#fff" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <Text style={styles.loginText} 
        
        onPress={()=>nav.navigate(ScreenNameEnum.LoginScreen) }
        >
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </View>
      </View>
      </ImageBackground>
   );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheet: {
    padding: 20,
 
  },
  img:{
    height:25,
    width:25,
    resizeMode:"cover"

  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
  },
  titleHighlight: {
    color: '#7442f4',
  },
  buttonEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8E44AD',
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent:"center"

  },
  buttonFacebook: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent:"center"
  },
  buttonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent:"center"
  },
  buttonApple: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent:"center"

  },
  icon: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',marginLeft:11
  },
  loginText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 15,
    marginTop: 15,
  },
  loginLink: {
    color: '#8E44AD',
    fontWeight: '700',
  },
});
