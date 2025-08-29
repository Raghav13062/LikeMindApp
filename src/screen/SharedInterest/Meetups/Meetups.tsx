// MeetupsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import SearchBar from '../../../compoent/SearchBar';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

const categories = ['Nearby', 'Trending', 'Upcoming'];

const events = [
  {
    id: '1',
    title: 'Tech Meetup',
    location: 'San Francisco',
    time: 'Oct 15, 3:00 PM',
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: '2',
    title: 'Art Workshop',
    location: 'San Francisco',
    time: 'Oct 15, 3:00 PM',
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: '3',
    title: 'Startup Pitch',
    location: 'San Francisco',
    time: 'Oct 15, 3:00 PM',
    image:"https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const Meetups = () => {
  const [activeCategory, setActiveCategory] = useState('Nearby');

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
        <StatusBarComponent/>
    <View style={styles.container}>
      <Text style={styles.title}>Meetups</Text>
 <SearchBar/>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[
              styles.categoryButton,
              activeCategory === cat && styles.categoryActive,
            ]}>
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryTextActive,
              ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Events */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardLocation}>{item.location}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpText}>RSVP</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

export default Meetups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
    color:"black"
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 44,
  },
  filterButton: {
    padding: 8,
  },
  filterIcon: {
    fontSize: 18,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    marginTop:11
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    marginRight: 8,
    marginTop:10,marginBottom:11
  },
  categoryActive: {
    backgroundColor: '#F39C12',
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
 flexDirection: 'row',
  backgroundColor: 'white',
  borderRadius: 12,
  marginBottom: 16,
  padding: 12,
  alignItems: 'center',

  // Android shadow
  elevation: 3,
  marginVertical:1,


  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  marginHorizontal:4
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardLocation: {
    color: '#6B7280',
    fontSize: 13,
  },
  cardTime: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  rsvpButton: {
    borderWidth: 1,
    borderColor: '#A855F7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rsvpText: {
    color: '#A855F7',
    fontWeight: 'bold',
    fontSize: 13,
  },
});