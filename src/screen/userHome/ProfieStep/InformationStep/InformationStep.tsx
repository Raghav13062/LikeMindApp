import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import styles from './style';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const InformationStep = () => {
  const navigation: any = useNavigation();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [location, setLocation] = useState('');
  const [prompt2, setPrompt2] = useState('');
  const [goal, setGoal] = useState('');
  const [genderVisible, setGenderVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [images, setImages] = useState(Array(4).fill(null));

  const [errors, setErrors] = useState({
    fullName: '',
    age: '',
    height: '',
    location: '',
    gender: '',
    prompt2: '',
    goal: '',
    images: '',
  });

  const handleImagePick = (index: number) => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        const updatedImages = [...images];
        updatedImages[index] = {
          uri: image.path,
          mime: image.mime,
        };
        setImages(updatedImages);
      })
      .catch(error => {
        console.log('Image pick cancelled or failed:', error);
      });
  };

  const handleGenderSelect = (value: string) => {
    setGender(value);
    setGenderVisible(false);
  };

  const validateFields = () => {
    let valid = true;
    const newErrors: any = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      valid = false;
    }
    if (!age.trim()) {
      newErrors.age = 'Age is required';
      valid = false;
    }
    if (!height.trim()) {
      newErrors.height = 'Height is required';
      valid = false;
    }
    if (!location.trim()) {
      newErrors.location = 'Location is required';
      valid = false;
    }
    if (!gender) {
      newErrors.gender = 'Please select a gender';
      valid = false;
    }
    if (!prompt2.trim()) {
      newErrors.prompt2 = 'This field is required';
      valid = false;
    }
    if (!goal.trim()) {
      newErrors.goal = 'Please enter your goal';
      valid = false;
    }

    const hasImage = images.some(img => img !== null);
    if (!hasImage) {
      newErrors.images = 'At least one profile picture is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleNext = () => {
    if (validateFields()) {
      const information ={
        fullName,
        age,
        height,
        location,
        gender,
        prompt2,
        goal,
        images,
      }
      navigation.navigate(ScreenNameEnum.InformationStepSecond, {
        information
      });
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backNavsPuple} label="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>20% completed</Text>
        </View>

        <Text style={styles.sectionTitle}>Basic Information</Text>

        {/* Full Name */}
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="black"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

        {/* Age */}
        <TextInput
          placeholder="Age"
          placeholderTextColor="black"
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}

        {/* Height */}
        <TextInput
          placeholder="Height"
          placeholderTextColor="black"
          style={styles.input}
          value={height}
          onChangeText={setHeight}
        />
        {errors.height ? <Text style={styles.errorText}>{errors.height}</Text> : null}

        {/* Location */}
        <TextInput
          placeholder="Location"
          placeholderTextColor="black"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}

        {/* Gender Dropdown */}
        <TouchableOpacity onPress={() => setGenderVisible(!genderVisible)} style={styles.input}>
          <Text style={{ color: gender ? 'black' : '#aaa' }}>
            {gender || 'Gender'}
          </Text>
        </TouchableOpacity>
        {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
        {genderVisible && (
          <View style={styles.dropdown}>
            {['Male', 'Female', 'Other'].map((item) => (
              <TouchableOpacity key={item} onPress={() => handleGenderSelect(item)} style={styles.dropdownItem}>
                <Text style={{ color: "black", fontSize: 14 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Prompt2 */}
        <TextInput
          placeholder="Prompt2"
          placeholderTextColor="black"
          style={styles.input}
          value={prompt2}
          onChangeText={setPrompt2}
        />
        {errors.prompt2 ? <Text style={styles.errorText}>{errors.prompt2}</Text> : null}

        {/* Goal */}
        <TextInput
          placeholder="Goal for this Year"
          placeholderTextColor="black"
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
        />
        {errors.goal ? <Text style={styles.errorText}>{errors.goal}</Text> : null}

        {/* Image Slots */}
        <Text style={styles.sectionTitle}>Profile Picture Upload</Text>
        <View style={styles.imageRow}>
          {images.map((img, index) => (
            <TouchableOpacity key={index} style={styles.imageBox} onPress={() => handleImagePick(index)}>
              {img ? (
                <Image source={{ uri: img.uri }} style={{ height: 55, width: 55 }} />
              ) : (
                <Text style={styles.plusText}>＋</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {errors.images ? <Text style={styles.errorText}>{errors.images}</Text> : null}
      </ScrollView>

      <CustomButton
        title={'Next'}
        onPress={handleNext}
        buttonStyle={{ marginHorizontal: 18, backgroundColor: "#F39C12" }}
      />
    </SafeAreaView>
  );
};

export default InformationStep;
