import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const API_BASE = 'https://onetenbd.com/likemind/api';
const AUTH_TOKEN = 'Bearer <YOUR_TOKEN_HERE>'; // ⚠️ Replace with your real token

const OfferExperties = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupData, setGroupData] = useState({ title: '', location: '', image: null });
  const [eventData, setEventData] = useState({
    title: '',
    name: '',
    about: '',
    price: '',
    category_id: '',
    image: null,
  });

  // ==================== IMAGE PICKER ====================
  const openImagePicker = (onSelect: any) => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    })
      .then((image: any) => {
        onSelect(image);
      })
      .catch((error) => {
        if (error?.message !== 'User cancelled image selection') {
          console.error('Image picker error:', error);
        }
      });
  };

  // ==================== CREATE GROUP ====================
  const createGroup = async () => {
    if (!groupData.title || !groupData.location || !groupData.image) {
      Alert.alert('Error', 'Please fill all fields and select an image.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', groupData.title);
    formData.append('location', groupData.location);
    formData.append('image', {
      uri: groupData.image.path,
      type: groupData.image.mime,
      name: 'group_image.jpg',
    });

    try {
      const res = await fetch(`${API_BASE}/create-group`, {
        method: 'POST',
        headers: { Authorization: AUTH_TOKEN },
        body: formData,
      });
      const result = await res.json();
      console.log('Group Created:', result);
      Alert.alert('Success', 'Group created successfully!');
      fetchGroups(); // Refresh list
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  // ==================== FETCH GROUPS ====================
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/get-groups`, {
        method: 'GET',
        headers: { Authorization: AUTH_TOKEN },
      });
      const result = await res.json();
      console.log('Groups:', result);
      setGroups(result?.data || []);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // ==================== CREATE EVENT ====================
  const createEvent = async () => {
    if (
      !eventData.title ||
      !eventData.name ||
      !eventData.about ||
      !eventData.price ||
      !eventData.category_id ||
      !eventData.image
    ) {
      Alert.alert('Error', 'Please fill all fields and select an image.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('name', eventData.name);
    formData.append('about', eventData.about);
    formData.append('price', eventData.price);
    formData.append('category_id', eventData.category_id);
    formData.append('image', {
      uri: eventData.image.path,
      type: eventData.image.mime,
      name: 'event_image.jpg',
    });

    try {
      const res = await fetch(`${API_BASE}/create-event`, {
        method: 'POST',
        headers: { Authorization: AUTH_TOKEN },
        body: formData,
      });
      const result = await res.json();
      console.log('Event Created:', result);
      Alert.alert('Success', 'Event created successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  // ==================== UI ====================
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create Group</Text>

      <TextInput
        placeholder="Group Title"
        style={styles.input}
        value={groupData.title}
        onChangeText={(text) => setGroupData({ ...groupData, title: text })}
      />
      <TextInput
        placeholder="Location"
        style={styles.input}
        value={groupData.location}
        onChangeText={(text) => setGroupData({ ...groupData, location: text })}
      />

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => openImagePicker((img: any) => setGroupData({ ...groupData, image: img }))}
      >
        {groupData.image ? (
          <Image source={{ uri: groupData.image.path }} style={styles.imagePreview} />
        ) : (
          <Text>Select Group Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={createGroup}>
        <Text style={styles.buttonText}>Create Group</Text>
      </TouchableOpacity>

      <Text style={[styles.heading, { marginTop: 30 }]}>All Groups</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>{item.location}</Text>
            </View>
          )}
        />
      )}

      <Text style={[styles.heading, { marginTop: 30 }]}>Create Event</Text>

      <TextInput
        placeholder="Event Title"
        style={styles.input}
        value={eventData.title}
        onChangeText={(text) => setEventData({ ...eventData, title: text })}
      />
      <TextInput
        placeholder="Coach Name"
        style={styles.input}
        value={eventData.name}
        onChangeText={(text) => setEventData({ ...eventData, name: text })}
      />
      <TextInput
        placeholder="About"
        style={styles.input}
        value={eventData.about}
        onChangeText={(text) => setEventData({ ...eventData, about: text })}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={eventData.price}
        onChangeText={(text) => setEventData({ ...eventData, price: text })}
      />
      <TextInput
        placeholder="Category ID"
        style={styles.input}
        value={eventData.category_id}
        onChangeText={(text) => setEventData({ ...eventData, category_id: text })}
      />

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => openImagePicker((img: any) => setEventData({ ...eventData, image: img }))}
      >
        {eventData.image ? (
          <Image source={{ uri: eventData.image.path }} style={styles.imagePreview} />
        ) : (
          <Text>Select Event Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={createEvent}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OfferExperties;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  imagePicker: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imagePreview: { width: 100, height: 100, borderRadius: 8 },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: '700', fontSize: 16 },
  cardSub: { color: '#555' },
});
