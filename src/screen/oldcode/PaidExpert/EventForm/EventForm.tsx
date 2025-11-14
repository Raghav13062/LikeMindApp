import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
   Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';
import useEventForm from './useEventForm';
import LoadingModal from '../../../utils/Loader';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EventForm = () => {
 
const {   navigation,
  coachName, setCoachName,
  title, setTitle ,
  about, setAbout,
  price, setPrice ,
  category, setCategory ,
  showDropdown, setShowDropdown ,
  image, setImage ,
  toggleDropdown ,
  pickImage ,
  loading,
  categoryOptions,
  submitForm} = useEventForm()

  return ( 
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
        <StatusBarComponent/>
        {loading ? <LoadingModal /> : null}

        <CustomHeader imageSource={imageIndex.backorange} label="Create  Event" />

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* <Text style={styles.heading}>🎯 Create  Event</Text> */}

          <View style={styles.card}>
            <TextInput
              placeholder="Event Title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
            />
            <TextInput
              placeholder="Coach Name"
              style={styles.input}
              value={coachName}
              onChangeText={setCoachName}
              returnKeyType="next"
            />
            <TextInput
              placeholder="About"
              style={[styles.input, styles.textarea]}
              value={about}
              onChangeText={setAbout}
              multiline
              returnKeyType="done"
            />
            <TextInput
              placeholder="Price"
              style={styles.input}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
              <Text style={styles.dropdownText}>
                {category ? category.name : 'Select Category'}
              </Text>
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownList}>
                {categoryOptions.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCategory(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Image source={{uri:item.image}} style={{
                      height:22,
                      width:22,
                      resizeMode:"contain"
                    }}/>
                    <Text style={styles.dropdownItemText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.imagePickerText}>Tap to select an image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EventForm;

