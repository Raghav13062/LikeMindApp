import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
 } from 'react-native';

import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import LoadingModal from '../../../utils/Loader';
import ErrorText from '../../../compoent/ErrorText';
import CustomHeader from '../../../compoent/CustomHeader';
import useEditProfile from './useEditProfile';
import styles from './style';
import ImagePickerModal from '../../../compoent/ImagePickerModal';
import DropdownModal from '../../../compoent/DropdownModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {
  const {
    navigation,
    isDropdownVisible, setDropdownVisible,
    location, setlocation,
    errors, 
    desp, setdesp,
    fullName, setfullName,
    Age, setAge,
     options ,
    handleSelect,
    isLoading ,
     modalVisible, setModalVisible ,
    imagePrfile ,
    takePhotoFromCamera ,
    pickImageFromGallery,
    isLogin,
    selectedOption ,
    bio, setbio,
    handleSubmit
    } = useEditProfile();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backorange} label="Profile" />
      {isLoading && <LoadingModal />}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
         <View style={styles.profileSection}>
          <Image
    source={imagePrfile ? { uri: imagePrfile?.path  ? imagePrfile?.path : "https://randomuser.me/api/portraits/men/1.jpg"} : { uri: isLogin?.user_data?.image }}
             style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton} 
          onPress={()=>{
            setModalVisible(true)
          }}
          >
            <Image
              source={imageIndex.edit}
              resizeMode="contain"
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <Text style={styles.title}>Basic Information</Text>

        {/* Full Name Input */}
        <View style={styles.input}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="black"
            style={{ color: 'black', fontSize: 14, marginLeft: 8 }}
            value={fullName}
            onChangeText={setfullName}
          />
        </View>
        {errors.fullName && <ErrorText message={errors.fullName} />}

        {/* Age Input */}
        <View style={styles.input}>
          <TextInput
            placeholder="Age"
            placeholderTextColor="black"
            style={{ color: 'black', fontSize: 14, marginLeft: 8 }}
            value={Age}
            onChangeText={setAge}
            keyboardType="decimal-pad"
            maxLength={2}
          />
        </View>
        {errors.Age && <ErrorText message={errors.Age} />}

        {/* Dropdown (e.g. city) */}
        {/* <TouchableOpacity onPress={()=>{
          setDropdownVisible(true)
        }} style={styles.rowView}>
          <View style={styles.dropView}>
            <Text style={{ color: 'black', fontSize: 14, marginLeft: 8 }}>
              {location?.name || 'Select City'}
            </Text>
          </View>
          <Image
            source={imageIndex.arrowdown}
            style={{ height: 22, width: 22 }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
          {/* <TextInput
            placeholder="location"
            placeholderTextColor="black"
            style={{ color: 'black', fontSize: 14, marginLeft: 8 }}
            value={location}
            onChangeText={setlocation}
            keyboardType="decimal-pad"
            maxLength={2}
          /> */}
          <View style={styles.input}>
          <TextInput
            placeholder="Location"
            placeholderTextColor="black"
            style={{ color: 'black', fontSize: 14, marginLeft: 8 }}
             value={location}
            onChangeText={setlocation}           
           />
        </View>
        {errors.location && <ErrorText message={errors.location} />}

        {/* Interests Section */}
        <Text style={styles.title}>Interests & Preferences</Text>

        {/* Interest Dropdown - Static Example */}
        <TouchableOpacity  onPress={()=>{
          setDropdownVisible(true)
        }} style={styles.rowView}>
          <View style={styles.dropView}>
            <Text style={{ color: 'black', fontSize: 14, marginLeft: 8 }}>
               {selectedOption ?  selectedOption:"Traveling"}
            </Text>
          </View>
          <Image
            source={imageIndex.arrowdown}
            style={{ height: 22, width: 22 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Description (Bio) */}
        <View style={styles.input}>
          <TextInput
            placeholder="Write a Short Bio"
            placeholderTextColor="black"
            multiline
            value={bio} // Consider using a `bio` state instead of fullName here
            onChangeText={setbio}
            style={{ color: 'black', fontSize: 14, marginLeft: 8 }}
          />
        </View>

        {/* Goal / Motivation */}
        <View style={[styles.input, { height: 100 }]}>
          <TextInput
            placeholder="Enter Personal Goal "
            placeholderTextColor="black"
            multiline
            value={desp}
            onChangeText={setdesp}
            style={{ color: 'black', fontSize: 14, marginLeft: 8 }}
          />
        </View>
        {errors.desp && <ErrorText message={errors.desp} />}
      </ScrollView>

      {/* Loader */}

      {/* Submit Button */}
      <CustomButton
        title="Update"
   onPress={handleSubmit}
        buttonStyle={{
          marginHorizontal: 15,
          marginBottom: 10,
          backgroundColor: '#F39C12',
        }}
      />
            <ImagePickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pickImageFromGallery={pickImageFromGallery}
        takePhotoFromCamera={takePhotoFromCamera}
      />
       <DropdownModal
        visible={isDropdownVisible}
        options={options}
        onClose={() => setDropdownVisible(false)}
        onSelect={handleSelect}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
