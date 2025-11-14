// ClientsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { getgroups } from '../../../Api/apiPaidExperti';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tabs = ['Active', 'Past', 'Pending'];

const Clients = () => {
  const [getGroup, setgetGroup] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Active');

  useEffect(() => {
    fetchEventS();
  }, []);

  const fetchEventS = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);

    try {
      setLoading(true);
      const response = await getgroups(setLoading);
      if (response?.data) {
        console.log('response', response);
        setgetGroup(response.data);
      } else {
        console.warn('No response or invalid community data.');
      }
    } catch (error) {
      console.error('Community fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />

      <View style={styles.container}>
        <Text style={styles.heading}>Clients</Text>

        {/* Tabs */}
        {/* <View style={styles.tabs}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTab,
              ]}
            >
              <Text
                style={selectedTab === tab ? styles.activeText : styles.tabText}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {loading ? (
          <ActivityIndicator size="large" color="#F39C12" />
        ) : (
          <ScrollView style={styles.list}>
            {getGroup.length > 0 ? (
              getGroup.map(item => (
                <View key={item.id} style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.status}>{item.location}</Text>
                    <Text style={styles.lastInteraction}>
                      Created at: {item.created_at}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ color: 'gray', textAlign: 'center', marginTop: 20 }}>
                No clients found
              </Text>
            )}
          </ScrollView>
        )}
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
    color: 'black',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 30,
    padding: 5,
    marginTop: 10,
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
    borderWidth:0.8,
     marginHorizontal: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
         shadowColor: '#000',
         
      },
    }),
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
    color: 'black',
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
