import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import imageIndex from '../assets/imageIndex'; // adjust path as needed
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

const DashBoardHeader = ({ setting = true }: { setting?: boolean }) => {
  const nav = useNavigation();

  return (
    <View style={styles.header}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={imageIndex.appLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Right side icons */}
      <View style={styles.iconRow}>
        {setting && (
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              source={imageIndex.setting}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => nav.navigate(ScreenNameEnum.InformationStep)}
          style={styles.iconWrapper}
        >
          <Image
            source={imageIndex.profile}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper}>
          <Image
            source={imageIndex.notification}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashBoardHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
     backgroundColor: '#FFFFFF', // clean white background
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5', // subtle separator line
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 70,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginLeft: 20,
    padding: 8, // better touchable area
    borderRadius: 30,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
