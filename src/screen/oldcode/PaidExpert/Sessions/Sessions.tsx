import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
 
const tabs = ['Live Sessions', 'Upcoming', 'Recorded '];

const sessionsa = [
  {
    title: 'How To Make Money In Real Estate',
    host: 'zainb.',
    time: 'Wed, 10:25 AM - Wed, 11:25 AM',
  },
  {
    title: 'Book Conversation: Start A Movement',
    host: 'Davis Korsgaard',
    time: 'Wed, 10:25 AM - Wed, 11:25 AM',
  },
];

const Sessions = () => {
  const [activeTab, setActiveTab] = useState('Live Sessions');

  return (
    <SafeAreaView style={{
      flex:1 ,
      backgroundColor:"white"
    }}>
          <StatusBarComponent />
     <View style={styles.container}>
  
      <View style={styles.tabs}>
  {tabs.map((tab) => (
    <TouchableOpacity
      key={tab}
      style={[
        styles.tabButtonNew,
        activeTab === tab && styles.activeTabButtonNew,
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text
        style={[
          styles.tabTextNew,
          activeTab === tab && styles.activeTabTextNew,
        ]}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      </View>

       <ScrollView contentContainerStyle={styles.sessionList}>
        {sessionsa.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <Text style={styles.host}>👤 Hosted by {session.host}</Text>
            <Text style={styles.time}>{session.time}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.goLiveBtn}>
                <Text style={styles.btnTextWhite}>Go Live Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlinedBtn}>
                <Text style={styles.btnTextOrange}>Edit Session</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlinedBtn}>
                <Text style={styles.btnTextOrange}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
 
    </SafeAreaView>
  );
};

export default Sessions;

const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
    padding: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  activeTabButton: {
    backgroundColor: '#FFA500',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
    fontSize:13
  },
  activeTabText: {
    color: '#fff',
  },
  sessionList: {
    gap: 1,
  },
   
  tabButtonNew: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  activeTabButtonNew: {
    backgroundColor: '#FFA500',
  },
  
  tabTextNew: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  
  activeTabTextNew: {
    color: 'white',
  }
  ,
  sessionCard: {
   backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  marginBottom:11,
  marginHorizontal:18,
  marginTop:12, 
  justifyContent:"center",

  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
  }),
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color:"black",
   },
  host: {
    fontSize: 14,
    color: 'black',
    marginBottom: 2,
  },
  time: {
    fontSize: 13,
    color: '#8E44AD',
    marginTop:4,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  goLiveBtn: {
    backgroundColor: '#FFA500',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
     marginRight: 6,
     justifyContent:"center",
     height:45,
  },
  outlinedBtn: {
    borderColor: '#FFA500',
    borderWidth: 1,
   paddingVertical: 4,
     borderRadius: 20,
     marginRight: 6,
     justifyContent:"center",
     height:45,
    flex: 1,
  },
  btnTextWhite: {
   color: 'white',
    textAlign: 'center',
     fontSize:12.5

  },
  btnTextOrange: {
    color: '#FFA500',
    textAlign: 'center',
     fontSize:12.5
  },
});