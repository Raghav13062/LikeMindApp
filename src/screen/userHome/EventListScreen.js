import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../compoent/CustomHeader";
import * as ImagePicker from "react-native-image-picker";

const EventListScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [image, setImage] = useState(null);

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(
        "https://onetenbd.com/likemind/api/get-events",
        { method: "GET", headers: myHeaders }
      );

      const result = await response.json();
      if (result.success && result.data) setEvents(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Image picker
  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) console.error(response.errorMessage);
      else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  // Create event
  const createEvent = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("name", name);
      formdata.append("about", about);
      formdata.append("price", price);
      formdata.append("category_id", categoryId);
      if (image) {
        formdata.append("image", {
          uri: image.uri,
          name: image.fileName || "photo.jpg",
          type: image.type || "image/jpeg",
        });
      }

      const response = await fetch(
        "https://onetenbd.com/likemind/api/create-event",
        { method: "POST", headers: myHeaders, body: formdata }
      );

      const result = await response.json();
      console.log(result);
      if (result.success) {
        fetchEvents(); 
        setModalVisible(false);
        setTitle("");
        setName("");
        setAbout("");
        setPrice("");
        setImage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.name}>Hosted by: {item.name}</Text>
        <Text style={styles.about}>{item.about}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader label="Events" />

      <TouchableOpacity
        style={[styles.createButton, {     backgroundColor: '#F39C12',
 }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createButtonText}>+ Host Event</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Host New Event</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                placeholder="Event Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="Coach Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                placeholder="About"
                value={about}
                onChangeText={setAbout}
                style={[styles.input, { height: 80 }]}
                multiline
              />
              <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
              />

              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={{ color: "#FED428", fontWeight: "600" }}>Pick Event Image</Text>
              </TouchableOpacity>

              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: "100%", height: 150, borderRadius: 10, marginVertical: 10 }}
                  resizeMode="cover"
                />
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#888" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#FED428" }]}
                  onPress={createEvent}
                >
                  <Text style={styles.modalButtonText}>Host Event</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#FED428" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
        showsVerticalScrollIndicator={false}
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No events found</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default EventListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7" },
  listContainer: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  image: { width: "100%", height: 200 },
  content: { padding: 16 },
  title: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 4 },
  name: { fontSize: 16, color: "#555", marginBottom: 6 },
  about: { fontSize: 14, color: "#666", marginBottom: 8 },
  price: { fontSize: 16, fontWeight: "600", color: "#FED428" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#888", fontSize: 16 },
  createButton: { padding: 14, borderRadius: 10,marginTop:40, margin: 16, alignItems: "center" },
  createButtonText: { color: "white", textAlign: "center", fontWeight: "600", fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 12 },
  imagePicker: { borderWidth: 1, borderColor: "#FED428", borderRadius: 8, padding: 10, alignItems: "center", marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, marginHorizontal: 5, alignItems: "center" },
  modalButtonText: { color: "#333", fontWeight: "600", fontSize: 16 },
});
