import React, { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import TextInputField from '../../../utils/TextInputField';
import LoadingModal from '../../../utils/Loader';
import { successToast } from '../../../utils/customToast';
import { getgroups } from '../../../Api/apiPaidExperti';

const Creategroup = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await getgroups(setLoading);
      if (response?.data) {
        setGroups(response.data);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => setImageUri(image.path))
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
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', groupName);
    formData.append('location', location);
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'group_image.jpg',
    });

    try {
      const response = await axios.post(
        'https://onetenbd.com/likemind/api/create-group',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }
      );
      if (response.data?.status) {
        successToast('Group created successfully!');
        setGroupName('');
        setLocation('');
        setImageUri(null);
        fetchGroups();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create group.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this group?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            const formData = new FormData();
            formData.append('id', id);

            const response = await fetch('https://onetenbd.com/likemind/api/delete-group', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });

            const result = await response.json();
            if (result?.status) {
              successToast('Group deleted successfully!');
              fetchGroups();
            } else {
              Alert.alert('Error', result?.message || 'Failed to delete group');
            }
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      {loading && <LoadingModal />}
      <CustomHeader imageSource={imageIndex.backorange} label="Host Event" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 15 }}>
        <TouchableOpacity onPress={selectImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Tap to select image</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInputField
          placeholder="Name"
          text={groupName}
          onChangeText={setGroupName}
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
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>

        {/* Display groups */}
        {groups.map(group => (
          <View key={group.id} style={styles.groupCard}>
            <Image source={{ uri: group.image }} style={styles.groupImage} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <Text style={styles.groupLocation}>{group.location}</Text>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(group.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 12, resizeMode: 'cover', marginBottom: 10 },
  placeholder: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderText: { color: '#888', fontSize: 16 },
  submitButton: {
    backgroundColor: '#F39C12',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  groupCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    overflow: 'hidden',
  },
  groupImage: { width: 100, height: 100 },
  groupInfo: { flex: 1, padding: 10, justifyContent: 'space-between' },
  groupTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  groupLocation: { fontSize: 14, color: '#555', marginVertical: 4 },
  deleteBtn: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteText: { color: '#fff', fontWeight: '600' },
});

export default Creategroup;
