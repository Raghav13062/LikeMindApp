import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import DashBoardHeader from '../../../compoent/DashBoardHeader';
import SearchBar from '../../../compoent/SearchBar';
import imageIndex from '../../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useHoneShared from './useHoneShared';
import LoadingModal from '../../../utils/Loader';

// ✅ Custom Button (same file)
const CustomButton = ({ title, onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const HoneShared = () => {
  const { navigation, loading, getGroup } = useHoneShared();

  const [selectedEvent, setSelectedEvent] = useState(null); // ✅ modal ke liye
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <DashBoardHeader setting={false} />
      {loading ? <LoadingModal /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <SearchBar />

        {/* Groups Horizontal Scroll */}
        <Text style={styles.sectionTitle}>Groups</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        />

        <Text style={styles.sectionTitle}>Groups</Text>
        {getGroup?.map((item) => {
          return (
            <View key={item?.id} style={styles.eventCard}>
              <Image source={{ uri: item?.image }} style={styles.eventImage} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{item?.title}</Text>
                <Text style={styles.eventLocation}>{item?.location}</Text>
                <Text style={styles.eventTime}>Oct 15, 3:00 PM</Text>

                {/* ✅ Custom Button use */}
                <CustomButton
                  title="RSVP"
                  onPress={() => openModal(item)}
                  buttonStyle={styles.rsvpBtn}
                  textStyle={styles.rsvpText}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate(ScreenNameEnum.Creategroup)}
      >
        <Image
          source={imageIndex.addbutt}
          style={{ height: 80, width: 80, resizeMode: 'contain' }}
        />
      </TouchableOpacity>

      {/* ✅ Modal for Event Details */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Image
                  source={{ uri: selectedEvent?.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
                <Text style={styles.modalLocation}>
                  Location: {selectedEvent?.location}
                </Text>
                <Text style={styles.modalTime}>Date: Oct 15, 3:00 PM</Text>

                <CustomButton
                  title="Close"
                  onPress={closeModal}
                  buttonStyle={styles.closeBtn}
                  textStyle={styles.closeBtnText}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HoneShared;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
    color: '#333',
  },
  horizontalScroll: {
    marginBottom: 15,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  eventLocation: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  eventTime: {
    fontSize: 13,
    color: '#999',
  },
  rsvpBtn: {
    marginTop: 8,
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  rsvpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },

  // ✅ Default button style
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },

  // ✅ Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  modalLocation: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  modalTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  closeBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
