import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
 
const liveSessions = [
  {
    id: '1',
    title: 'Yoga for Beginners',
    instructor: 'Sarah Lee',
    time: 'Mon. Dec 24 - 18:00 - 23:00 PM',
    image:    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png',

    color: '#FF9F29',
  },
  {
    id: '2',
    title: 'Business Webinar',
    instructor: 'James Doe',
    time: 'Mon. Dec 24 - 18:00 - 22:00 PM',
    image:    'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png',

    color: '#FF9F29',
  },
  {
    id: '3',
    title: 'Healthy Cooking Tips',
    instructor: 'Chef Anna',
    time: 'Mon. Dec 24 - 18:00 - 23:00 PM',
    image:     'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png',

    color: '#C400C6',
  },
];

const JoinSessions = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const renderSession = ({ item }) => (
    <View style={styles.sessionCard}>
      <Image source={{ uri: item.image }} style={styles.sessionImage} />
      <View style={{ flex: 1 }}>
        <Text style={{
          color:"black",
          fontWeight:"600"
        }}>Business Webinar</Text>
        <Text style={styles.sessionTime}>{item.time}</Text>
        <TouchableOpacity style={[styles.joinBtn, { backgroundColor: "#F39C12" }]}>
          <Text style={styles.joinBtnText}>Join Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"

    }}>
        <StatusBarComponent/>
        <CustomHeader imageSource={imageIndex.backNavsPuple} label="Join Live Sessions" />
    <View style={styles.container}>
      <Calendar
        current={'2026-04-01'}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          '2026-04-15': { selected: true, selectedColor: 'purple' },
          
        }}
        theme={{
          selectedDayBackgroundColor: '#7E41FF',
          arrowColor: 'purple',
          todayTextColor: 'purple',
          textSectionTitleColor: '#888',
          dayTextColor: '#000',
          monthTextColor: 'purple',
        }}
        style={styles.calendar}
      /> 

      <Text style={styles.sectionTitle}>Live Sessions</Text>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={liveSessions}
        keyExtractor={item => item.id}
        renderItem={renderSession}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
    </SafeAreaView>
  );
};

export default JoinSessions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendar: {
    borderRadius: 10,
    elevation: 1, // Android shadow
    marginVertical: 20,
    marginHorizontal: 1,
    backgroundColor: 'white', // Required for shadow to be visible
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,   // a bit softer
        shadowRadius: 8,       // slightly wider blur
      },
      android: {
        elevation: 5,          // bumps the depth
        shadowColor: '#000',   // helps on Android 12+
      },
    }),
   },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sessionCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    // gap: 10,
 
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.12,   // a bit softer
    //     shadowRadius: 8,       // slightly wider blur
    //   },
      // android: {
        elevation: 5, // Increase for deeper shadow
        shadowColor: '#000', // Effective on Android 12+
        
        // Optional for future versions (or iOS fallback)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    //   },
    // }),
  },
  sessionImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  sessionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color:"balck"
  },
  instructor: {
    fontSize: 13,
    color: 'balck',
  },
  sessionTime: {
    fontSize: 13,
    color: '#8E44AD',
    marginVertical: 4,
  },
  joinBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  joinBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});