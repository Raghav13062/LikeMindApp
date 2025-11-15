import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../Api";

export default function CreateEventModal({ visible, onClose }: any) {
  const [title, setTitle] = useState("");
  const [coachName, setCoachName] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState({ id: 1 });
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: false,
    }).then((img) => {
      setImage(img.path);
    });
  };

  // 🔥 FINAL — API Call Inside Modal
  const EventApicall = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();

      if (image) {
        formData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "image.jpg",
        });
      }

      formData.append("category_id", "1");

      if (category?.id) {
        formData.append("category_id", category.id);
      }
      if (title) {
        formData.append("title", title);
      }
      if (coachName) {
        formData.append("name", coachName);
      }
      if (about) {
        formData.append("about", about);
      }
      if (price) {
        formData.append("price", price);
      }

      const response = await fetch(`${base_url}/create-event`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const text = await response.text();
      const json = JSON.parse(text);

      setLoading(false);
console.log("Create Event Response:", json);
      if (json.status == "1") {
        // alert("Event Created Successfully");
        // onClose();
      } else {
        // alert(json.message);
      }

      return json;
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    //   alert("Network error");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>Create New Event</Text>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <MaterialIcons name="close" size={26} color="#000" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImg} />
              ) : (
                <Text style={{ color: "#777" }}>Pick Event Image</Text>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Event Title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              placeholder="Coach Name"
              style={styles.input}
              value={coachName}
              onChangeText={setCoachName}
            />

            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              style={styles.input}
              value={price}
              onChangeText={setPrice}
            />

            <TextInput
              placeholder="About"
              style={[styles.input, { height: 90 }]}
              value={about}
              onChangeText={setAbout}
              multiline
            />

            <TouchableOpacity style={styles.submitBtn} onPress={EventApicall}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Create Event</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ------------------------ STYLES ------------------------
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "85%",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  imageBox: {
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  previewImg: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  input: {
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: "#6750A4",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
