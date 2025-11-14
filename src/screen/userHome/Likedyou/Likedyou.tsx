// UpcomingEventsScreen.js (Simplified & Compact UI)
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const UpcomingEventsScreen = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Club Meetup for Tech Enthusiasts',
      type: 'Club',
      hostName: 'Ram Gurjar',
      image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200',
      date: 'Nov 10, 2025',
      time: '11:00 AM',
      joined: true, // ✅ शामिल
      joinedCount: 45, // 👥 शामिल सदस्य
    },
     
    {
      id: '2',
      title: 'Cloud Workshop — Learn AWS Basics',
      type: 'Workshop',
      hostName: 'Rahul Singh',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
      date: 'Nov 20, 2025',
      time: '5:00 PM',
      joined: true, // ✅ शामिल
      joinedCount: 120, // 👥 शामिल सदस्य
    },
    {
      id: '3',
      title: 'React Native Advanced Class',
      type: 'Class',
      hostName: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1509062997943-f8ed36b76174?w=1200',
      date: 'Nov 25, 2025',
      time: '7:30 PM',
      joined: false, // ❌ शामिल नहीं (यह नहीं दिखेगा)
      joinedCount: 80, 
    },
  ]);

  // केवल जॉइन किए गए इवेंट्स को फ़िल्टर करें
  const joinedEvents = useMemo(() => 
    events.filter(e => e.joined), 
    [events]
  );
  
  const renderEventCard = ({ item }) => {
    const typeColors = {
      Club: '#2b6ef6',
      Class: '#22c55e',
      Workshop: '#F39C12',
    };

    return (
      <View style={[styles.card, styles.joinedCard]}> 
        {/* 1. कॉम्पैक्ट इमेज (बाएँ तरफ) */}
        <Image 
          source={{ uri: item.image }} 
          style={styles.compactImage} 
        />
        
        {/* 2. कंटेंट सेक्शन (दाएँ तरफ) */}
        <View style={styles.compactContent}>
          
          {/* टाइप और टाइटल */}
          <View style={styles.typeAndTitleRow}>
            <Text style={[styles.typeBadge, { backgroundColor: typeColors[item.type] || '#aaa' }]}>
              {item.type}
            </Text>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          
          {/* होस्ट का नाम */}
          <Text style={styles.metaTextHost} numberOfLines={1}>
            👤 Hosted by: **{item.hostName}**
          </Text>

          {/* 3. डेट, टाइम, और JOINED COUNT */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>📅 {item.date}</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>👥 {item.joinedCount}</Text>
                <Text style={styles.statLabel}>Joined</Text>
            </View>
          </View>

          {/* 4. व्यू डिटेल्स बटन (सिंपल) */}
          {/* <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() => console.log('View Details for:', item.id)}
          >
            <Text style={styles.viewDetailsText}>View Details</Text> 
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent/>
      <Text style={[styles.header, { color: '#F39C12' }]}>My Joined Events</Text> 

      {joinedEvents.length === 0 ? (
        <Text style={styles.emptyText}>You haven't joined any events yet.</Text>
      ) : (
        <FlatList
          data={joinedEvents} 
          keyExtractor={(item) => item.id}
          renderItem={renderEventCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default UpcomingEventsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: 20,
    fontWeight: '800', 
    marginVertical: 18,
    marginLeft: 16,
   },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#64748b',
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  // --- कॉम्पैक्ट कार्ड स्टाइल ---
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15, // मार्जिन कम किया
    overflow: 'hidden',
    borderWidth: 1, 
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05, // शैडो कम की
    shadowRadius: 6, 
    shadowOffset: { width: 0, height: 3 },
    
    // कार्ड को कॉम्पैक्ट बनाने के लिए FlexRow
    flexDirection: 'row', 
    padding: 10,
  },
  joinedCard: {
    borderColor: '#F39C12', // नारंगी बॉर्डर
    borderWidth: 2,
  },
  compactImage: {
    width: 80, // इमेज की चौड़ाई कम की
    height: 80, // इमेज की ऊँचाई कम की
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 10,
  },
  compactContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  typeAndTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeBadge: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 10, // फ़ॉन्ट साइज कम किया
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  title: {
    fontSize: 15, // टाइटल फ़ॉन्ट साइज कम किया
    fontWeight: '700',
    color: '#111827',
    flexShrink: 1, // टाइटल को छोटा होने की अनुमति
  },
  metaTextHost: {
    fontSize: 12, // होस्ट फ़ॉन्ट साइज कम किया
    color: '#475569',
    marginBottom: 6,
  },
  // स्टेटस रो: डेट और जॉइन काउंट
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginRight: 10,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    marginLeft: -8, // थोड़ा करीब लाने के लिए
  },
  // व्यू डिटेल्स बटन (छोटा और सरल)
  viewDetailsBtn: {
    backgroundColor: '#F39C12', 
    paddingVertical: 8, // पैडिंग कम की
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#fff', 
    fontWeight: '700',
    fontSize: 13, // फ़ॉन्ट साइज कम किया
  },
});