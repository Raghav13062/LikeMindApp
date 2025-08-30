// LikeMindsHome.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
   ScrollView,
   TouchableOpacity,
   FlatList
 } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import DashBoardHeader from '../../../compoent/DashBoardHeader';
import SearchBar from '../../../compoent/SearchBar';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';
 import ScreenNameEnum from '../../../routes/screenName.enum';
import useHomePaid from './useHomePaid';
import LoadingModal from '../../../utils/Loader';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

const clients = [
  {
    id: '1',
    name: 'Roger Ekstrom',
    status: 'Active',
    date: 'Oct 5, 2023',
    img: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Carla Rosser',
    status: 'Inactive',
    date: 'Oct 5, 2023',
    img: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Jaylon Vaccaro',
    status: 'Pending',
    date: 'Oct 5, 2023',
    img: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const HomePaid = () => {
   const {
    navigation,
    handleDelete,
    loading ,
    getEvent
  }=useHomePaid()
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
            {loading ? <LoadingModal /> : null}

          <StatusBarComponent />
          <DashBoardHeader setting={false} />
          <View style={{
            marginHorizontal:5
          }}>


<SearchBar/>
          </View>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileCard}>
       <View style={{
        flexDirection:"column"
       }}>
 <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.profileImage}
        />
       </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>Gretchen Culhane</Text>
          <Text style={styles.profileRating}>⭐ 2.8 (2821 views)</Text>
<Text style={styles.profileDetail}>
  Total Clients Served: <Text style={{ color: '#8E44AD' }}>120+</Text>
</Text>
          <Text style={styles.profileServices}>
            Services Offered: 1-on-1 Coaching, Group Sessions, Video Courses
          </Text>
        </View>
      </View>

      {/* Client List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Client</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
<FlatList 
data={[]}
ListEmptyComponent={<EmptyListComponent message="No Event found." />}
renderItem={(client:any)=>{
  return(
    <View key={client.id} style={styles.clientCard}>
    <Image source={{ uri: client.img }} style={styles.clientImg} />
    <View style={{ flex: 1 }}>
      <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={[styles.badgeText,{
                    color:"#34C759"
                  }]}>{client.status}</Text>

      <Text style={styles.clientDate}>
        Last Interaction: {client.date}
      </Text>
    </View>
    {/* <View style={[styles.badge, styles[`status${client.status}`]]}>
    </View> */}
  </View>
  )
}}
/>
     

      {/* Service Management */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Services Management</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
  style={{ marginBottom: 45 }}
  horizontal
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
  {getEvent?.map((item: any, index: number) => (
    <View key={index} style={styles.serviceCard}>
      <Image
        source={{ uri: item?.image }}
        style={styles.serviceImg}
        resizeMode="cover"
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.serviceTitle}>
          {item?.title || 'Digital Marketing'}
        </Text>

        <Text style={styles.serviceDesc}>
          {item?.name || 'Boost your online presence'}
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <TouchableOpacity
            style={[styles.badge, styles.statusActive]}
            onPress={() =>
              navigation.navigate(ScreenNameEnum.EditEventForm, {
                item: item,
              })
            }
          >
            <Text style={styles.badgeText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.badge, styles.statusDelete]}
            onPress={() => handleDelete(item.id)} // Call your delete function
          >
            <Text style={styles.badgeText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ))}
</ScrollView>

    </ScrollView>
    <TouchableOpacity style={styles.floatingButton} 
      onPress={()=>navigation.navigate(ScreenNameEnum.EventForm)}
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

export default HomePaid;

