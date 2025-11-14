import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet,  TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import styles from './style';
import FabSpeedDial from '../../compoent/FabSpeedDial';
import useHome from './useHome';
import LoadingModal from '../../utils/Loader';
import ScreenNameEnum from '../../routes/screenName.enum';
 
 const NEXT_UP = { title: "Yoga & Mindfulness", date: "Wed, Oct 26 • 7:00 AM" };
const EXPERT_SCHEDULE = [
  { time: "8:00 AM", topic: "Pigma Basics", expert: "Sarah L", color: '#B3E5FC' },
  { time: "9:30 AM", topic: "AI in Design", expert: "Dr. Patel", color: '#FFF9C4' },
  { time: "11:00 AM", topic: "User Research", expert: "Jane D", color: '#F8BBD0' },
];
const COMMUNITIES = [
  { id: '1', name: 'Startup Hub', icon: 'business-center', unread: 2 },
  { id: '2', name: 'All Stack', icon: 'code' },
  { id: '3', name: 'Coffee Lovers', icon: 'local-cafe' },
];
const EVENTS = [
  { title: "Product Launch Party", date: "Nov 10", location: "Tech Park" },
  { title: "Community Clean-Up", date: "Nov 15", location: "Central Park" },
  { title: "Winter Hackathon", date: "Dec 2", location: "Dev 2. Online" },
];

// ------------------------------------------------------------------
// सहायक कंपोनेंट्स
// ------------------------------------------------------------------

const SectionTitle = ({ title }:any) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const ExpertCard = ({ item }) => {

   return(
    <View style={[styles.expertCard, { backgroundColor: '#B3E5FC'}]}>
    <Text style={styles.expertTime}>8:00 AM</Text>
    <Text style={styles.expertTopic}>{item.title}</Text>
    <Text style={styles.expertName}>{item.name}</Text>
  </View>
  )
}
const CommunityChip = ({ item }:any) => (
  <View style={styles.communityChip}>
    <MaterialIcons name={item.icon} size={20} color="#4CAF50" />
    <Text style={styles.communityName}>{item.name}</Text>
    {item.unread > 0 && (
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadText}>{item.unread}</Text>
      </View>
    )}
  </View>
);





const DaboardHome = () => {
 
 const {  navigation,
    isLoading,
    setIsLoading,
     event, setevent ,
     standoutList}= useHome()

     const EventListItem = ({ item, isLast }:any) => (
  <TouchableOpacity
   onPress={()=>{
            navigation.navigate(ScreenNameEnum.MarketProfileDetails,{
              item:item
            })
          }}
  style={[styles.eventItem, !isLast && styles.eventBorder]} activeOpacity={0.7}>
    <MaterialIcons name="event-available" size={24} color="#6750A4" style={styles.eventIcon} />
    <View style={styles.eventDetails}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventSubText}>{item.date}{item.name}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={24} color="#ccc" />
  </TouchableOpacity>
);
console.log("event",event)
  return (
    <SafeAreaView style={styles.safeArea}>
            {isLoading ? <LoadingModal /> : null}

       <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerRight}>
          <Text style={styles.greetingText}>Hi, Aman!</Text>
          {/* Custom Avatar */}
          <View style={styles.customAvatar}>
            <MaterialIcons name="person" size={24} color="#fff" />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* 2. Your Next Up (Priority Card) */}
        <SectionTitle title="Your Next Up" />
        <View style={styles.nextUpCard}>
          <Text style={styles.nextUpTitle}>{NEXT_UP.title}</Text>
          <Text style={styles.nextUpDate}>{NEXT_UP.date}</Text>
        </View>

        {/* 3. Your Expert Schedule (Horizontal Scroll) */}
        <SectionTitle title="Your Expert Schedule" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {event.map((item, index) => (
            <ExpertCard key={index} item={item} />
          ))}
        </ScrollView>

        {/* 4. Your Communities (Horizontal Scroll) */}
        <SectionTitle title="Your Communities" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {COMMUNITIES.map((item) => (
            <CommunityChip key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* 5. Your Events (Vertical List) */}
        <SectionTitle title="Your Events" />
        <View style={styles.verticalList}>
          {event.map((item, index) => (
            <EventListItem key={index} item={item}  />
          ))}
        </View>
        <View style={{ height: 100 }} /> 
      </ScrollView>

       <FabSpeedDial />
    </SafeAreaView>
  );
};
export default DaboardHome;