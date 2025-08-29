import {   useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {   useSelector } from 'react-redux';
import ScreenNameEnum from '../../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { successToast } from '../../../utils/customToast';
  
const useProfile = () => {
  const isLogin:any = useSelector <any>((state) => state?.auth?.userData);
  const navigation = useNavigation()
  const [isLoading, setisLoading] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const toggleSwitch = () => setIsNotificationEnabled(previousState => !previousState);
  const [logoutModal, setLogoutModal] = useState(false)
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');  // Remove user data from storage
       setLogoutModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNameEnum.SPLASH_SCREEN }],
      });
      await AsyncStorage.removeItem('user');  // Remove user data from storage
      successToast("Logout Successfully")
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
   
  
   return {
    logoutModal, setLogoutModal,
    handleLogout, navigation,
    isLogin ,
    isNotificationEnabled, setIsNotificationEnabled,
    toggleSwitch ,
     isLoading
  };
};

export default useProfile;
