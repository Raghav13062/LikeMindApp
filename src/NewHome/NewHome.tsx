import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Animated,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

  import useHome from './useHome'; 
import styles from './style'; 
import StatusBarComponent from '../compoent/StatusBarCompoent';
import DashBoardHeader from '../compoent/DashBoardHeader';

// --- MOCK DATA FOR PLACEHOLDERS (Replace with real logic) ---
const dummyUserData = {
  avatar: 'https://i.pravatar.cc/150?img=1',
  lessons: [
    { id: 'l1', topic: 'Lesson 3: SEO Basics', time: 'Tues, 2:00 PM', expert: 'Dr. Singh' },
    { id: 'l2', topic: 'Creative Writing', time: 'Creative 2:00 PM', expert: 'Dr. Singh' },
    { id: 'l3', topic: 'React Basics', time: 'Wed, 11 AM', expert: 'Alex P.' },
  ],
  groups: [
    { id: 'g1', title: 'Design Thinkers Club', icon: 'design-services', unread: 3 },
    { id: 'g2', title: 'React Native Devs', icon: 'code', unread: 0 },
    { id: 'g3', title: 'Morning Yoga Crew', icon: 'spa', unread: 1 },
  ],
  event: [
    {
      id: 'e1',
      type: 'event',
      title: 'Tech Talk: AI Ethics',
      time: 'Mon, 6:00 PM',
      location: 'Virtual',
      created_at: new Date(),
    },
    {
      id: 'e2',
      type: 'event',
      title: 'Networking Mixer',
      time: 'Wed, 7:30 PM',
      location: 'City Center',
      created_at: new Date(),
    },
  ],
  standoutList: [
    { id: 'p1', full_name: 'Sextstal', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 'p2', full_name: 'Cohiaty', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 'p3', full_name: 'Bumlite', image: 'https://i.pravatar.cc/150?img=4' },
    { id: 'p4', full_name: 'Aoulage', image: 'https://i.pravatar.cc/150?img=5' },
  ],
  nextUpItem: {
    id: 'nu1',
    type: 'event',
    title: 'Event Club',
    date: moment().add(3, 'hours').toDate(),
  },
};

// Placeholder for navigation constant
const ScreenNameEnum = {
  MarketProfileDetails: 'MarketProfileDetails',
  CommunitiesScreen: 'CommunitiesScreen',
  ExpertMarkertPlace: 'ExpertMarkertPlace',
  Creategroup:"Creategroup",
};



// --- 1. Priority / Your Next Up Section (The Gradient Card) ---
const PriorityCard = ({ item, nav }) => {
    if (!item) return null;
    const formattedTime = moment(item.date).format('ddd, MMM DD · h:mm A');

    return (
        <View style={styles.nextUpCardWrapper}>
            <View style={styles.nextUpGradient} /> 
            <View style={styles.nextUpContent}>
                <Text style={styles.nextUpLabel}>YOUR NEXT UP:</Text>
                <Text style={styles.nextUpTitle}>{item.title} · {formattedTime}</Text>
                <TouchableOpacity 
                    style={styles.nextUpButton}
                    onPress={() => nav.navigate(ScreenNameEnum.MarketProfileDetails, { item })}
                >
                    <Text style={styles.nextUpButtonText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- 2. Learning Schedule Card ---
const LessonCard = ({ lesson }) => (
    <View style={styles.lessonCard}>
        <Text style={styles.lessonTitle} numberOfLines={1}>{lesson.topic || 'Lesson Title'}</Text>
        <Text style={styles.lessonTime} numberOfLines={1}>{lesson.time || 'Tues, 2:00 PM'}</Text>
        <Text style={styles.lessonExpert} numberOfLines={1}>Expert: {lesson.expert || 'Dr. Singh'}</Text>
        <TouchableOpacity style={styles.lessonButton}>
            <Text style={styles.lessonButtonText}>View</Text>
        </TouchableOpacity>
    </View>
);

// --- 3. Community Card ---
const renderCommunityItem = ({ item }) => (
    <TouchableOpacity
        onPress={() => { /* Navigation to Community Details */ }}
        style={styles.communityCard}
    >
        <View style={styles.communityIcon}>
             <MaterialIcons name={item.icon || "design-services"} size={20} style={styles.communityIconInner} />
        </View>
        
        {item.unread && item.unread > 0 && (
            <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread} New</Text>
            </View>
        )}
        <Text style={styles.communityName} numberOfLines={2}>{item.title || "Design Thinkers"}</Text>
    </TouchableOpacity>
);

// --- 4. Event List Item (Horizontal) ---
const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventListItem}
        onPress={() => { /* Navigation to Event Details */ }}
    >
        <Text style={styles.eventListTitle} numberOfLines={1}>{item.title || "Evening Yoga Flow"}</Text>
        <Text style={styles.eventListTime} numberOfLines={1}>{item.time || moment(item.created_at).format('MMM DD, h:mm A')}</Text>
        <Text style={styles.eventListLocation} numberOfLines={1}>• {item.location || "City Park Studio"}</Text>
    </TouchableOpacity>
);

// --- 5. People & Exploration Item (Horizontal) ---
const renderPeopleItem = ({ item }) => (
    <TouchableOpacity style={styles.peopleAvatarContainer}
        onPress={() => { /* Navigation to Profile */ }}
    >
        <Image
            source={{ uri: item?.image || 'https://i.pravatar.cc/150?img=10' }}
            style={styles.peopleAvatar}
        />
        <Text style={styles.peopleNameLabel} numberOfLines={1}>{item?.full_name || "User Name"}</Text>
    </TouchableOpacity>
);

// --- 6. Central FAB (Floating Action Button - Speed Dial) ---
const CentralFAB = ({ nav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleOpen = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 250, 
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };
  
  // Adjusted translateY for better spacing (60px button + 15px space + 10px wrapper margin)
  const communityStyle = {
    transform: [{ scale: animation }, { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -75], }) }],
  };
  const hostEventStyle = {
    transform: [{ scale: animation }, { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -145], }) }],
  };
  const rotation = {
    transform: [{ rotate: animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'], }) }],
  };

  const handleAction = (screen) => {
    toggleOpen();
    setTimeout(() => nav.navigate(screen), 300); 
  };
 
  return (
    <View style={styles.fabContainer}>
      
      {/* Option 2: Host Event */}
      <Animated.View style={[styles.secondaryFabWrapper, hostEventStyle, { opacity: animation }]}>
         <TouchableOpacity style={[styles.secondaryFabButton, styles.fabEvent]}         onPress={() => handleAction(ScreenNameEnum.Creategroup)}
         > 
            <MaterialIcons name="event" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>

      {/* Option 1: Create Community */}
      <Animated.View style={[styles.secondaryFabWrapper, communityStyle, { opacity: animation }]}>
         <TouchableOpacity style={[styles.secondaryFabButton, styles.fabCommunity]} onPress={() => handleAction(ScreenNameEnum.CommunitiesScreen)}>
            <MaterialIcons name="groups" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>

      {/* Main FAB */}
      <TouchableOpacity style={styles.mainFabButton} onPress={toggleOpen}>
        <Animated.View style={rotation}>
            <Text style={styles.mainFabIcon}>+</Text>
        </Animated.View>
      </TouchableOpacity>
      
    </View>
  );
};


// --- Component: Community Empty State ---
const CommunityEmptyState = ({ nav }) => (
    <View style={styles.communityEmptyState}>
        <Text style={styles.communityEmptyText}>Haven't found your tribe yet?</Text>
        <Text style={styles.communityEmptyText}>Join a community or start your own!</Text>
        <TouchableOpacity 
            style={styles.communityEmptyButton} 
            onPress={() => nav.navigate(ScreenNameEnum.CommunitiesScreen)}
        >
             <Text style={styles.communityEmptyButtonText}>Explore Communities</Text>
        </TouchableOpacity>
    </View>
);


// --- MAIN HOME SCREEN ---
const NewHome = () => {
  const nav = useNavigation();
  // Using a mock hook structure for demonstration
  const useHome = () => ({ isLoading: false, event: dummyUserData.event, standoutList: dummyUserData.standoutList });
  const { isLoading, event, standoutList } = useHome(); 
  
  const [groups, setGroups] = useState(dummyUserData.groups); 
  const nextUpItem = dummyUserData.nextUpItem;
  const lessons = dummyUserData.lessons;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={styles.ACCENT_ORANGE} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
       <StatusBarComponent/>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.headerGreeting}>Hi, Aman!</Text>
        <Image source={{ uri: dummyUserData.avatar }} style={styles.headerAvatar} />
      </View>
      
       */}

      <StatusBarComponent />
          <DashBoardHeader />
      <ScrollView style={{marginTop:15}} showsVerticalScrollIndicator={false}>
        
        {/* 2. YOUR NEXT UP */}
        {nextUpItem && (
            <View style={styles.section}>
                <PriorityCard item={nextUpItem} nav={nav} />
            </View>
        )}
        
        {/* 3. Your Expert Schedule */}
        {lessons.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Expert Schedule</Text>
                <FlatList
                    data={lessons}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <LessonCard lesson={item} />}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.horizontalListContainer}
                />
            </View>
        )}

        {/* 4. Your Communities */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Communities</Text>
            {groups.length > 0 ? (
                <FlatList
                    data={groups}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderCommunityItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.horizontalListContainer}
                />
            ) : (
                <CommunityEmptyState nav={nav} />
            )}
        </View>


        {/* 5. Your Events */}
        {event.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Events</Text>
                <FlatList
                    data={event}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderEventItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.horizontalListContainer}
                />
            </View>
        )}
        
        {/* 6. People & Exploration */}
        <View style={[styles.section, { paddingBottom: 150 }]}>
            <Text style={styles.sectionTitle}>People & Exploration</Text>
            <FlatList
                data={dummyUserData.standoutList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderPeopleItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.peopleListContainer}
            />
        </View>

      </ScrollView>
      
      {/* 7. Floating Action Button */}
      <CentralFAB nav={nav} />
      
    </SafeAreaView>
  );
};

export default NewHome;