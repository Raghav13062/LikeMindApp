import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Assuming these imports work correctly in your project structure
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import LoadingModal from '../../../utils/Loader';
import useFindParter from '../FindAParter/useFindParter';

const { width } = Dimensions.get('window');

const FindAParter = () => {
  const { navigation, isLoading, LikeFunction, standoutList } = useFindParter();

  // For single profile, let's pick the first one from the list
  const profile = standoutList && standoutList.length > 0 ? standoutList[0] : null;

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBarComponent />
        <CustomHeader imageSource={imageIndex.backNavsPuple} label="Find a Partner" />
        <View style={styles.noProfileContainer}>
          <Text style={styles.noProfileText}>No profile available. Check back soon!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      {isLoading && <LoadingModal />}

      <CustomHeader   label="Find a Partner" />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileCard}>
          {/* Profile Image with Overlay */}
          <View style={styles.imageWrapper}>
             <Image 
                source={{ uri: profile.image }} 
                style={styles.profileImage} 
                accessibilityLabel={`${profile.first_name}'s profile photo`}
             />
             <View style={styles.imageOverlay} />
          </View>

          {/* Profile Info */}
          <View style={styles.infoContainer}>
            <View style={styles.headerInfo}>
                <Text style={styles.name}>{profile.first_name}</Text>
                {profile.age && <Text style={styles.ageText}>, {profile.age}</Text>}
            </View>
            
            <Text style={styles.address}>{profile.address}</Text>

            <View style={styles.separator} />

            {/* Additional Details */}
            {profile.profession && (
              <Text style={styles.detail}>
                <Text style={styles.detailLabel}>Profession:</Text> {profile.profession}
              </Text>
            )}
            
            {profile.bio && (
                <View style={styles.bioContainer}>
                    <Text style={styles.bioHeader}>About Me</Text>
                    <Text style={styles.bio}>{profile.bio}</Text>
                </View>
            )}

            {/* Like Button - Uses the vibrant friendly color */}
            <TouchableOpacity
              style={[styles.likeButton, profile.like_profile && styles.likedButton]}
              onPress={() => LikeFunction(profile.id)}
            >
              <Image
                source={profile.like_profile ? imageIndex.heart : imageIndex.circl1}
                style={styles.likeIcon}
              />
              <Text style={styles.likeText}>
                {profile.like_profile ? 'MATCHED!' : 'Like Profile'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindAParter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Very light background
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30, 
  },
  noProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProfileText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 18, 
    overflow: 'hidden',
    shadowColor: '#a9a9a9', // Softer shadow color
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 6,
  },
  imageWrapper: {
    width: '100%',
    height: width * 1.1, 
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)', 
  },
  infoContainer: {
    padding: 20,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 32, 
    fontWeight: '800', 
    color: '#333',
  },
  ageText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
  },
  address: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0', // Very light separator
    marginVertical: 12,
  },
  detail: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: '700', // Slightly bolder label
    color: '#1a1a1a', // Darker label for contrast
  },
  bioContainer: {
    marginTop: 16,
    paddingTop: 8,
  },
  bioHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  bio: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    fontStyle: 'italic', 
  },
  // --- BUTTON STYLES WITH NEW COLOR ---
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    // THE FRIENDLY ORANGE/GOLD COLOR
    backgroundColor: '#F39C12', 
    shadowColor: '#e67e22', // Shadow related to the button color
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  likedButton: {
    // Keep a classic success green for the 'Liked' state
    backgroundColor: '#2ecc71', 
    shadowColor: '#27ae60',
  },
  likeIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#fff', 
  },
  likeText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});