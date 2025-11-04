import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
   FlatList,
   ActivityIndicator
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComingSoon from '../ComingSoon';
 
const Home = () => {
  const nav = useNavigation() 
  const {    navigation,
    isLoading,
      event,  standoutList,
 
     }= useHome()
  const features = [
    {
      title: 'Roger Ekstrom',
      desc: '✨ Expert place” Learn from Experts” (for the marketplace).',
      icon: imageIndex.leader,
      scree:ScreenNameEnum.ExpertMarkertPlace
    },
    {
      title: 'Community',
      desc: '🏠 Join or Build Communities',
      icon: imageIndex.community,
      scree:ScreenNameEnum.CommunitiesScreen

    },
    {
      title: 'Explore Events ',
      desc: '🎟 Explore Events & Experiences',
      icon: imageIndex.conference,
      scree:ScreenNameEnum.CommunitiesScreen

    },
  ];
    const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://onetenbd.com/likemind/api/get-groups",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setGroups(result.data);
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };
const renderGroupItem = ({ item }) => (
  // <View
  //   style={{
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     backgroundColor: '#fff',
  //     borderRadius: 12,
  //     padding: 15,
  //     marginHorizontal: 12,
  //     marginVertical: 8,
  //     shadowColor: '#000',
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.15,
  //     shadowRadius: 4,
  //     elevation: 4,
  //     borderWidth: 0.5,
  //     borderColor: '#ddd',
  //   }}>
  //   <Image
  //     source={{ uri: item.image }}
  //     style={{
  //       width: 60,
  //       height: 60,
  //       borderRadius: 30,
  //     }}
  //   />
  //   <View style={{ marginLeft: 15, flex: 1 }}>
  //     <Text
  //       style={{
  //         fontSize: 16,
  //         fontWeight: '600',
  //         color: '#222',
  //         marginBottom: 4,
  //       }}>
  //       {item.title}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: 14,
  //         color: '#777',
  //       }}>
  //       {item.location}
  //     </Text>
  //   </View>
  // </View>
   <View style={[styles.eventCard,{
    marginTop:12
   }]}  >
                <Image
                  source={{
                    uri:  item?.image,
                  }}
                  style={styles.eventImage}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.eventTitle}>{item?.title}</Text>
                                    <Text style={styles.eventTitle}>{item?.location}</Text>

                 <View style={{
                  flexDirection:"row",
                  alignItems:"center"
                }}>
                {/* <TouchableOpacity style={styles.joinButton} 
                  onPress={()=>{
                nav.navigate(ScreenNameEnum.MarketProfileDetails,{
                  item:item
                })
                //  nav.navigate(ScreenNameEnum.JoinSessions)
                  }}
                >
                    <Text style={styles.joinText}>Join Now</Text>
                  </TouchableOpacity> */}
                
                </View>
              
                </View>
                
              </View>
);


  if (loading) {
    return (
      <View style={{
         flex: 1,
    justifyContent: "center",
    alignItems: "center",
      }}>
        <ActivityIndicator size="large" color="#FFCC00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{
         flex: 1,
    justifyContent: "center",
    alignItems: "center",
      }}>
        <Text style={{
          color: "red",
    fontSize: 16,
        }}>{error}</Text>
      </View>
    );
  }


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

           <ComingSoon/>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Host Events </Text>
          
        </View>
        

         <FlatList 
        showsHorizontalScrollIndicator={false}
      data={groups}
      keyExtractor={(item) => item.id}
      horizontal
      showsVerticalScrollIndicator={false}
      renderItem={renderGroupItem}
     />



  <View style={[styles.sectionHeader,{marginBottom:15}]}>
          <Text style={styles.sectionTitle}>Events happening soon</Text>
          <TouchableOpacity 
            onPress={()=>{
              nav.navigate(ScreenNameEnum.ExpertMarkertPlace)
                }}
          >
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
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