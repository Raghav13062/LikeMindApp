import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import DashBoardHeader from '../../../compoent/DashBoardHeader';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import SearchBar from '../../../compoent/SearchBar';
 
const Explore = () => {
  const nav = useNavigation()
  const features = [
    {
      title: 'Roger Ekstrom',
      desc: 'Connect with someone who shares your interest',
      icon: imageIndex.roger,
    },
    {
      title: 'Join or Create a community',
      desc: 'Join clubs or groups built around your passion',
      icon: imageIndex.join,
    },
    {
      title: 'Explore or create events around you',
      desc: 'See what’s happening near you',
      icon: imageIndex.calender,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent />
       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <Text style={[styles.sectionTitle,{
        textAlign:"center",
        fontSize:20
       }]}>Search </Text>

      <SearchBar/>
         <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Events </Text>
          {/* <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity> */}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {[1, 2].map((_, index) => (
            <View style={styles.eventCard} key={index}>
              <Image
                source={{
                  uri: 'https://www.milwaukeetool.co.nz/dw/image/v2/BCSS_PRD/on/demandware.static/-/Sites-mwt-master-catalog/default/dw6ef9b990/Storage/Soft-Storage/48228202/48228202_APP_02.png?sw=593&sh=593',
                }}
                style={styles.eventImage}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.eventTitle}>Webinars or Online...</Text>
                <Text style={styles.eventTime}>Mon, Dec 24 – 6:00 PM</Text>
              <View style={{
                flexDirection:"row",
                alignItems:"center"
              }}>
              <TouchableOpacity style={styles.joinButton} 
                onPress={()=>{
               nav.navigate(ScreenNameEnum.JoinSessions)
                }}
              >
                  <Text style={styles.joinText}>Join Now</Text>
                </TouchableOpacity>
               
              {/* <Image
                source={{
                  uri: 'https://www.milwaukeetool.co.nz/dw/image/v2/BCSS_PRD/on/demandware.static/-/Sites-mwt-master-catalog/default/dw6ef9b990/Storage/Soft-Storage/48228202/48228202_APP_02.png?sw=593&sh=593',
                }}
                style={{
                  height:22,
                  width:22 ,
                  marginLeft:22
                }}
              /> */}
              </View>
            
              </View>
              
            </View>
          ))}
        </ScrollView>
        
 <View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Partners with Shared Interests</Text>
  <TouchableOpacity>
    <Text style={styles.viewAll}>View all</Text>
  </TouchableOpacity>
</View>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
  {[{
    name: 'Jordyn Korsgaard',
    tag: 'Marathon Running',
    location: 'Grand Park, New York'
  }, {
    name: 'Cristofer Workman',
    tag: 'Marathon Running',
    location: 'Grand Park, New York'
  }].map((person, index) => (
    <View style={styles.peopleCard} key={index}>
      <Image
        source={{
          uri: 'https://www.milwaukeetool.co.nz/dw/image/v2/BCSS_PRD/on/demandware.static/-/Sites-mwt-master-catalog/default/dw6ef9b990/Storage/Soft-Storage/48228202/48228202_APP_02.png?sw=593&sh=593'
        }}
        style={styles.peopleAvatar}
      />
      <Text style={styles.peopleName}>{person.name}</Text>
      <Text style={styles.peopleLocation}>{person.location}</Text>
      <View style={styles.tag}>
      <Image
        source={imageIndex.location}
        style={{
          height:22,
          width:22
        }}
      />
         <Text style={styles.tagText}>{person.tag}</Text>
      </View>
      <TouchableOpacity style={styles.connectButtonPeople} 
      onPress={()=>{
        nav.navigate(ScreenNameEnum.FindAParter)
      }}
    
      >
        <Text style={styles.connectText}>Connect</Text>
      </TouchableOpacity>
    </View>
  ))}
</ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
};



export default Explore;