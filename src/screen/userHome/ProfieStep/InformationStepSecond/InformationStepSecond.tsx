import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import CustomButton from '../../../../compoent/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

const interestsList = ['Fitness', 'Creative', 'Gaming', 'Business', 'DIY'];
const experienceLevels = ['Beginner', 'Intermediate', 'Expert'];

const InformationStepSecond = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
const roue:any = useRoute()
const {information} = roue?.params|| ""
console.log("information",information)
  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter(i => i !== item));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const navigation: any = useNavigation();

  const handleNext = () => {
    if (selectedInterests.length === 0) {
      setErrorMsg('Please select at least one interest.');
    } else {
      setErrorMsg('');
      navigation.navigate(ScreenNameEnum.InformationStepFour,{
        information:information,
        selectedInterests:selectedInterests

      });
      // navigation.navigate(ScreenNameEnum.InformationStepThird,{
      //   information:information,
      //   selectedInterests:selectedInterests

      // });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backNavsPuple} label="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.header}>Basic Information</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>40% completed</Text>
        </View>

        <Text style={styles.subHeader}>What are you interested in?</Text>
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

        {errorMsg !== '' && (
          <Text style={{ color: 'red', marginLeft: 18, marginBottom: 10 }}>{errorMsg}</Text>
        )}

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
      </ScrollView>

      <CustomButton
        title={'Next'}
        onPress={handleNext}
        buttonStyle={{ marginHorizontal: 18, backgroundColor: '#F39C12' }}
      />
    </SafeAreaView>
  );
};

export default InformationStepSecond;
