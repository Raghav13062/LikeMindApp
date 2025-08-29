import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './style';

const InformationStepFour = () => {
  const [selectedDay, setSelectedDay] = useState('16');
  const [selectedTime, setSelectedTime] = useState('');
  const [preferences, setPreferences] = useState({
    online: false,
    local: false,
    both: false,
  });

  const times = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const roue:any = useRoute()
  const {information,selectedInterests} = roue?.params|| ""
  console.log("information",information)
  
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const navigation:any = useNavigation()

  const renderCustomCheckbox = (checked: boolean) => (
    <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
      {checked && <View style={styles.checkboxTick} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
         <StatusBarComponent/>
         <CustomHeader imageSource={imageIndex.backNavsPuple} label="Profile" />
      <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>40% completed</Text>
        </View>

        {/* Weekly Calendar */}
        <Text style={styles.sectionTitle}>Weekly Calendar</Text>
        <FlatList
          data={[
            { date: '15', label: 'S' },
            { date: '16', label: 'M' },
            { date: '17', label: 'T' },
            { date: '18', label: 'W' },
            { date: '19', label: 'T' },
            { date: '20', label: 'F' },
            { date: '21', label: 'S' },
          ]}
          keyExtractor={item => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.dayBox, selectedDay === item.date && styles.dayBoxSelected]}
              onPress={() => setSelectedDay(item.date)}
            >
              <Text style={[styles.dayText, selectedDay === item.date && styles.selectedText]}>{item.date}</Text>
              <Text style={[styles.dayLabel, selectedDay === item.date && styles.selectedText]}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Time Options */}
        <Text style={styles.sectionTitle}>Preferred Time</Text>
        <View style={styles.timeRow}>
          {times.map(time => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                selectedTime === time && styles.timeOptionSelected,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={{ color: selectedTime === time ? '#fff' : '#8E44AD' }}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meetup Preferences */}
        <Text style={styles.sectionTitle}>Preferred Meetup</Text>
        <View style={styles.preferenceContainer}>
          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => togglePreference('online')}>
              {renderCustomCheckbox(preferences.online)}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Online Only</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => togglePreference('local')}>
              {renderCustomCheckbox(preferences.local)}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Local Meetups</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => togglePreference('both')}>
              {renderCustomCheckbox(preferences.both)}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Open to Both</Text>
          </View>
        </View>

        
      </View>
     
          </ScrollView>
          <CustomButton
            title={'Next'}
           
            onPress={() => {
              navigation.navigate(ScreenNameEnum.FAQ)
            }}
             buttonStyle={{ marginHorizontal: 18, backgroundColor:"#F39C12",   }}
          />
    </SafeAreaView>
  );
};

export default InformationStepFour;

