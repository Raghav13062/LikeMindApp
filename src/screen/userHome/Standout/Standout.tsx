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
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import LoadingModal from '../../../utils/Loader';
import useFindParter from '../FindAParter/useFindParter';

const { width } = Dimensions.get('window');

const FindAParter = () => {
  const { navigation, isLoading, LikeFunction, standoutList } = useFindParter();

  // For single profile, let's pick the first one from the list
  const profile = standoutList[0];

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBarComponent />
        <CustomHeader imageSource={imageIndex.backNavsPuple} label="Find a Partner" />
        <View style={styles.noProfileContainer}>
          <Text style={styles.noProfileText}>No profile available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      {isLoading && <LoadingModal />}

      <CustomHeader imageSource={imageIndex.backNavsPuple} label="Find a Partner" />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileCard}>
          {/* Profile Image */}
          <Image source={{ uri: profile.image }} style={styles.profileImage} />

          {/* Profile Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{profile.first_name}</Text>
            <Text style={styles.address}>{profile.address}</Text>

            {/* Additional Details */}
            {profile.age && <Text style={styles.detail}>Age: {profile.age}</Text>}
            {profile.profession && (
              <Text style={styles.detail}>Profession: {profile.profession}</Text>
            )}
            {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

            {/* Like Button */}
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => LikeFunction(profile.id)}
            >
              <Image
                source={profile.like_profile ? imageIndex.heart : imageIndex.circl1}
                style={styles.likeIcon}
              />
              <Text style={styles.likeText}>
                {profile.like_profile ? 'Liked' : 'Like'}
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
    backgroundColor: '#f5f6fa',
  },
  contentContainer: {
    padding: 16,
  },
  noProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProfileText: {
    fontSize: 18,
    color: '#777',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: width * 0.8,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  address: {
    fontSize: 16,
    color: '#777',
    marginVertical: 4,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  likeIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  likeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
