// UpcomingEventsScreen.js
import React, { useState } from 'react';
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
      title: 'Club Meetup',
      type: 'Club',
      hostName: 'Ram Gurjar',
      image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200',
      date: 'Nov 10, 2025',
      time: '11:00 AM',
      joined: true,
    },
     
    {
      id: '2',
      title: 'Cloud Workshop — ',
      type: 'Workshop',
      hostName: 'Rahul Singh',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
      date: 'Nov 20, 2025',
      time: '5:00 PM',
      joined: true,
    },
  ]);

  const handleJoin = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, joined: true } : e
      )
    );
  };

  const renderEventCard = ({ item }) => {
    const typeColors = {
      Club: '#2b6ef6',
      Class: '#22c55e',
      Workshop: '#f59e0b',
    };

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={styles.typeBadgeWrapper}>
            <Text style={[styles.typeBadge, { backgroundColor: typeColors[item.type] || '#aaa' }]}>
              {item.type}
            </Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.row}>
            <Text style={styles.metaText}>👤 {item.hostName}</Text>
            <Text style={styles.metaText}>📅 {item.date}</Text>
          </View>
          <Text style={styles.metaText}>⏰ {item.time}</Text>

          <TouchableOpacity
            style={[styles.joinBtn, item.joined && styles.joinedBtn]}
            disabled={item.joined}
            onPress={() => handleJoin(item.id)}
          >
            <Text style={[styles.joinText, item.joined && styles.joinedText]}>
              {item.joined ? 'Joined ✅' : 'Join Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent/>
      <Text style={styles.header}>Joined Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 12,
    marginLeft: 16,
    color: '#1e293b',
   },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
   },
  image: {
    width: CARD_WIDTH,
    height: 100,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  typeBadgeWrapper: {
    alignItems: 'flex-start',
  },
  typeBadge: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#475569',
  },
  joinBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  joinText: {
    color: '#fff',
    fontWeight: '700',
  },
  joinedBtn: {
    backgroundColor: '#e2e8f0',
  },
  joinedText: {
    color: '#475569',
  },
});
