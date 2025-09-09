import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
 } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import ScreenNameEnum from '../../routes/screenName.enum';
import { color } from '../../constant';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
};

const Splash: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isLogin = useSelector((state: any) => state?.auth?.userData);
  const isFocus = useIsFocused();
  const checkLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Retrieved token:", token);
      console.log("User Type:", isLogin?.user_data?.user_type);
      if (token) {
        const userType = isLogin.user_data.user_type;
  
        switch (userType) {
          case "USER":
            navigation.navigate(ScreenNameEnum.TabNavigator);
            break;
          case "PAID":
            navigation.navigate(ScreenNameEnum.PaidExpertTab);
            break;
          case "PARTNER":
            navigation.navigate(ScreenNameEnum.SharedTabNavigator);
            break;
          default:
            navigation.navigate(ScreenNameEnum.ChooseRole);
            break;
        }
      } else {
        navigation.navigate(ScreenNameEnum.ChooseRole);
      }
    } catch (error) {
      console.error("Error during checkLogout:", error);
    }
  };
  
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      checkLogout();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isFocus, navigation]);


  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <SafeAreaView>
        <Image
          source={imageIndex.appLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.baground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 250,
    width: 250,
  },
});

export default Splash;
