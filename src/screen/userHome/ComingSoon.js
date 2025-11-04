import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ComingSoon = () => {
  const [nextUpItem, setNextUpItem] = useState(null);
  const [userData, setUserData] = useState({
    name: 'Aman',
    events: [],
    expertClasses: [],
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const mockEvents = [
      {
        id: 'event1',
        type: 'event',
        title: 'Digital Marketing Workshop',
        date: new Date(Date.now() + 2 * 60 * 60 * 1000),
        location: 'Virtual',
        host: 'Marketing Pro',
        category: 'Marketing',
      },
      {
        id: 'event2',
        type: 'event',
        title: 'Networking Mixer',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        location: 'Downtown Hub',
        host: 'Community Team',
        category: 'Networking',
      },
    ];

    const mockClasses = [
      {
        id: 'class1',
        type: 'class',
        title: 'SEO Basics Masterclass',
        date: new Date(Date.now() + 1 * 60 * 60 * 1000),
        expert: 'Roger Ekstrom',
        topic: 'Search Engine Optimization',
        duration: '60 mins',
      },
      {
        id: 'class2',
        type: 'class',
        title: 'Content Strategy Deep Dive',
        date: new Date(Date.now() + 6 * 60 * 60 * 1000),
        expert: 'Dr. Singh',
        topic: 'Content Planning',
        duration: '90 mins',
      },
    ];

    setUserData({
      name: 'Aman',
      events: mockEvents,
      expertClasses: mockClasses,
    });

    findNextUpItem([...mockEvents, ...mockClasses]);
  };

  const findNextUpItem = (items) => {
    const now = new Date();
    const futureItems = items.filter((i) => i.date > now);
    if (futureItems.length === 0) return;
    const nextItem = futureItems.sort((a, b) => a.date - b.date)[0];
    setNextUpItem(nextItem);
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatTimeUntil = (date) => {
    const now = new Date();
    const diffMs = date - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (diffHours >= 24) {
      const days = Math.floor(diffHours / 24);
      return `In ${days} day${days > 1 ? 's' : ''}`;
    }
    if (diffHours > 0) return `In ${diffHours}h ${diffMinutes}m`;
    return `In ${diffMinutes}m`;
  };

  const getColor = (type) =>
    type === 'class' ? '#ff9500' : '#ff9500';

  const NextUpSection = () => {
    if (!nextUpItem) return null;
    const isClass = nextUpItem.type === 'class';
    const color = getColor(nextUpItem.type);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expert Class Up</Text>
        <View style={[styles.card, styles.nextUpCard, styles.shadow,{
          marginTop:14
        }]}>
          <View style={[styles.cardAccent, { backgroundColor: color }]} />
          <View style={styles.cardContent}>
            <View style={styles.nextUpHeader}>
              <View style={[styles.badge, { backgroundColor: color }]}>
                <Text style={styles.badgeText}>
                  {isClass ? 'EXPERT CLASS' : 'EVENT'}
                </Text>
              </View>
              <Text style={[styles.timeText, { color }]}>{formatTimeUntil(nextUpItem.date)}</Text>
            </View>

            <Text style={styles.nextUpTitle}>{nextUpItem.title}</Text>

            <View style={styles.detailRow}>
              <Icon name="clock-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{formatDateTime(nextUpItem.date)}</Text>
            </View>

            {isClass ? (
              <>
                <View style={styles.detailRow}>
                  <Icon name="account-tie" size={16} color="#666" />
                  <Text style={styles.detailText}>With {nextUpItem.expert}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="book-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    {nextUpItem.topic} ⋅ {nextUpItem.duration}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.detailRow}>
                  <Icon name="account" size={16} color="#666" />
                  <Text style={styles.detailText}>Hosted by {nextUpItem.host}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="map-marker-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{nextUpItem.location}</Text>
                </View>
              </>
            )}

            <TouchableOpacity style={[styles.button, { backgroundColor: color }]}>
              <Text style={styles.buttonText}>
                {isClass ? 'Join Class' : 'View Event Details'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const EventsSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={userData.events}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, styles.horizontalCard, styles.shadow]}>
            <View style={[styles.cardAccent, { backgroundColor: getColor(item.type) }]} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.detailRow}>
                <Icon name="calendar" size={14} color="#666" />
                <Text style={styles.detailText}>{formatDateTime(item.date)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="account" size={14} color="#666" />
                <Text style={styles.detailText}>{item.host}</Text>
              </View>
              <TouchableOpacity style={[styles.button, styles.outlineButton]}>
                <Text style={[styles.buttonText, { color: getColor(item.type) }]}>Join Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NextUpSection />
        <EventsSection />
      </ScrollView>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  seeAllText: {
    color: '#ff9500',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
   },
  cardAccent: {
    height: 4,
  },
  cardContent: {
    padding: 16,
  },
  nextUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  timeText: {
    fontWeight: '700',
    fontSize: 13,
  },
  nextUpTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 6,
  },
  button: {
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#ff9500',
    backgroundColor: '#fff',
  },
  horizontalCard: {
    width: 260,
    marginRight: 16,
  },
});
