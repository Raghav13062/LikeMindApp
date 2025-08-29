import React, { useState } from 'react';
import {
  View,
  Text,
   TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { base_url } from '../../../Api'; // Ensure this gives: https://yourdomain.com/api
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import TextInputField from '../../../utils/TextInputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../../../utils/Loader';
import { successToast } from '../../../utils/customToast';

const Creategroup = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImageUri(image.path);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Could not pick image.');
        }
      });
  };

  const handleSubmit = async () => {
    if (!groupName || !location || !imageUri) {
      Alert.alert('Validation', 'Please fill all fields and select an image');
      return;
    }
    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();
     formData.append('title', groupName);
    formData.append('location', location);
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'group_image.jpg',
    });

    try {
      const response = await axios.post(`${base_url}/create-group`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,

        },
      });
      if (response.data?.status === true) {
        successToast('Group updated successfully!');
      } 

     } catch (error: any) {
       Alert.alert('Error', 'Failed to update group.');
    }
  };

  return (
    <SafeAreaView style={{
        flex:1, backgroundColor:"white"
    }}> 
    <StatusBarComponent/>
    {loading ? <LoadingModal /> : null}

    <CustomHeader imageSource={imageIndex.backorange} label="Create Group" />
<ScrollView showsVerticalScrollIndicator={false} style={{
  marginTop:33 
}}>
      <TouchableOpacity onPress={selectImage} style={{
        marginHorizontal:15
      }}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Tap to select image</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
   
         <TextInputField
               onChangeText={setGroupName}
               placeholder="Group Name"
               text={groupName}

              firstLogo={false}
              showEye={false}
              img={imageIndex.lock}
            />
         <TextInputField
            
            placeholder="Location"
         
               text={location}
               onChangeText={setLocation}
              firstLogo={false}
              showEye={false}
              img={imageIndex.lock}
            />
        

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Update Group</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  form: {
    padding: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#150149',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Creategroup;
