
 import { View, Text, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { menuItems } from './data';
 import useProfile from './useProfile';
import LoadingModal from '../../../utils/Loader';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import LogoutModal from '../../../compoent/LogoutModal';
import styles from './style';
 
const Profile = () => {
 const {
  logoutModal, setLogoutModal,
  handleLogout, navigation,
  isLogin ,
  isNotificationEnabled,  
  toggleSwitch,
   isLoading
 } = useProfile()
  return (
    <SafeAreaView style={styles.container}>
 
{isLoading ? <LoadingModal /> : null}

      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backNavsPuple} label={"Profile"} />
      <ScrollView showsVerticalScrollIndicator={false} style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
      }}>
        <View style={styles.profileSection}>
        <Image
  source={{
    uri: isLogin?.user_data?.image
      ? isLogin.user_data.image
      : 'https://randomuser.me/api/portraits/men/1.jpg',
  }}
  style={styles.avatar}
/> 
        </View>
        <View style={{ alignItems: "center",bottom:25 }}>
          <Text style={styles.name}>{isLogin?.user_data?.email}</Text>
          <Text style={styles.email}>{isLogin?.user_data?.full_name}</Text>
        </View>
        <ScrollView style={styles.menuList} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}

              onPress={() => {
                if (item?.title === "Logout") {
                  setLogoutModal(true);
                }  
                
                else {
                  navigation.navigate(item?.screen);
                }
              }}
            >
              <Image
                source={item.icon} // Replace with your actual image
                style={{
                  height: 40,
                  width: 40
                }}
              />
              <Text style={styles.menuLabel}>{item.title}</Text>
              {item.isSwitch && (
                <Switch
                  trackColor={{ false: '#ccc', true: '#8E44AD' }}
                  thumbColor="white"
                  onValueChange={toggleSwitch}
                  value={isNotificationEnabled}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <LogoutModal visible={logoutModal} onClose={() => setLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};



export default Profile;
