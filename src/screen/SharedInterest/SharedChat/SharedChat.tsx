import React from 'react';
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
import { SafeAreaView } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
 import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import styles from './style';
// import Icon from 'react-native-vector-icons/Ionicons';

 

const chatData = [
  { id: '1', name: 'Wilson Lubin', message: 'Typing...', time: '08:00am', typing: true },
  { id: '2', name: 'Marcus Kenter', message: 'Have you spoken to the delivery...', time: '08:30am', typing: false },
  { id: '3', name: 'Desirae Dias', message: 'Hello there!', time: '09:00am', typing: false },
];

const SharedChat = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{flex:1 ,backgroundColor:"white"}}>
      <StatusBarComponent/>
        
    <View style={styles.container}>
    <SearchBar/>

      <ScrollView showsVerticalScrollIndicator={false}>
          

        {/* Chats */}
        <Text style={styles.sectionTitle}>Chats</Text>
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
            
            onPress={() => navigation.navigate(ScreenNameEnum.SharedChatDetails)}

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

       
    </View>
    </SafeAreaView>
  );
};


export default SharedChat;
