import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';
import useMarketProfile from './useMarketProfile';
import BokingConfirmModal from '../../../compoent/BokingConfirmModal';
import LoadingModal from '../../../utils/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const MarketProfileDetails = () => {
  const {
    navigation,
    submiFrom,
    item,
    bookModal,
    setbookModal,
    loading
  } = useMarketProfile();

  console.log("Joined Status:", item?.joined);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && <LoadingModal />}

      <StatusBarComponent />
      <CustomHeader
        imageSource={imageIndex.backNavsPuple}
        label="Details"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Profile Image */}
        <Image
          source={{ uri: item.image }}
          style={{
            height: 220,
            width: '100%',
            borderRadius: 12,
            resizeMode: 'cover',
            marginTop: 15,
            marginBottom: 20,
          }}
        />

        {/* Name & Role */}
        <Text style={styles.name}>{item?.title}</Text>
        <Text style={styles.role}>{item?.name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.starText}>⭐️ 4.8</Text>
          <Text style={styles.ratingText}>(256 reviews)</Text>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>{item?.about}</Text>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services & Pricing</Text>

          {/* Service 1 */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon} />
            <Text style={styles.priceLabel}>Event Session</Text>
            <Text style={styles.priceValue}>${item?.price}</Text>
          </View>

          {/* Service 2 */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon} />
            <Text style={styles.priceLabel}>Live Session</Text>
            <Text style={styles.priceValue}>$0.00</Text>
          </View>

          {/* Service 3 */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon} />
            <Text style={styles.priceLabel}>1-on-1 Coaching</Text>
            <Text style={styles.priceValue}>$0/month</Text>
          </View>

          {/* Service 4 */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon} />
            <Text style={styles.priceLabel}>VIP Group Membership</Text>
            <Text style={styles.priceValue}>$0/month</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        {item?.joined === true ? (
          <View style={styles.joinedButton}>
            <Text style={styles.joinedButtonText}>Already Joined</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => setbookModal(true)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Confirmation Modal */}
      <BokingConfirmModal
        visible={bookModal}
        message="Do you want to confirm the Event booking?"
        onYesPress={() => {
          setbookModal(false);
          submiFrom();
        }}
        onNoPress={() => setbookModal(false)}
      />
    </SafeAreaView>
  );
};

export default MarketProfileDetails;
