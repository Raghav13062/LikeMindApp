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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BASE_URL = "https://onetenbd.com/likemind/api";  
const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#FF9800';
const TEXT_DARK = '#212121';
const TEXT_LIGHT = 'black';

const ChatDetails = () => {
  const route: any = useRoute();
  const { item } = route.params || {};
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  // ----------------------------------------------------
  // 🔵 GET CHAT LIST (GROUP CHAT)
  // ----------------------------------------------------
  const getChatMessages = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/chats/get_chat_group`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          community_id: item?.id,
        }),
      });

      const data = await res.json();
      console.log("data",data)
       if (data?.status === true) {
        setMessages(data?.data || []);
      }

    } catch (error) {
      console.log("GET CHAT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatMessages();
  }, []);

  // ----------------------------------------------------
  // 🔵 SEND MESSAGE API
  // ----------------------------------------------------
  const sendMessage = async () => {
    if (!message.trim()) return;
    const token = await AsyncStorage.getItem("token");

    try {
      // --- Add to UI instantly ---
      const newMsg = {
        id: Date.now(),
        chat_message: "55548555",
        chat_sender_id: "me",
        isSender: true,
      };

      setMessages((prev) => [newMsg, ...prev]);
      setMessage("");

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // --- API call ---
      const res = await fetch(`${BASE_URL}/chats/post_chat_group`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          community_id: item?.id,
          chat_message: "434487454575477",
        }),
      });

      const response = await res.json();
      console.log("SEND MESSAGE RESPONSE →", response);

      // Reload message list
      getChatMessages();

    } catch (error) {
      console.log("SEND MESSAGE ERROR:", error);
    }
  };

  const renderMessage = ({ item }: any) => {
    const isSender = item?.chat_sender_id === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderContainer : styles.receiverContainer,
        ]}
      >
        <View
          style={[
            styles.chatBubble,
            isSender ? styles.senderBubble : styles.receiverBubble,
          ]}
        >
          {!isSender && (
            <Text style={styles.senderNameText}>
              {item.chat_sender_name || "User"}
            </Text>
          )}

          <Text
            style={[
              styles.chatText,
              isSender ? { color: TEXT_LIGHT } : { color: TEXT_DARK },
            ]}
          >
            {item.chat_message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <StatusBarComponent />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIconContainer}
        >
          <MaterialIcons name="arrow-back" size={24} color={TEXT_LIGHT} />
        </TouchableOpacity>

        <Image source={{ uri: item?.image }} style={styles.profileImage} />

        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{item?.name || "Group"}</Text>
          <Text style={styles.onlineStatus}>0 Active Users</Text>
        </View>
      </View>

      {/* CHAT LIST */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatListContent}
        inverted
      />

      {/* MESSAGE INPUT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            onPress={sendMessage}
            disabled={!message.trim()}
            style={styles.sendButton}
          >
            <MaterialIcons
              name="send"
              size={24}
              color={message.trim() ? PRIMARY_COLOR : "#999"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetails;


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    elevation: 2,
  },
  headerIconContainer: { padding: 5 },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: 10,
  },
  headerInfo: { marginLeft: 10, flex: 1 },
  userName: { fontSize: 18, fontWeight: "700", color: TEXT_LIGHT },
  onlineStatus: { color: "gray", fontSize: 12 },

  chatListContent: { paddingHorizontal: 15, paddingBottom: 15 },

  messageContainer: { flexDirection: "row", marginVertical: 6 },
  senderContainer: { justifyContent: "flex-end", alignSelf: "flex-end" },
  receiverContainer: { justifyContent: "flex-start", alignSelf: "flex-start" },

  chatBubble: {
    padding: 12,
    maxWidth: width * 0.75,
    borderRadius: 12,
  },
  senderBubble: { backgroundColor: PRIMARY_COLOR },
  receiverBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  senderNameText: {
    fontSize: 12,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 3,
  },
  chatText: { fontSize: 15, lineHeight: 20 },

  keyboardAvoidingView: { padding: 5 },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: "flex-end",
        height:60,

   },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    height:60,
    fontSize: 15,
    color: "#000",
    
    paddingVertical: 10,
  },
  sendButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
