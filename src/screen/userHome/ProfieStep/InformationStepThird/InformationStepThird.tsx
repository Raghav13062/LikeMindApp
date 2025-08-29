import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

const options = [
  { id: '1', icon: '📖', label: 'Learn from others' },
  { id: '2', icon: '🤝', label: 'Help beginners' },
  { id: '3', icon: '❓', label: 'Looking for a casual partner' },
];

const InformationStepThird = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigation: any = useNavigation();

  const handleNext = () => {
    if (!selected) {
      setErrorMessage('Please select one option to continue');
    } else {
      setErrorMessage('');
      navigation.navigate(ScreenNameEnum.InformationStepFour);
    }
  };
  const roue:any = useRoute()
  const {information,selectedInterests} = roue?.params|| ""
  console.log("information",information)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backNavsPuple} label="Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressText}>40% completed</Text>
          </View>
          <Text style={styles.title}>Connection Style</Text>

          {options.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.optionContainer,
                selected === item.id && styles.optionSelected,
              ]}
              onPress={() => {
                setSelected(item.id);
                setErrorMessage('');
              }}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.optionText}>{item.label}</Text>
              <View style={styles.radioCircle}>
                {selected === item.id && <View style={styles.selectedRb} />}
              </View>
            </TouchableOpacity>
          ))}

          {errorMessage ? (
            <Text style={{ color: 'red', marginTop: 10, marginLeft: 10 }}>
              {errorMessage}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <CustomButton
        title={'Next'}
        onPress={handleNext}
        buttonStyle={{ marginHorizontal: 18, backgroundColor: '#F39C12' }}
      />
    </SafeAreaView>
  );
};

export default InformationStepThird;
