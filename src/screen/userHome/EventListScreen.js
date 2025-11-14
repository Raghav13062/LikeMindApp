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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../compoent/CustomHeader";
import * as ImagePicker from "react-native-image-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Switched to Ionicons for a fresh look
import ScreenNameEnum from "../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import LocationSearchModal from "../../compoent/LocationSearchModal";

// --- 🎨 Premium Color Palette ---
const COLORS = {
  primary: '#FFC300', // Brighter Gold/Yellow (Main Accent)
  secondary: '#FF5733', // Deep Orange/Coral (Action/Price Highlight)
  background: '#F0F4F8', // Very Light Blue-Grey (App Background)
  card: '#FFFFFF', // Pure White (Card/Modal Background)
  textPrimary: '#1E272E', // Dark Blue-Grey (Main Text)
  textSecondary: '#607D8B', // Medium Slate Grey (Secondary Text/Host)
  placeholder: '#B0BEC5', // Light Blue-Grey
  success: '#4CAF50',
};

const StyledTextInput = ({ label, placeholder, value, onChangeText, multiline, keyboardType, style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          multiline && styles.textArea,
          isFocused && styles.inputFocused, // Focus style
          style,
        ]}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        {...props}
      />
    </View>
  );
};

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
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submit loading
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  // ... (fetchEvents, useEffect, pickImage functions remain the same)
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
    ImagePicker.launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) console.error(response.errorMessage);
      else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  // Create event
  const createEvent = async () => {
    if (!title || !name || !about || !price || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setIsSubmitting(false);
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("name", name);
      formdata.append("about", about);
      formdata.append("price", price);
      formdata.append("category_id", categoryId);
      if(selectedLocation.latitude){
  formdata.append("lat", selectedLocation.latitude);
      }
      if(selectedLocation.longitude){
  formdata.append("long", selectedLocation.longitude);
      }
      
      if (image) {
        formdata.append("image", {
          uri: image.uri,
          name: image.fileName || `event_image_${Date.now()}.jpg`,
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
      } else {
        alert(result.message || "Failed to create event.");
      }
    } catch (error) {
      console.error("Event creation error:", error);
      alert("An error occurred during event creation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const navigation = useNavigation()
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="person-circle-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.cardName}>{item.name}</Text>
        </View>

        <Text style={styles.cardAbout} >{item.about}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>
            {item.price === null || item.price === '0' || item.price == 0
              ? 'FREE'
              : `₹${item.price}`}
          </Text>
          <TouchableOpacity style={styles.detailsButton}
            onPress={() => navigation.navigate(ScreenNameEnum.MarketProfileDetails, { item })}
          >
            <Text style={styles.detailsButtonText}>Join Event</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.card} style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader label=" Host Events" />

      {/* Host Event Button (Floating Action Button style) */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle" size={26} color={COLORS.card} />
        <Text style={styles.createButtonText}>Host Event</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={events}
          style={{
            marginTop: 15
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={60} color={COLORS.placeholder} />
              <Text style={styles.emptyText}>No events scheduled yet. Start hosting today!</Text>
            </View>
          }
        />
      )}

      {/* Host Event Modal (Clean Form Design) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Host New Event</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

              <StyledTextInput
                label="Event Title"
                placeholder="E.g., Masterclass on React Native"
                value={title}
                onChangeText={setTitle}
              />
                <TouchableOpacity style={{
                 borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 16 : 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background, // Light background for input field
              }} onPress={() => setModalVisible1(true)}>
                <Text style={styles.btnText}>Search Location</Text>
              </TouchableOpacity>


              {selectedLocation && (
                <View style={styles.box}>
                   <Text>Address: {selectedLocation.address}</Text>
                  {/* <Text>Lat: {selectedLocation.latitude}</Text>
<Text>Lng: {selectedLocation.longitude}</Text> */}
                </View>
              )}
              <StyledTextInput
                label="Coach/Host Name"
                placeholder="Your Name or Organization"
                value={name}
                onChangeText={setName}
              />
              <StyledTextInput
                label="About Event"
                placeholder="Describe what the event is about (min 50 chars)"
                value={about}
                onChangeText={setAbout}
                multiline
              />
              <StyledTextInput
                label="Price ₹"
                placeholder="0 for Free"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />

            
              <LocationSearchModal
                visible={modalVisible1}
                onClose={() => setModalVisible1(false)}
                onSelectLocation={(loc) => {
                  setSelectedLocation(loc);
                  setModalVisible1(false);
                }}
              />

              <View style={{ marginBottom: 15 }}>
                <Text style={styles.inputLabel}>Event Image</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                  <Ionicons name="cloud-upload-outline" size={20} color={COLORS.textPrimary} style={{ marginRight: 10 }} />
                  <Text style={styles.imagePickerText}>
                    {image ? "Image Selected: " + (image.fileName || "photo.jpg").substring(0, 20) : "Tap to Pick Image from Gallery"}
                  </Text>
                </TouchableOpacity>
              </View>

              {image && (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.imagePreview}
                    resizeMode="cover"
                  />
                </View>
              )}

              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]}
                onPress={createEvent}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={COLORS.card} />
                ) : (
                  <Text style={styles.submitButtonText}>Host Event Now</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelLink}
                onPress={closeModal}
              >
                <Text style={styles.cancelLinkText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default EventListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100, // Increased padding to avoid FAB overlap
  },
  // --- Card Styles (Elevated and Clean) ---
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 15, // Slightly smaller curve
    marginBottom: 15, // Reduced margin
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 4 }, // Smaller shadow
    shadowOpacity: 0.05,
    shadowRadius: 10,
    overflow: "hidden",
    flexDirection: 'row', // Horizontal layout
    height: 120, // Fixed compact height
  },
  cardImage: {
    width: 100, // Fixed width for image
    height: "100%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardContent: {
    flex: 1, // Takes up remaining space
    padding: 12, // Reduced padding
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18, // Reduced font size
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardName: {
    fontSize: 12, // Reduced font size
    color: COLORS.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
    flexShrink: 1,
  },
  cardAbout: {
    fontSize: 12, // Reduced font size
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    // Removed border for cleaner look
  },
  cardPrice: {
    fontSize: 16, // Reduced font size
    fontWeight: "800",
    color: COLORS.secondary,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12, // Reduced padding
    paddingVertical: 8, // Reduced padding
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    bottom: 5
  },
  detailsButtonText: {
    color: "white",
    fontWeight: '700',
    fontSize: 13, // Reduced font size
  },
  // --- Create Button (FAB Style) ---
  createButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30, // Pill shape
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute', // Floating Action Button
    bottom: 30,
    right: 20,
    zIndex: 10,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  createButtonText: {
    color: COLORS.card,
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
  // --- Modal Styles (Improved Form) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end", // Opens from bottom
  },
  modalContent: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textPrimary
  },
  closeButton: {
    padding: 5,
  },
  btn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  box: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '100%',
    marginBottom:15
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  // --- Input Styles (Modular and Focus-aware) ---
  inputLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 16 : 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background, // Light background for input field
  },
  inputFocused: {
    borderColor: COLORS.primary, // Primary color on focus
    backgroundColor: COLORS.card,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: COLORS.primary + '20', // Very light primary background
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 14,
  },
  imagePickerText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 15,
  },
  imagePreviewContainer: {
    marginBottom: 15,
    marginTop: 5,
    // Add a border/shadow to the preview for better separation
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imagePreview: {
    width: "100%",
    height: 150,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: COLORS.card,
    fontWeight: "800",
    fontSize: 18
  },
  cancelLink: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  cancelLinkText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  // --- Empty State ---
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.placeholder + '50',
  },
  emptyText: {
    textAlign: "center",
    marginTop: 15,
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
});