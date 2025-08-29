// ClientsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

const tabs = ['Active', 'Past', 'Pending'];
const clients = [
  {
    id: 1,
    name: 'Roger Ekstrom',
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    status: 'Active',
    lastInteraction: 'Oct 5, 2023',
  },
  {
    id: 2,
    name: 'Gretchen Curtis',
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    status: 'Active',
    lastInteraction: 'Oct 5, 2023',
  },
  {
    id: 3,
    name: 'Craig Torff',
    image:"https://randomuser.me/api/portraits/women/2.jpg",
    status: 'Active',
    lastInteraction: 'Oct 5, 2023',
  },
  {
    id: 4,
    name: 'Zaire Vaccaro',
     status: 'Active',
    lastInteraction: 'Oct 5, 2023',
        image:"https://randomuser.me/api/portraits/women/2.jpg",

  },
];

const Clients = () => {
  const [selectedTab, setSelectedTab] = useState('Active');

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
                <StatusBarComponent />

    <View style={styles.container}>
      <Text style={styles.heading}>Clients</Text>

      <View style={styles.tabs}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTab,
            ]}
          >
            <Text style={selectedTab === tab ? styles.activeText : styles.tabText}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.list}>
        {clients.map(client => (
          <View key={client.id} style={styles.card}>
            <Image source={{uri:client.image}} style={styles.image} />
            <View>
              <Text style={styles.name}>{client.name}</Text>
              <Text style={styles.status}>Active</Text>
              <Text style={styles.lastInteraction}>
                Last interaction: {client.lastInteraction}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default Clients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color:"black",
  
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 30,
    padding: 5,
    marginTop:10
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
  },
  activeTab: {
    backgroundColor: '#F39C12',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  card: {
  flexDirection: 'row',
  backgroundColor: 'white',
  padding: 15,
  borderRadius: 16,
  marginBottom: 15,
  alignItems: 'center',
  marginHorizontal: 2,
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,   // a bit softer
      shadowRadius: 8,       // slightly wider blur
    },
    android: {
      elevation: 5,          // bumps the depth
      shadowColor: '#000',   // helps on Android 12+
    },
  }),

  // Optional: spacing between items (gap for older React Native versions)
  // Use this only if you're on RN 0.71+ which supports 'gap'
  gap: 12,

  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 5,
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
    color:"black"
  },
  status: {
    color: 'green',
    marginTop: 4,
  },
  lastInteraction: {
    color: '#8E44AD',
    fontSize: 13,
    marginTop: 2,
  },
});