import React, { useState } from 'react';
import { Image,ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import FabSpeedDial from '../../compoent/FabSpeedDial';
import useHome from './useHome';
import LoadingModal from '../../utils/Loader';
import ScreenNameEnum from '../../routes/screenName.enum';
import { JoinCommunityModal } from '../../compoent/JoinCommunityModal';
import YourScheduleEventModal from '../../compoent/YourScheduleEventModal';
 
const getCurrentDate = () => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'short' });
    const month = now.toLocaleDateString('en-US', { month: 'short' });
    const dateNum = now?.getDate();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${day}, ${month} ${dateNum} • ${time}`;
  };

  const NEXT_UP = { 
      title: "Yoga & Mindfulness", 
      date: getCurrentDate() 
  };
const SectionTitle = ({ title }: any) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);








const DaboardHome = () => {

  const { navigation,
    isLoading,
     event,  
     event1,
     isLogin,
    communitiesList, } = useHome()
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
 
 const ExpertCard = ({ item }:any) => {

  return (
    <TouchableOpacity
      style={[styles.expertCard, { backgroundColor: "#B3E5FC" }]}
      onPress={() => {
        navigation.navigate(ScreenNameEnum.MarketProfileDetails, {
          item: item,
        });
      }}
    >
      {/* IMAGE (uncomment if needed) */}
      {/* <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
      /> */}

      <Text style={styles.expertTime}>8:00 AM</Text>
      <Text style={styles.expertTopic}>{item.title}</Text>
      <Text style={styles.expertName}>{item.location}</Text>
    </TouchableOpacity>
  );
};


const CommunityChip = ({ item, index }: any) => (
  <TouchableOpacity
    onPress={() => {
      setSelected(item);
      setOpen(true);
    }}
    style={styles.communityChip}
  >
    <MaterialIcons
      name={item.icon || "group"}
      size={20}
      color="#6750A4"
    />

    <Text style={styles.communityName}>{item.name}</Text>

  </TouchableOpacity>
);
;
  const EventListItem = ({ item, isLast }: any) => {
     return(
        <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.MarketProfileDetails, {
          item: item
        })
      }}
      style={[styles.eventItem, !isLast && styles.eventBorder]} activeOpacity={0.7}>
      <MaterialIcons name="event-available" size={24} color="#6750A4" style={styles.eventIcon} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventSubText}>{item.date}{item.name}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
    )
  }
  const [open1, setOpen1] = useState(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? <LoadingModal /> : null}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerRight}>
          <Text style={styles.greetingText}>Hi, {isLogin?.user_data?.first_name}!</Text>
          {/* Custom Avatar */}
         <View style={styles.customAvatar}>
  {isLogin?.user_data?.image ? (
    <Image
      source={{ uri: isLogin?.user_data?.image }}
      style={{
         width: 40,
  height: 40,
  borderRadius: 20,
  resizeMode: "cover",
      }}
    />
  ) : (
    <MaterialIcons name="person" size={24} color="#fff" />
  )}
</View>

        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* 2. Your Next Up (Priority Card) */}
        <SectionTitle title="Your Next Up" />
        <View style={styles.nextUpCard}>
          <Text style={styles.nextUpTitle}>{NEXT_UP.title}</Text>
          <Text style={styles.nextUpDate}>{NEXT_UP.date}</Text>
        </View>

        {/* 3. Your Expert Schedule (Horizontal Scroll) */}
        <SectionTitle title="Your Expert Schedule" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {event1.map((item, index) => (
            <ExpertCard key={index} item={item} />
          ))}
        </ScrollView>

        {/* 4. Your Communities (Horizontal Scroll) */}
        <SectionTitle title="Your Communities" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {communitiesList.map((item) => (
            <CommunityChip item={item} />
          ))}
        </ScrollView>

        {/* 5. Your Events (Vertical List) */}
        <SectionTitle title="Your Events" />
        <View >
          {event.map((item, index) => (
            <EventListItem key={index} item={item} />
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <YourScheduleEventModal
        visible={open1}
        onClose={() => setOpen1(false)}
        // onSubmit={EventApicall}
      />
 <JoinCommunityModal visible={open} data={selected} onClose={() => setOpen(false)} />      <FabSpeedDial />
    </SafeAreaView>
  );
};
export default DaboardHome;