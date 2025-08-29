import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
   FlatList
} from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import DashBoardHeader from '../../../compoent/DashBoardHeader';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useHome from './useHome';
import LoadingModal from '../../../utils/Loader';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
 
const Home = () => {
  const nav = useNavigation() 
  const {    navigation,
    isLoading,
      event,  standoutList,
 
     }= useHome()
  const features = [
    {
      title: 'Roger Ekstrom',
      desc: 'Connect with someone who shares your interest',
      icon: imageIndex.roger,
      scree:ScreenNameEnum.ExpertMarkertPlace
    },
    {
      title: 'Join or Create a community',
      desc: 'Join clubs or groups built around your passion',
      icon: imageIndex.join,
      scree:ScreenNameEnum.CommunitiesScreen

    },
    {
      title: 'Explore or create events around you',
      desc: 'See what’s happening near you',
      icon: imageIndex.calender,
      scree:ScreenNameEnum.CommunitiesScreen

    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading ? <LoadingModal /> : null}

      <StatusBarComponent />
          <DashBoardHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View  >
          {features.map((item:any, index:any) => (
            <TouchableOpacity 
            
            onPress={()=>{
              nav.navigate(item?.scree)

            }}
            style={styles.card} key={index}>
              <Image source={item.icon} style={styles.featureIcon} />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

    
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Events happening soon</Text>
          <TouchableOpacity 
            onPress={()=>{
              nav.navigate(ScreenNameEnum.ExpertMarkertPlace)
                }}
          >
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        </ScrollView>
          <FlatList
        data={event}
        showsHorizontalScrollIndicator={false}
        horizontal
        ListEmptyComponent={<EmptyListComponent message="No Event found." />}

        renderItem={((item:any)=>{


  const rawDate = item?.item?.created_at;

  const formattedDate = moment(rawDate).format('ddd, MMM DD – h:mm A');
          return(
            <View style={styles.eventCard}  >
                <Image
                  source={{
                    uri:  item?.item?.image,
                  }}
                  style={styles.eventImage}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.eventTitle}>{item?.item?.title}</Text>
                  <Text style={styles.eventTime}>{formattedDate}</Text>
                <View style={{
                  flexDirection:"row",
                  alignItems:"center"
                }}>
                <TouchableOpacity style={styles.joinButton} 
                  onPress={()=>{
                nav.navigate(ScreenNameEnum.MarketProfileDetails,{
                  item:item?.item
                })
                //  nav.navigate(ScreenNameEnum.JoinSessions)
                  }}
                >
                    <Text style={styles.joinText}>Join Now</Text>
                  </TouchableOpacity>
                
                </View>
              
                </View>
                
              </View>
          )
        })}
        keyExtractor={(item) => item.id}
      />

 <View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>People You Might Like to Connect With</Text>
  <TouchableOpacity onPress={()=>navigation.navigate(ScreenNameEnum.FindAParter)}>
    <Text style={styles.viewAll}>View all</Text>
  </TouchableOpacity>
</View>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
 <FlatList
      data={standoutList}
      showsHorizontalScrollIndicator={false}
      horizontal
      ListEmptyComponent={<EmptyListComponent message="No Event found." />}

      renderItem={((person:any)=>{
        const item = person?.item
         return(
          <View style={styles.peopleCard}  >
          <Image
            source={{
              uri: item?.image
            }}
            style={styles.peopleAvatar}
          />
          <Text style={styles.peopleName}>{item?.full_name || "my title"}</Text>
          <Text style={styles.peopleLocation}>{item?.exp_level|| "my title"}</Text>
          <View style={styles.tag}>
          {/* <Image
            source={imageIndex.location}
            style={{
              height:22,
              width:22
            }}
          />
             <Text style={styles.tagText}>qq</Text> */}
          </View>
          <TouchableOpacity style={styles.connectButtonPeople} 
          onPress={()=>{
            nav.navigate(ScreenNameEnum.FindAParterDetils,{
              item:item
            })
          }}
        
          >
            <Text style={styles.connectText}>Connect</Text>
          </TouchableOpacity>
        </View>
        )
      })}
      // keyExtractor={(item) => item.id}
    />
</ScrollView>

      </ScrollView>
            {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} 
      
      onPress={()=>nav.navigate(ScreenNameEnum.CommunitiesScreen)}
      > 
        <Image source={imageIndex.addbutt} 
        style={{
          height:80,
          width:80,
          resizeMode:"contain"
        }} 
        />
       </TouchableOpacity>
    </SafeAreaView>
  );
};



export default Home;