import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from '../../compoent/ImagePickerModal';
import ScreenNameEnum from '../../routes/screenName.enum';
import CustomButton from '../../compoent/CustomButton';
   export default function AddProfilePicture() {
 
  const navigation:any = useNavigation()
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBarComponent />
        <View style={{ marginTop: 18 }}>
       
        <CustomHeader imageSource={imageIndex.backorange} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View
            style={{
              backgroundColor: '#FFF',
              padding: 15,
              marginTop: hp(2)
            }}>
            <View style={{ marginTop: 7 }}>
              <Text style={{
                fontWeight: '700',
                fontSize: 24,
                lineHeight: 36,
                color: 'rgba(0, 0, 0, 1)',
              }}>Add a profile picture</Text>
              <Text style={{
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 24,
                marginTop: 7,
                color: '#9DB2BF',
              }}>
                Add a profile picture so your friends know it's {"\n"} you. Everyone will be able to see your picture.
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
            <Image
                                                    source={{ uri:  'https://randomuser.me/api/portraits/men/1.jpg' }} // Replace with your actual image
                                                    // source={imagePrfile ? { uri: imagePrfile?.path } : imageIndex.Ellipse}
  
               style={{ height: 170, width: 170,borderRadius:170 }}
             />
          </View>
        </ScrollView>
        <View style={{
          justifyContent: 'flex-start', marginBottom: 20
          ,
          marginHorizontal: 15
        }}>
          <CustomButton
            title={'Add picture'}
            // onPress={() =>  setIsModalVisible(true)}
            onPress={() => navigation.navigate(ScreenNameEnum.TabNavigator)}
            buttonStyle={{ width: "100%", marginTop: 28,backgroundColor:"#F39C12" }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNameEnum.TabNavigator)}
  
        >
          <Text style={{
            textAlign: "center",
            color: "#000000",
            fontSize: 17,
            fontWeight: "600",
            marginBottom: 15
          }}>Skip</Text>
        </TouchableOpacity>
        {/* <ImagePickerModal
          modalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          pickImageFromGallery={pickImageFromGallery}
          takePhotoFromCamera={takePhotoFromCamera}
        /> */}
      </SafeAreaView>
    );
  }
  
  
  
  