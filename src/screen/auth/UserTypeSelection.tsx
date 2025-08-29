import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import imageIndex from '../../assets/imageIndex';
import { hp } from '../../utils/Constant';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomButton from '../../compoent/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
 
const UserTypeSelectionScreen = () => {
  const [selectedType, setSelectedType] = useState('beginner');

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const navigation:any = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
              <StatusBarComponent />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <Image
            source={imageIndex.appLogo}
            style={{ height: hp(7), width: '100%', marginVertical: 20 }} resizeMode='contain'
          />
        <Text style={styles.title}>User Type Selection Page</Text>
        <TouchableOpacity
          style={[
            styles.card,
            selectedType === 'beginner' && styles.cardSelected,
          ]}
          onPress={() => handleSelect('beginner')}
        >
            <Image source={imageIndex.beginnerBag} style={styles.logo}/>
           <View style={styles.cardTextContainer}>
            <Text style={[styles.cardTitle, selectedType === 'beginner' && styles.cardTitleSelected]}>
              Beginner-Friendly
            </Text>
            <Text style={[styles.cardSubtitle, selectedType === 'beginner' && styles.cardSubtitleSelected]}>
              Lorem ipsum dolor sit amet
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedType === 'partner' && styles.cardSelected,
          ]}
          onPress={() => handleSelect('partner')}
        >
            <Image source={imageIndex.shareRole} style={styles.logo}/>
            <View style={styles.cardTextContainer}>
            <Text style={[styles.cardTitle, selectedType === 'partner' && styles.cardTitleSelected]}>
              Shared Interest Partner
            </Text>
            <Text style={[styles.cardSubtitle, selectedType === 'partner' && styles.cardSubtitleSelected]}>
              Lorem ipsum dolor sit amet
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <CustomButton
            title={'Next'}
            onPress={() =>                navigation.navigate(ScreenNameEnum.ProfileSetup)

            }
             buttonStyle={{ marginHorizontal: 20,  marginTop: 30 }}
          />
    </SafeAreaView>
  );
};

export default UserTypeSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 45,
    height: 45,
   },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
  },
  cardSelected: {
    backgroundColor: '#1E0045',
  },
  cardTextContainer: {
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  cardTitleSelected: {
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  cardSubtitleSelected: {
    color: '#fff',
  },
   
});
