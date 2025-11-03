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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import imageIndex from '../../../../assets/imageIndex';

const ChatDetails = () => {
  const route: any = useRoute();
  const { item } = route.params || {};
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  // ✅ Fetch Chat Messages
  const fetchChats = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn('No token found');
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append('receiver_id', item?.id);

      const response = await fetch(
        'https://onetenbd.com/likemind/api/chats/get_chat',
        {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
        }
      );

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setMessages(result.data.reverse()); // reverse to show latest at bottom
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Send Message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn('No token found');
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append('chat_receiver_id', item?.id);
      formdata.append('chat_message', message.trim());
      formdata.append('chat_type', 'TEXT');

      const response = await fetch(
        'https://onetenbd.com/likemind/api/chats/post_chat',
        {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
        }
      );

      const result = await response.json();
      if (result.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            chat_message: message,
            chat_sender_id: 'me', // temporary local sender
            chat_receiver_id: item.id,
            isSender: true,
          },
        ]);
        setMessage('');
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 200);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const renderMessage = ({ item }: any) => {
    const isSender = item.chat_sender_id || item.isSender;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: isSender ? 'flex-end' : 'flex-start',
          marginVertical: 5,
        }}>
        <View
          style={[
            styles.chatBubble,
            isSender ? styles.senderBubble : styles.receiverBubble,
          ]}>
          <Text
            style={[
              styles.chatText,
              isSender ? { color: '#fff' } : { color: '#000' },
            ]}>
            {item.chat_message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent backgroundColor="#8E44AD" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 15 }}>
          <Image
            source={imageIndex.backNavsPuple}
            style={{ height: 28, width: 28 }}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri:item?.image,
          }}
          style={styles.profileImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{item?.first_name}</Text>
         </View>
      </View>

      {/* Chat List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write your message..."
            placeholderTextColor="#999"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Image source={imageIndex.send} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    backgroundColor: '#8E44AD',
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
  },
  onlineStatus: {
    color: 'rgba(58, 191, 56, 1)',
    fontSize: 15,
    fontWeight: '500',
  },
  chatBubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: '75%',
  },
  senderBubble: {
    backgroundColor: '#8E44AD',
    borderTopRightRadius: 1,
  },
  receiverBubble: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 1,
  },
  chatText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 10,
  },
});
