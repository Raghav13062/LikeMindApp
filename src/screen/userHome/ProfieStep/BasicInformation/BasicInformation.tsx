import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
 } from 'react-native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const interestsList = ['Fitness', 'Creative', 'Gaming', 'Business', 'DIY'];
const experienceLevels = ['Beginner', 'Intermediate', 'Expert', 'Not Sure'];
const connectionTypes = ['Learn', 'Find Partners', 'Guide Others'];

const BasicInformation = () => {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [connections, setConnections] = useState<string[]>([]);

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter(i => i !== item));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const toggleConnection = (type: string) => {
    if (connections.includes(type)) {
      setConnections(connections.filter(t => t !== type));
    } else {
      setConnections([...connections, type]);
    }
  };
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
      <StatusBarComponent/>
      <CustomHeader imageSource={imageIndex.backNavsPuple} label="Profile" />
    <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Basic Information</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>20% completed</Text>
      </View>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        placeholderTextColor={"black"}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
                placeholderTextColor={"black"}

        onChangeText={setLocation}
        style={styles.input}
      />

      <Text style={styles.subHeader}>Select Interests (1–3)</Text>
      <View style={styles.chipContainer}>
        {interestsList.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              selectedInterests.includes(item) && styles.chipSelected,
            ]}
            onPress={() => toggleInterest(item)}
          >
            <Text
              style={[
                styles.chipText,
                selectedInterests.includes(item) && styles.chipTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subHeader}>Experience Level (Optional)</Text>
      {experienceLevels.map(level => (
        <TouchableOpacity
          key={level}
          style={styles.checkboxRow}
          onPress={() => setExperience(level)}
        >
          <View style={styles.checkbox}>
            {experience === level && <View style={styles.checkedDot} />}
          </View>
          <Text style={styles.checkboxLabel}>{level}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.subHeader}>Connection Type</Text>
      {connectionTypes.map(type => (
        <TouchableOpacity
          key={type}
          style={styles.checkboxRow}
          onPress={() => toggleConnection(type)}
        >
          <View style={styles.checkbox}>
            {connections.includes(type) && <View style={styles.checkedDot} />}
          </View>
          <Text style={styles.checkboxLabel}>{type}</Text>
        </TouchableOpacity>
      ))}

      
    </ScrollView>
    <CustomButton
            title={'Next'}
           
            onPress={() => {
              navigation.navigate(ScreenNameEnum.InformationStep)
            }}
             buttonStyle={{ marginHorizontal: 18, backgroundColor:"#F39C12",   }}
          />
       
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor:"white"
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop:12
  },
  subHeader: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color:"black"
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    width: '20%',
    height: '100%',
    backgroundColor: '#9b5de5',
  },
  progressText: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    color: '#444',
  },
  input: {
   borderWidth: 1,
    borderColor: '#F7F8F8',
    backgroundColor: '#F7F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderColor: '#8E44AD',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  chipSelected: {
    backgroundColor: '#8E44AD',
  },
  chipText: {
    color: '#A000C8',
  },
  chipTextSelected: {
    color: '#fff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8E44AD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedDot: {
    width: 10,
    height: 10,
    backgroundColor: '#8E44AD',
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 14,
    color:"black"
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BasicInformation;