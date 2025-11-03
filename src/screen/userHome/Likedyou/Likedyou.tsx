// Likedyou.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import LoadingModal from '../../../utils/Loader';
import useLikedyou from './useLikedyou';
import styles from './style';

const RequestItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
      </View>

      {/* Text Info */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.full_name || 'Mohan'}</Text>
        <Text style={styles.time}>{item.created_at}</Text>
      </View>

      {/* Like Button */}
      <TouchableOpacity style={styles.likeButton}>
        <Text style={styles.likeText}>❤️</Text>
      </TouchableOpacity>
    </View>
  );
};

const Likedyou = () => {
  const { likeYou, isLoading } = useLikedyou();

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingModal />}
      <StatusBarComponent />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.header}>Liked You</Text>

        <Text style={styles.sectionTitle}>New</Text>
        <View style={{ marginTop: 8 }}>
          {likeYou.map(item => (
            <RequestItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Likedyou;
