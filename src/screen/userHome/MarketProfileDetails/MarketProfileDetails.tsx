import React from 'react';
import {
  View,
  Text,
  Image,
   TouchableOpacity,
  ScrollView,
 } from 'react-native';
// Assuming these are the correct imports for your project structure
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import styles from './style'; // <-- Use the refined style
import useMarketProfile from './useMarketProfile';
import BokingConfirmModal from '../../../compoent/BokingConfirmModal';
import LoadingModal from '../../../utils/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
 
const MarketProfileDetails = () => {
const { navigation,
  submiFrom ,
  item ,
  bookModal, setbookModal ,
  loading}= useMarketProfile()

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? <LoadingModal /> : null}

      <StatusBarComponent/>
      <CustomHeader
        imageSource={imageIndex.backNavsPuple} label="Details" />
        
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
     
        {/* Profile Image */}
        <Image
          source={{
            uri:  item.image
          }}
          style={{
            height: 220, // Slightly taller image
            width: '100%',
            borderRadius: 12, // More rounded corners
            marginBottom: 20,
            resizeMode: 'cover',
            marginTop: 15,
          }}
        />

        {/* Name & Role */}
        <Text style={styles.name}>{item?.title}</Text>
        <Text style={styles.role}>{item?.name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.starText}>⭐️ 4.8</Text> 
          {/* Combine star and rating for a cleaner look */}
          <Text style={styles.ratingText}>(256 reviews)</Text>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            {item?.about}
          </Text>
        </View>

        {/* Services & Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services & Pricing</Text>

          {/* Service Row 1: Event Session */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon}/>
            <Text style={styles.priceLabel}> Event Session</Text>
            <Text style={styles.priceValue}>${item?.price}</Text>
          </View>

          {/* Service Row 2: Live Session */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon}/>
            <Text style={styles.priceLabel}>Live Session</Text>
            <Text style={styles.priceValue}>$0.00</Text>
          </View>

          {/* Service Row 3: 1-on-1 Coaching */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon}/>
            <Text style={styles.priceLabel}> 1-on-1 Coaching</Text>
            <Text style={styles.priceValue}>$0/month</Text>
          </View>

          {/* Service Row 4: VIP Group Membership */}
          <View style={styles.priceRow}>
            <Image source={imageIndex.rights} style={styles.priceIcon}/>
            <Text style={styles.priceLabel}> VIP Group Membership</Text>
            <Text style={styles.priceValue}>$0/month</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Book Button */}
      <TouchableOpacity 
        style={styles.bookButton}  
        onPress={() => {
          setbookModal(true);
        }}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>

      {/* Booking Confirmation Modal */}
      <BokingConfirmModal
        visible={bookModal}
        message="Do you want to confirm the Event booking?"
        onYesPress={() => {
          setbookModal(false);
          submiFrom()
        }}
        onNoPress={() => {
          setbookModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default MarketProfileDetails;