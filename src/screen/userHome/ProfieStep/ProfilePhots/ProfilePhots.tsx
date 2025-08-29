import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import styles from './style';

const ProfilePhots = () => {
  const navigation:any = useNavigation()

  const profileImages = [
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png',
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png',
    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png',
    'https://via.placeholder.com/60',
    'https://via.placeholder.com/60',
  ];

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
        <StatusBarComponent/>
        <CustomHeader imageSource={imageIndex.backNavsPuple} label="Profile" />
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Photos */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoRow}>
        {profileImages.map((uri, i) => (
          <Image key={i} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

      {/* Basic Info */}
      <Text style={styles.heading}>Basic information</Text>
      <TextInput placeholderTextColor={"black"} style={styles.input} placeholder="Amina Khan" />
      <TextInput style={styles.input} placeholderTextColor={"black"} placeholder="28" keyboardType="numeric" />
      <TextInput style={styles.input} placeholderTextColor={"black"} placeholder="Lahore, 54000" />
      <TextInput
      placeholderTextColor={"black"}
        style={styles.input}
        placeholder="Train for my first 10K run and meet workout..."
      />

      {/* Interests & Experience */}
      <Text style={styles.heading}>Your Interests & Experience</Text>
      <Text style={styles.chip}>💪 Fitness — Intermediate</Text>

      {/* Open To */}
      <Text style={styles.heading}>You're Open To</Text>
      <Text style={styles.chip}>📘 Learning from others</Text>

      {/* Availability */}
      <Text style={styles.heading}>When You're Free</Text>
      <View style={styles.dateRow}>
  {[
    { day: 'Sun', date: 14 },
    { day: 'Mon', date: 15 },
    { day: 'Tue', date: 16 },
    { day: 'Wed', date: 17 },
    { day: 'Thu', date: 18 },
    { day: 'Fri', date: 19 },
    { day: 'Sat', date: 20 },
  ].map((item, index) => (
    <View
      key={index}
      style={[styles.dateBox, item.date === 16 && styles.dateBoxActive]}
    >
      
      <Text style={item.date === 16 ? {
        color:"white"
      } : styles.dateText}>
        {item.date}
      </Text>
      <Text style={item.date === 16 ? {
        color:"white"
      } : styles.dayText}>
        {item.day.charAt(0)} {/* Show first letter of the day */}
      </Text>
    </View>
  ))}
</View>

      <View style={styles.timeRow}>
        <Text style={styles.timeChip}>Morning</Text>
        <Text style={styles.timeChip}>Afternoon</Text>
      </View>

      {/* Connection Type */}
      <Text style={styles.heading}>Preferred Connection Type</Text>
      <Text style={styles.chip}>🌐 Online</Text>

      {/* Prompts */}
      <Text style={styles.heading}>Get to Know Me</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What gets you excited to meet new people?</Text>
        <Text style={styles.cardText}>
          Meeting different life stories and sharing laughter.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>I’d love to try ______ with someone new</Text>
        <Text style={styles.cardText}>Morning hikes followed by smoothie stops</Text>
      </View>

 
    </ScrollView>
     {/* Edit Button */}
     <CustomButton
            title={'Edit'}
           
            onPress={() => {
              navigation.navigate(ScreenNameEnum.TabNavigator)
            }}
             buttonStyle={{ marginHorizontal: 18, backgroundColor:"#F39C12",   }}
          />
      
    </SafeAreaView>
  );
};



export default ProfilePhots;