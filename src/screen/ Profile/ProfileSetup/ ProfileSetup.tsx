import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ScrollView,
  SafeAreaView,
 } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
 import CustomButton from '../../../compoent/CustomButton';
 import styles from './style';
 import useAddTask from './useProfileSetup';
 import LoadingModal from '../../../utils/Loader';
import ErrorText from '../../../compoent/ErrorText';
import CustomHeader from '../../../compoent/CustomHeader';
import ScreenNameEnum from '../../../routes/screenName.enum';
 

const  ProfileSetup = () => {
const { 
  navigation,
     selectedValue,
    errors,  
    toggleDropdown,
    handleOptionSelect,
    desp, setdesp,
     VolunteersNumber, setVolunteersNumber,
   
     handleSubmit ,
     fullName,setfullName,
    isLoading,}= useAddTask()  
   return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
       <CustomHeader imageSource={imageIndex.backorange} label={"Profile Setup"} />
 
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileSection}>     
                     <Image
                     source={{ uri:  'https://randomuser.me/api/portraits/men/1.jpg' }} // Replace with your actual image
                     style={styles.avatar}
                 />
                    <TouchableOpacity style={styles.editButton} 
                    // onPress={()=>setIsModalVisible(true)}
                    >
                        <Image source={imageIndex.edit} resizeMode='contain' style={{
                            height: 28,
                            width: 28
                        }} />
                    </TouchableOpacity>
                </View>
     <Text style={styles.title}>Basic Information </Text>
        <View
          style={[styles.input,]}
        >
          <TextInput placeholderTextColor={"black"}
            style={{
              color: "black", fontSize: 14, marginLeft: 8
            }}
            multiline
            value={fullName}
            onChangeText={setfullName}
            placeholder="Full Name" />
        </View>
        {errors.fullName &&  <ErrorText message={errors.fullName}/>}
        <View
          style={[styles.input,]}
        >
          <TextInput placeholderTextColor={"black"}
            style={{
              color: "black", fontSize: 14, marginLeft: 8
            }}
            value={VolunteersNumber}
            onChangeText={setVolunteersNumber}
             keyboardType='decimal-pad'
             maxLength={2}
            placeholder="Age" />
        </View>
        {errors.VolunteersNumber &&  <ErrorText message={errors.VolunteersNumber}/>}
        {isLoading ? <LoadingModal /> : null}
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.rowView}>
          <View style={styles.dropView}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 8
              }}>{selectedValue?.name || "Location"}
              </Text>
            </View>
          </View>
         <Image source={imageIndex.arrowdown} style={{ height: 22, width: 22, }} resizeMode='contain' /> */}
        </TouchableOpacity>
             <Text style={styles.title}>Interests & Preferences</Text>
             <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.rowView}>
          <View style={styles.dropView}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 8
              }}>{ "What are your interests?"}
              </Text>
            </View>
          </View>
         <Image source={imageIndex.arrowdown} style={{ height: 22, width: 22, }} resizeMode='contain' />  
        </TouchableOpacity>
        <View
          style={[styles.input,]}
        >
          <TextInput placeholderTextColor={"black"}
            style={{
              color: "black", fontSize: 14, marginLeft: 8
            }}
            multiline
            value={fullName}
            onChangeText={setfullName}
            placeholder="Enter personal Goal" />
        </View>
        <View
          style={[styles.input, {
            height: 100,
           }]}
        >
          <TextInput placeholderTextColor={"black"}
            style={{
              color: "black", fontSize: 14, marginLeft: 8
            }}
            value={desp}
            onChangeText={setdesp}
            placeholder="Write a short Bio" />
        </View>
        {errors.desp &&  <ErrorText message={errors.desp}/>}
      </ScrollView>
      <CustomButton
        title={'Go to Home Dashboard'}
        // onPress={handleSubmit}       
             onPress={() =>                navigation.navigate(ScreenNameEnum.AddProfilePicture) }

        buttonStyle={{ marginHorizontal: 15, marginBottom: 10, backgroundColor:"#F39C12" }}
      />
      
          
    </SafeAreaView>
  );
};



export default  ProfileSetup;
