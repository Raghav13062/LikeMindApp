import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import SearchBar from '../../../compoent/SearchBar';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

const DiscoverGroupsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // all users from API
  const [filteredUsers, setFilteredUsers] = useState([]); // users after search
  const [searchText, setSearchText] = useState(''); // user input text

  // ✅ Fetch Users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn('No token found!');
        setLoading(false);
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch('https://onetenbd.com/likemind/api/get-social-users', requestOptions);
      const result = await response.json();

      if (result?.success && Array.isArray(result.data)) {
        setUsers(result.data);
        setFilteredUsers(result.data); // initially show all users
      } else {
        console.warn('No valid data received.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Search filter logic
  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === '') {
      setFilteredUsers(users);
      return;
    }

    const lowerText = text.toLowerCase();
    const filtered = users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name || ''}`.toLowerCase();
      const address = user.address ? user.address.toLowerCase() : '';
      return fullName.includes(lowerText) || address.includes(lowerText);
    });
    setFilteredUsers(filtered);
  };

  const renderUserCard = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate(ScreenNameEnum.ChatDetails, { item: item })}
    >
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/150' }}
        style={styles.userImage}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.userName}>
          {item.first_name} {item.last_name || ''}
        </Text>
        
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backNavsPuple} label="Chat" />

      <View style={styles.container}>
        {/* ✅ Pass onChange handler to SearchBar */}
        <SearchBar
          placeholder="Search users..."
          value={searchText}
          onSearchChange={handleSearch}
        />

        <Text style={styles.sectionTitle}>All Chats</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#8E44AD" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
          showsVerticalScrollIndicator={false}
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUserCard}
            ListEmptyComponent={<EmptyListComponent message="No users found." />}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiscoverGroupsScreen;
