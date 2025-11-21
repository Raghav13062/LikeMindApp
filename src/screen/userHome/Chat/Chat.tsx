import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import SearchBar from '../../../compoent/SearchBar';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import { UserGetCommunitiesApi } from '../../../Api/apiRequest';
import { useSelector } from 'react-redux';

const DiscoverGroupsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [allGroups, setAllGroups] = useState([]);  // full data fetched
  const [groups, setGroups] = useState([]);        // filtered / shown list
  const [searchText, setSearchText] = useState('');
        const isLogin: any = useSelector<any>((state) => state?.auth?.userData);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await UserGetCommunitiesApi(setLoading);
      const data = response?.data || [];
 const isOwner = isLogin?.user_data?.id === data?.user_id;
const filteredGroups = data?.filter(item => {
  return item.joined === true || isOwner === true;
});
 setAllGroups(filteredGroups);
setGroups(filteredGroups);
    } catch (error) {
      console.error('Community fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === '') {
       setGroups(allGroups);
      return;
    }

    const lowerText = text.toLowerCase();
    const filtered = allGroups.filter((group) => {
      const name = group.name?.toLowerCase() || '';
       return name.includes(lowerText) || desc.includes(lowerText);
    });

    setGroups(filtered);
  };

  const renderGroupCard = ({ item }:any) => {
    return (
      <TouchableOpacity
        style={styles.userCard}
        onPress={() =>
          navigation.navigate(ScreenNameEnum.ChatDetails, { item: item })
        }
      >
        <Image
          source={{
            uri:
              item.image ||
              'https://shawanoleader.com/wp-content/uploads/2024/11/Fotolia_66660956_Subscription_Monthly_M.jpg',
          }}
          style={styles.userImage}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {item?.name}
          </Text>
          <View style={styles.locationContainer}>
            <Text style={styles.userAddress} numberOfLines={1}>
                         Members

              {/* {item.members?.toLocaleString() || 0} Members */}
            </Text>
          </View>
        </View>
        <Image source={imageIndex.messageaActive} style={styles.chatArrow} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />

      <View style={styles.container}>
        {/* Search Bar */}
        <SearchBar
          placeholder="Search communities..."
          value={searchText}
          onSearchChange={handleSearch}
        />

        {/* ऊपर CTA बटन: Chat with your Communities */}
        <TouchableOpacity
          style={{
             padding: 12,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
         >
           
          <Text style={{right:8, fontSize: 16, fontWeight: '600', color: 'black' }}>
            Chat with your Communities
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your Communities</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#F39C12"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={groups}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGroupCard}
            ListEmptyComponent={
              <EmptyListComponent
                message={`No communities found${searchText ? ` for "${searchText}"` : ''}.`}
              />
            }
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiscoverGroupsScreen;
