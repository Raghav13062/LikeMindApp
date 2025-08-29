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
const { navigation,
  submiFrom ,
  item ,
  bookModal, setbookModal ,
  loading}= useMarketProfile()
  return (
    <SafeAreaView style={{
        flex:1 ,
        backgroundColor:"white"
    }}>
            {loading ? <LoadingModal /> : null}

        <StatusBarComponent/>
         <CustomHeader
                imageSource={imageIndex.backNavsPuple} label="Details" />
    <ScrollView contentContainerStyle={styles.container}>
     
      <Image
         source={{
            uri:  item.image
          }}
        style={styles.profileImage}
      />
      {/* Name & Role */}
      <Text style={styles.name}>{item?.title}</Text>
      <Text style={styles.role}>{item?.name}</Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.starText}>⭐️⭐️⭐️⭐️⭐️</Text>
        <Text style={styles.ratingText}> 0.0 (00 reviews)</Text>
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

        <View style={styles.priceRow}>
          <Image source={imageIndex.rights} style={{
            height:22,
            width:22
          }}/>
          <Text style={styles.priceLabel}> Event Session</Text>
          <Text style={styles.priceValue}>${item?.price}</Text>
        </View>

        <View style={styles.priceRow}>
          <Image source={imageIndex.rights} style={{
            height:22,
            width:22
          }}/>
          <Text style={styles.priceLabel}>Live Session</Text>
          <Text style={styles.priceValue}>$0.00</Text>
        </View>

        <View style={styles.priceRow}>
        <Image source={imageIndex.rights} style={{
            height:22,
            width:22
          }}/>
          <Text style={styles.priceLabel}> 1-on-1 Coaching</Text>
          <Text style={styles.priceValue}>$0/month</Text>
        </View>

        <View style={styles.priceRow}>
        <Image source={imageIndex.rights} style={{
            height:22,
            width:22
          }}/>
          <Text style={styles.priceLabel}> VIP Group Membership</Text>
          <Text style={styles.priceValue}>$0/month</Text>
        </View>
      </View>
    </ScrollView>
    <TouchableOpacity style={styles.bookButton}  
     onPress={() => {
      setbookModal(true);
    
    }}
    >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
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