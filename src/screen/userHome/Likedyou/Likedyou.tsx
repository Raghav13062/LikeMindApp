import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent'; // Ensure path is correct
import { Usergetevents } from '../../../Api/apiRequest'; // Ensure path is correct

const { width } = Dimensions.get('window');

const UpcomingEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Filter only joined events
  const joinedEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];
    return events.filter(e => e?.joined === true); // Ensure boolean check
  }, [events]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      // Pass setIsLoading if your API function handles it, otherwise remove it from here
      const response = await Usergetevents(setIsLoading); 
      
      if (response?.data) {
         setEvents(response?.data);
      }
    } catch (error) {
      console.error("Events fetch error:", error);
    } finally {
      setIsLoading(false); // Fix: Stop loading here, do not setEvents(false)
    }
  };

  const renderEventCard = ({ item }) => {
    const typeColors = {
      Club: '#2b6ef6',
      Class: '#22c55e',
      Workshop: '#F39C12',
      Seminar: '#E74C3C'
    };

    return (
      <View style={[styles.card, styles.joinedCard]}>
        {/* 1. Compact Image (Left) */}
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/150' }} // Fallback image
          style={styles.compactImage}
        />

        {/* 2. Content Section (Right) */}
        <View style={styles.compactContent}>
          
          {/* Type and Title */}
          <View style={styles.typeAndTitleRow}>
            <Text style={[styles.typeBadge, { backgroundColor: typeColors[item.type] || '#64748b' }]}>
              {item.type || 'Event'}
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </View>

          {/* Host Name */}
          <Text style={styles.metaTextHost} numberOfLines={1}>
            Hosted by: <Text style={{fontWeight: 'bold', color:'#333'}}>{item.description || 'Unknown'}</Text>
          </Text>

          {/* 3. Date and Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📅</Text>
              <Text style={styles.statValue}>{item.date || 'Date TBD'}</Text>
            </View>
            
            {item.joinedCount && (
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>👥</Text>
                <Text style={styles.statValue}>{item.joinedCount} Joined</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Joined Events</Text>
        <View style={styles.headerLine} />
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#F39C12" />
        </View>
      ) : (
        <FlatList
          data={joinedEvents}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderEventCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyText}>You haven't joined any events yet.</Text>
              <Text style={styles.emptySubText}>Explore events to get started!</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default UpcomingEventsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Slightly lighter background
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- Header ---
  headerContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.5,
  },
  headerLine: {
    width: 40,
    height: 4,
    backgroundColor: '#F39C12',
    marginTop: 5,
    borderRadius: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  
  // --- Compact Card Styles ---
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row', // Horizontal Layout
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, // Slightly increased for better visibility
    shadowRadius: 8,
   },
  joinedCard: {
    borderLeftWidth: 5, // Left strip instead of full border looks cleaner
    borderLeftColor: '#F39C12',
  },
  compactImage: {
    width: 85,
    height: 85,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  compactContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  
  // Type Badge & Title
  typeAndTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeBadge: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  
  // Host Info
  metaTextHost: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },

  // Bottom Stats Row
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fefce8', // Subtle yellow tint bg
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});