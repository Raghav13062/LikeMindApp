import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import imageIndex from '../assets/imageIndex'; // adjust path as needed
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

const DashBoardHeader = ({ setting = true }: { setting?: boolean }) => {
  const nav = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={imageIndex.appLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

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
     paddingVertical: 12,
     marginHorizontal:12
     
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 128,
    height: 35,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginLeft: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
