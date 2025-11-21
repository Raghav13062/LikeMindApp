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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const BASE_URL = "https://onetenbd.com/likemind/api";
const { width } = Dimensions.get('window');

const PRIMARY_COLOR = "#FF9800";
const BG_COLOR = "#F5F5F5";

const ChatDetails = () => {
  const route: any = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [myId, setMyId] = useState(""); 

  const flatListRef = useRef<FlatList>(null);

 

  // ------------ GET CHAT LIST -------------
  const getChatMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/chats/get_chat_group`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ community_id: item?.id }),
      });

      const data = await res.json();

      if (data?.status) {
        setMessages(data.data);
      }
    } catch (error) {
      console.log("GET CHAT ERROR:", error);
    }
  };
  const isLogin:any = useSelector <any>((state) => state?.auth?.userData);

  useEffect(() => {
     getChatMessages();
  }, []);

  // ------------ SEND MESSAGE -------------
  const sendMessage = async () => {
    if (!message.trim()) return;

    const token = await AsyncStorage.getItem("token");

    // Show instantly
    const tempMessage = {
      id: Date.now(),
      chat_message: message,
      chat_sender_id: isLogin?.user_data.id,
      isLocal: true,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setMessage("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      await fetch(`${BASE_URL}/chats/post_chat_group`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          community_id: item?.id,
          chat_message: tempMessage.chat_message,
        }),
      });

      // Refresh chat from backend
      getChatMessages();
    } catch (error) {
      console.log("SEND ERROR:", error);
    }
  };

  // ------------ RENDER MESSAGE -------------
  const renderMessage = ({ item: msg }: any) => {
    console.log("item",item)
 
  const  isOwner= isLogin?.user_data.id == item?.user_id ? true : false

    return (
      <View style={[styles.msgRow, isOwner ? styles.right : styles.left]}>
        {!isOwner && (
          <Image
            source={{ uri: item?.image }}
            style={styles.avatarSmall}
          />
        )}

        <View
          style={[
            styles.bubble,
            isOwner ? styles.senderBubble : styles.receiverBubble,
          ]}
        >
          <Text style={[styles.msgText, isOwner && { color: "white" }]}>
            {msg.chat_message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <Image source={{ uri: item?.image }} style={styles.avatar} />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.headerName}>{item?.name}</Text>
          <Text style={styles.headerStatus}>Active Users</Text>
        </View>
      </View>

      {/* CHAT LIST */}
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 15 }}
      />

      {/* MESSAGE INPUT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            onPress={sendMessage}
            disabled={!message.trim()}
            style={styles.sendBtn}
          >
            <MaterialIcons
              name="send"
              size={26}
              color={message.trim() ? PRIMARY_COLOR : "#AAA"}
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 10,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 5,
  },
  headerName: { fontSize: 18, fontWeight: "700", color: "#000" },
  headerStatus: { fontSize: 12, color: "gray" },

  msgRow: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "flex-end",
  },
  left: { alignSelf: "flex-start" },
  right: { alignSelf: "flex-end" },

  bubble: {
    maxWidth: width * 0.70,
    padding: 10,
    borderRadius: 12,
  },
  senderBubble: {
    backgroundColor: PRIMARY_COLOR,
    borderBottomRightRadius: 0,
  },
  receiverBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  msgText: { fontSize: 15, color: "black" },

  inputRow: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
