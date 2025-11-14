import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import imageIndex from '../assets/imageIndex';
import ScreenNameEnum from '../routes/screenName.enum';

const DashBoardHeader = () => {
  const nav = useNavigation();
  const isLogin: any = useSelector<any>((state) => state?.auth?.userData);
  const userName = isLogin?.user_data?.full_name || 'Aman';

  return (
    <View style={styles.headerContainer}>
      {/* Left side: Greeting */}
      <View>
        <Text style={styles.greetingText}>Hi, {userName}!</Text>
        <Text style={styles.subText}>Simple greeting and profile access.</Text>
      </View>

      {/* Right side: Profile Icon */}
      <TouchableOpacity
        style={styles.profileWrapper}
        // onPress={() => nav.navigate(ScreenNameEnum.InformationStep)}
                onPress={() => nav.navigate(ScreenNameEnum.EditProfile)}

      >
        <Image
          source={imageIndex.profile}
          style={styles.profileIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DashBoardHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },
  subText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  profileWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    padding: 6,
  },
  profileIcon: {
    width: 34,
    height: 34,
  },
});
