// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
// import imageIndex from '../../../../assets/imageIndex';

// const ChatDetails = () => {
//   const route: any = useRoute();
//   const { item } = route.params || {};
//   const navigation = useNavigation();

//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const flatListRef = useRef<FlatList>(null);

//   // ✅ Fetch Chat Messages
//   const fetchChats = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         console.warn('No token found');
//         return;
//       }

//       const myHeaders = new Headers();
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       const formdata = new FormData();
//       formdata.append('receiver_id', item?.id);

//       const response = await fetch(
//         'https://onetenbd.com/likemind/api/chats/get_chat',
//         {
//           method: 'POST',
//           headers: myHeaders,
//           body: formdata,
//         }
//       );

//       const result = await response.json();
//       if (result.success && Array.isArray(result.data)) {
//         setMessages(result.data.reverse()); // reverse to show latest at bottom
//       }
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Send Message
//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         console.warn('No token found');
//         return;
//       }

//       const myHeaders = new Headers();
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       const formdata = new FormData();
//       formdata.append('chat_receiver_id', item?.id);
//       formdata.append('chat_message', message.trim());
//       formdata.append('chat_type', 'TEXT');

//       const response = await fetch(
//         'https://onetenbd.com/likemind/api/chats/post_chat',
//         {
//           method: 'POST',
//           headers: myHeaders,
//           body: formdata,
//         }
//       );

//       const result = await response.json();
//       if (result.success) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: Date.now().toString(),
//             chat_message: message,
//             chat_sender_id: 'me', // temporary local sender
//             chat_receiver_id: item.id,
//             isSender: true,
//           },
//         ]);
//         setMessage('');
//         setTimeout(() => {
//           flatListRef.current?.scrollToEnd({ animated: true });
//         }, 200);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   const renderMessage = ({ item }: any) => {
//     const isSender = item.chat_sender_id || item.isSender;
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: isSender ? 'flex-end' : 'flex-start',
//           marginVertical: 5,
//         }}>
//         <View
//           style={[
//             styles.chatBubble,
//             isSender ? styles.senderBubble : styles.receiverBubble,
//           ]}>
//           <Text
//             style={[
//               styles.chatText,
//               isSender ? { color: '#fff' } : { color: '#000' },
//             ]}>
//             {item.chat_message}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <StatusBarComponent backgroundColor="#8E44AD" barStyle="light-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{ marginRight: 15 }}>
//           <Image
//             source={imageIndex.backNavsPuple}
//             style={{ height: 28, width: 28 }}
//           />
//         </TouchableOpacity>
//         <Image
//           source={{
//             uri:item?.image,
//           }}
//           style={styles.profileImage}
//         />
//         <View style={styles.headerInfo}>
//           <Text style={styles.userName}>{item?.first_name}</Text>
//          </View>
//       </View>

//       {/* Chat List */}
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderMessage}
//         contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
//         onContentSizeChange={() =>
//           flatListRef.current?.scrollToEnd({ animated: true })
//         }
//       />

//       {/* Input Bar */}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="Write your message..."
//             placeholderTextColor="#999"
//             style={styles.input}
//             value={message}
//             onChangeText={setMessage}
//           />
//           <TouchableOpacity onPress={sendMessage}>
//             <Image source={imageIndex.send} style={{ height: 24, width: 24 }} />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default ChatDetails;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 22,
//     backgroundColor: '#8E44AD',
//   },
//   profileImage: {
//     width: 45,
//     height: 45,
//     borderRadius: 20,
//   },
//   headerInfo: {
//     marginLeft: 16,
//   },
//   userName: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   onlineStatus: {
//     color: 'rgba(58, 191, 56, 1)',
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   chatBubble: {
//     padding: 10,
//     borderRadius: 15,
//     maxWidth: '75%',
//   },
//   senderBubble: {
//     backgroundColor: '#8E44AD',
//     borderTopRightRadius: 1,
//   },
//   receiverBubble: {
//     backgroundColor: '#F0F0F0',
//     borderBottomLeftRadius: 1,
//   },
//   chatText: {
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 10,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     fontSize: 14,
//     color: '#000',
//     paddingHorizontal: 10,
//   },
// });
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import imageIndex from '../../../../assets/imageIndex';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#FF9800'; // Orange
const TEXT_DARK = '#212121'; // Almost black
const TEXT_LIGHT = 'black';

const ChatDetails = () => {
  const route: any = useRoute();
  const { item } = route.params || {
    item: {
      id: 'mock_id_1',
      first_name: 'Design Innovation Hub',
      image: 'https://via.placeholder.com/150/FF9800/FFFFFF?text=DH',
    },
  };
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // --- Mock/Existing Logic ---
  useEffect(() => {
    // Mock Data
    setMessages([
      { id: 1, chat_message: "This new UI is really popping! I love the orange.", isSender: false, chat_sender_id: 'other', chat_sender_name: 'Priya' },
      { id: 2, chat_message: "Thanks! It brings a lot of energy to the discussion.", isSender: true, chat_sender_id: 'me' },
      { id: 3, chat_message: "Any recommendations for design tools?", isSender: false, chat_sender_id: 'other', chat_sender_name: 'Vikram' },
      { id: 4, chat_message: "Figma is the industry standard now.", isSender: true, chat_sender_id: 'me' },
    ].reverse());
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // Local update on success
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        chat_message: message,
        chat_sender_id: 'me',
        chat_receiver_id: item.id,
        isSender: true,
      },
    ]);
    setMessage('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };
  
  const handleConfirmLeave = () => {
    setIsModalVisible(false);
    console.log(`User confirmed leaving chat: ${item?.first_name}`);
    navigation.goBack();
  };

  const renderMessage = ({ item }: any) => {
    const isSender = item.isSender || item.chat_sender_id === 'me';
    const senderName = isSender ? 'You' : item.chat_sender_name || 'User';

    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderContainer : styles.receiverContainer,
        ]}>
        <View
          style={[
            styles.chatBubble,
            isSender ? styles.senderBubble : styles.receiverBubble,
          ]}>
          {/* Show sender name only for receiver in group chat */}
          {!isSender && (
            <Text style={styles.senderNameText}>{senderName}</Text>
          )}
          <Text
            style={[
              styles.chatText,
              isSender ? { color: TEXT_LIGHT } : { color: TEXT_DARK },
            ]}>
            {item.chat_message}
          </Text>
           {/* Placeholder for timestamp */}
           <Text style={[styles.timestampText, isSender ? { color: 'rgba(255, 255, 255, 0.7)' } : { color: '#888' }]}>
                1:45 PM
            </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      <StatusBarComponent   />

      {/* --- Orange Header --- */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIconContainer}>
          <MaterialIcons name="arrow-back" size={24} color={TEXT_LIGHT} />
        </TouchableOpacity>

        {/* Profile/Community Info */}
        <Image
          // source={{ uri: }}
                        source={{ uri:  'https://shawanoleader.com/wp-content/uploads/2024/11/Fotolia_66660956_Subscription_Monthly_M.jpg' }}

          style={styles.profileImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.userName} numberOfLines={1}>{item?.first_name ||"New Grop"}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="people" size={14} color={TEXT_LIGHT} />
            <Text style={styles.onlineStatus}> 25 Active Users</Text>
          </View>
        </View>
        
        {/* Leave Options */}
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.leaveButton}>
<MaterialIcons name="menu" size={26} color={TEXT_LIGHT} /> 
       </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatListContent}
        inverted
      />

      {/* --- Modern FAB Input Bar --- */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 20} // Adjusted offset
        style={styles.keyboardAvoidingView}>
        <View style={styles.inputContainerWrapper}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type your message..."
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                />
                <TouchableOpacity 
                    onPress={sendMessage} 
                    style={styles.sendButton}
                    disabled={!message.trim()}
                >
                    <MaterialIcons 
                        name="send" 
                        size={24} 
                        color={message.trim() ? PRIMARY_COLOR : '#ccc'} 
                    />
                </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>

      {/* --- Leave Confirmation Modal --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Leave Community?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to leave **{item?.first_name}**? You won't receive new messages.
            </Text>
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.textStyleCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonLeave]}
                onPress={handleConfirmLeave}
              >
                <Text style={styles.textStyleLeave}>Leave</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatDetails;

// --- New Orange Styles ---
const styles = StyleSheet.create({
    keyboardAvoidingView: {
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: Platform.OS === 'ios' ? 0 : 10, // Adjust bottom padding
    },
    // Header Styles
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "white",
        borderBottomLeftRadius: 15,
        borderBottomWidth:0.3,
        borderColor:"gary",
        borderBottomRightRadius: 15,
        
        ...Platform.select({
            ios: {
                shadowColor: TEXT_DARK,
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.15,
                shadowRadius: 3,
            },
            android: {
             },
        }),
    },
    headerIconContainer: {
        padding: 5,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 55,
        marginLeft: 10,
        // borderWidth: 2,
        // borderColor: TEXT_LIGHT,
    },
    headerInfo: {
        marginLeft: 12,
        flex: 1,
    },
    userName: {
        color: TEXT_LIGHT,
        fontSize: 18,
        fontWeight: '700',
    },
    onlineStatus: {
        color: 'black',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 4,
    },
    leaveButton: {
        padding: 5,
        marginLeft: 10,
    },

    // Chat List Styles
    chatListContent: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20, // More padding to separate list from FAB input
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    senderContainer: {
        justifyContent: 'flex-end',
    },
    receiverContainer: {
        justifyContent: 'flex-start',
    },

    // Bubble Styles (Box-like, modern)
    chatBubble: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        maxWidth: width * 0.8,
        minHeight: 38,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
     },
    senderBubble: {
        backgroundColor: PRIMARY_COLOR,
        borderBottomRightRadius: 2, // Slight emphasis on the sender side
    },
    receiverBubble: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 2, // Slight emphasis on the receiver side
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    
    // Text Styles
    senderNameText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginBottom: 4,
    },
    chatText: {
        fontSize: 15,
        lineHeight: 22,
    },
    timestampText: {
        fontSize: 10,
        marginTop: 5,
        textAlign: 'right',
    },

    // Input Bar Styles (FAB Style)
    inputContainerWrapper: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: Platform.OS === 'ios' ? 0 : 5, // Keep input slightly elevated on Android
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '95%',
        backgroundColor: TEXT_LIGHT,
        borderRadius: 25,
        padding: 4,
        // Stronger shadow for a floating effect
        ...Platform.select({
            ios: {
                shadowColor: TEXT_DARK,
                shadowOffset: { height: 4, width: 0 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
             },
        }),
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        fontSize: 15,
        color: TEXT_DARK,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'ios' ? 10 : 8,
        paddingBottom: Platform.OS === 'ios' ? 10 : 8,
        marginRight: 8,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F5F5F5', // Light background for the icon
        justifyContent: 'center',
        alignItems: 'center',
    },

    // --- Modal Styles ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        width: '85%',
     },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXT_DARK,
    },
    modalText: {
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 25,
        padding: 12,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonCancel: {
        backgroundColor: '#E0E0E0',
    },
    buttonLeave: {
        backgroundColor: PRIMARY_COLOR,
    },
    textStyleCancel: {
        color: TEXT_DARK,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    textStyleLeave: {
        color: TEXT_LIGHT,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});