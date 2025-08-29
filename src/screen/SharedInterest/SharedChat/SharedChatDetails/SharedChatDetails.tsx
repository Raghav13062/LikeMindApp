import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image, ImageBackground,
  SafeAreaView
} from 'react-native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import imageIndex from '../../../../assets/imageIndex';
import styles from './style';
  
const SharedChatDetails = () => {
  const messages = [
    { id: '1', text: 'Hello ChatGPT, how are you today?', isSender: true },
    { id: '2', text: "Hello,i’m fine,how can i help you?", isSender: false },
     
  ];
 
  const navigation = useNavigation();
  return (
    <SafeAreaView 
      style={{ flex: 1 }}
    >
      <StatusBarComponent  backgroundColor="#8E44AD" barStyle='default'/>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{ marginRight: 15 }}>
         <Image source={imageIndex.backNavsPuple} style={{ height: 28, width: 28 }} />  
        </TouchableOpacity>
        <Image
         source={{ uri:   'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>Jenny Wilson</Text>
          <Text style={styles.onlineStatus}>• Online</Text>
        </View>
      </View>
 
      <View style={{ marginTop: 32 }} />
       <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View>
   
   
                <View  style={{
                  flexDirection:"row",
                  alignSelf:item.isSender  ?  'flex-end':"flex-start",
                 }}>
                  {/* {!item.isSender && (<Image
                    source={require('../../../assets/Cropping/userChatai.png')}
                    style={{
                      width: 27,
                      height: 27,
                      borderRadius: 20,
                      marginTop:60
                       
                    }}
                  />)} */}
   
                  <View
                    style={[
                      styles.chatBubble,
                      item.isSender ? styles.senderBubble : styles.receiverBubble,
                    ]}
                  >
   
                    <Text style={[styles.chatText, item.isSender && { color: '#fff' }]}>{item.text}</Text>
   
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={styles.chatList}
          />
 
   
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: "white",
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 30
      }}>
        <TextInput
          placeholder="Write your message"
          style={{
 
            borderRadius: 20,
            paddingHorizontal: 15,
            height: 40,
             marginHorizontal: 5,
            fontSize: 13,
            flex:1
          }}
          placeholderTextColor="rgba(161, 161, 161, 1)"
        />
        <TouchableOpacity style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
          {/* <Image
            source={require('../../../assets/Cropping/documentCopy.png')}
            style={{ height: 24, width: 24 }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
          {/* <Image
            source={require('../../../assets/Cropping/microphone.png')}
            style={{ height: 24, width: 24 }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
          <Image
            source={imageIndex.send}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>
 
      
    </SafeAreaView>
  );
};
 

 
export default SharedChatDetails;
 