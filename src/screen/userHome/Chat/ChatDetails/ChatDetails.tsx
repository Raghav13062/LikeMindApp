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
 } from 'react-native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import imageIndex from '../../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
  
const ChatDetails = () => {
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
            flex:1,
            color:"black"
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
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    borderBottomWidth: 0.9,
    borderColor: "rgba(236, 236, 236, 1)",
    backgroundColor:"#8E44AD"
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 16,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 27
  },
  onlineStatus: {
    color: 'rgba(58, 191, 56, 1)',
    fontSize: 15,
    marginTop: 1,
    fontWeight: "500"
 
  },
  chatList: {
    flex: 1,
     marginHorizontal:20
  },
  chatBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: '75%',
  },
  senderBubble: {
 
    backgroundColor: '#8E44AD',
    alignSelf: 'flex-end',
    borderTopRightRadius: 1, // Adjust this value as needed
    marginTop: 20
 
  },
  receiverBubble: {
   
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 1,  // Adjust this value as needed
    borderTopRightRadius: 10, // Adjust this value as needed
    marginTop: 20
 
  },
  chatText: {
    color: '#333333',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  textInput: {
 
  },
  icon: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});
 
export default ChatDetails;
 