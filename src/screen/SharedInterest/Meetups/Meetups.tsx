// MeetupsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../../../compoent/SearchBar';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

 
const Meetups = () => {
  const [activeCategory, setActiveCategory] = useState('Nearby');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Meetups
  const fetchMeetups = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "No token found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch("https://onetenbd.com/likemind/api/get-meetups", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const json = await response.json();
console.log("Meetups response:", json);
      if (json.success) {
        setEvents(json.data || []);
      }  
    } catch (error) {
      console.error("Fetch meetups error:", error);
      Alert.alert("Error", "Something went wrong while fetching meetups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <View style={styles.container}>
        <Text style={styles.title}>Meetups</Text>
        <SearchBar />

        {/* Categories */}
        {/* <View style={styles.categoryContainer}>
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
        </View> */}

        {/* Loader */}
        {loading ? (
          <ActivityIndicator size="large" color="#A855F7" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardLocation}>{item.name}</Text>
                  <Text style={styles.cardTime}>{item.about}</Text>
                  <Text style={styles.price}>Price: ${item.price}</Text>
                </View>
                <TouchableOpacity style={styles.rsvpButton}>
                  <Text style={styles.rsvpText}>RSVP</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 30, color: "#555" }}>
                No meetups found
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Meetups;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center', color: "black" },
  categoryContainer: { flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between', marginTop: 11 },
  categoryButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#EDEDED', borderRadius: 20, marginRight: 8 },
  categoryActive: { backgroundColor: '#F39C12' },
  categoryText: { fontSize: 14, color: '#000' },
  categoryTextActive: { color: '#fff', fontWeight: '600' },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2,
  },
  cardImage: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  cardContent: { flex: 1 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  cardLocation: { color: '#6B7280', fontSize: 13 },
  cardTime: { color: '#9CA3AF', fontSize: 12, marginBottom: 4 },
  price: { color: "#16A34A", fontWeight: "600", fontSize: 13 },
  rsvpButton: { borderWidth: 1, borderColor: '#A855F7', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  rsvpText: { color: '#A855F7', fontWeight: 'bold', fontSize: 13 },
});
