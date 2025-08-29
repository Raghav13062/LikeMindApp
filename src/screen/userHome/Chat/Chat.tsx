import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
   TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import SearchBar from '../../../compoent/SearchBar';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
 import StatusBarComponent from '../../../compoent/StatusBarCompoent';
 import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import styles from './style';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import { getgroups } from '../../../Api/apiPaidExperti';
import LoadingModal from '../../../utils/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';

 

const chatData = [
  { id: '1', name: 'Wilson Lubin', message: 'Typing...', time: '08:00am', typing: true },
  { id: '2', name: 'Marcus Kenter', message: 'Have you spoken to the delivery...', time: '08:30am', typing: false },
  { id: '3', name: 'Desirae Dias', message: 'Hello there!', time: '09:00am', typing: false },
];

const DiscoverGroupsScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [meetupData, setmeetupData] = useState([]);
  useEffect(()=>{
    fetchEventS()
  },[])

  const fetchEventS = async () => {
    try {
       const response = await getgroups(setLoading);
      if (response?.data) {
        setmeetupData(response.data)
      } else {
        console.warn("No response or invalid community data.");
      }
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex:1 ,backgroundColor:"white"}}>
      <StatusBarComponent/>
      {loading ? <LoadingModal /> : null}

         <CustomHeader
                
                
                imageSource={imageIndex.backNavsPuple} label="Discover Groups" />
    <View style={styles.container}>
    <SearchBar/>

      <ScrollView showsVerticalScrollIndicator={false}>
         <Text style={styles.sectionTitle}>Meetup Group</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
          {meetupData.map((item) => (
            <View key={item.id} style={styles.meetupCard}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <Text style={styles.meetupName}>{item.title}</Text>
              <Text style={styles.meetupName}>{item.location}</Text>
              {/* <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity> */}
            </View>
          ))}
        </ScrollView>

        {/* Chats */}
        <Text style={styles.sectionTitle}>Chats</Text>
        <FlatList
              ListEmptyComponent={<EmptyListComponent message="No Chat found." />}

          data={[]}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
            
            onPress={() => navigation.navigate(ScreenNameEnum.ChatDetails)}

            style={styles.chatItem}>
              <Image source={{ uri:   'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.chatAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={[styles.chatMessage, item.typing && { color: '#8E44AD',  }]}>
                  {item.message}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.chatTime}>{item.time}</Text>
                {item.typing && (
                  <View style={styles.chatBadge}>
                    <Text style={styles.chatBadgeText}>3</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Floating Button */}
      {/* <TouchableOpacity style={styles.floatingButton} 
      
      onPress={()=>navigation.navigate(ScreenNameEnum.CommunitiesScreen)}
      > 
        <Image source={imageIndex.addbutt} 
        style={{
          height:80,
          width:80,
          resizeMode:"contain"
        }} 
        />
       </TouchableOpacity> */}
    </View>
    </SafeAreaView>
  );
};


export default DiscoverGroupsScreen;
