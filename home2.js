import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet,  TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// MaterialIcons का उपयोग करें
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

// डमी डेटा (Dummy Data)
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

const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const ExpertCard = ({ item }) => (
  <View style={[styles.expertCard, { backgroundColor: item.color }]}>
    <Text style={styles.expertTime}>{item.time}</Text>
    <Text style={styles.expertTopic}>{item.topic}</Text>
    <Text style={styles.expertName}>{item.expert}</Text>
  </View>
);

const CommunityChip = ({ item }) => (
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

const EventListItem = ({ item, isLast }) => (
  <TouchableOpacity style={[styles.eventItem, !isLast && styles.eventBorder]} activeOpacity={0.7}>
    <MaterialIcons name="event-available" size={24} color="#6750A4" style={styles.eventIcon} />
    <View style={styles.eventDetails}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventSubText}>{item.date} • {item.location}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={24} color="#ccc" />
  </TouchableOpacity>
);

// ------------------------------------------------------------------
// मुख्य HomeScreen कंपोनेंट
// ------------------------------------------------------------------

const HomeScreen = () => {
  const [fabOpen, setFabOpen] = useState(false);

  // FAB Actions के लिए कस्टम स्पीड डायल
  const FabSpeedDial = () => (
    <View style={styles.fabContainer}>
      {fabOpen && (
        <View style={styles.fabMenu}>
          <TouchableOpacity style={styles.fabMenuItem} onPress={() => console.log('Create Community Pressed')}>
            <MaterialIcons name="group-add" size={24} color="#6750A4" />
            <Text style={styles.fabMenuText}>Create Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabMenuItem} onPress={() => console.log('Host Event Pressed')}>
            <MaterialIcons name="event" size={24} color="#6750A4" />
            <Text style={styles.fabMenuText}>Host Event</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => setFabOpen(!fabOpen)}
        activeOpacity={0.8}
      >
        <MaterialIcons name={fabOpen ? 'close' : 'add'} size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerRight}>
          <Text style={styles.greetingText}>Hi, Aman!</Text>
          {/* Custom Avatar */}
          <View style={styles.customAvatar}>
            <MaterialIcons name="person" size={24} color="#fff" />
          </View>
          {/* Custom IconButton */}
          <TouchableOpacity onPress={() => console.log('Notifications')} style={styles.customIconButton}>
            <MaterialIcons name="notifications-none" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* 2. Your Next Up (Priority Card) */}
        <SectionTitle title="Your Next Up" />
        <View style={styles.nextUpCard}>
          <Text style={styles.nextUpTitle}>{NEXT_UP.title}</Text>
          <Text style={styles.nextUpDate}>{NEXT_UP.date}</Text>
        </View>

        {/* 3. Your Expert Schedule (Horizontal Scroll) */}
        <SectionTitle title="Your Expert Schedule" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {EXPERT_SCHEDULE.map((item, index) => (
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
          {EVENTS.map((item, index) => (
            <EventListItem key={index} item={item} isLast={index === EVENTS.length - 1} />
          ))}
        </View>
        <View style={{ height: 100 }} /> {/* FAB के लिए जगह */}
      </ScrollView>

      {/* The Central "Create" Action Button (Custom FAB) */}
      <FabSpeedDial />
    </SafeAreaView>
  );
};

// ------------------------------------------------------------------
// स्टाइलशीट्स
// ------------------------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 20,
  },
  // Custom Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    marginRight: 10,
    fontSize: 16,
    color: '#666',
  },
  customAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6750A4', // प्रोफाइल आइकन का रंग
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  customIconButton: {
    padding: 4,
  },
  // Section Titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  // Next Up Card, Expert Card, Communities, Events List Styles... (पिछले कोड से अपरिवर्तित)
  nextUpCard: {
    backgroundColor: '#ff7b00',
    borderRadius: 12,
    padding: 20,
    alignItems: 'flex-start',
    elevation: 5,
  },
  nextUpTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  nextUpDate: {
    fontSize: 16,
    color: '#E6E0F0',
  },
  horizontalScroll: {
    marginVertical: 5,
  },
  expertCard: {
    width: 150,
    height: 100,
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  expertTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  expertTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  expertName: {
    fontSize: 12,
    color: '#555',
  },
  communityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  communityName: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#388E3C',
  },
  unreadBadge: {
    marginLeft: 8,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  eventBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventIcon: {
    marginRight: 15,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventSubText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  // Custom FAB/Speed Dial Styles
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'flex-end',
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6750A4', // प्राइमरी कलर
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fabMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fabMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  fabMenuText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default HomeScreen;