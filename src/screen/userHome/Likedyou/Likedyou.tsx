import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
 import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import styles from './style';
import useLikedyou from './useLikedyou';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from '../../../utils/Loader';
 
const RequestItem = ({ item }) => {
   return(
    <View style={{
      flexDirection: 'row',
       backgroundColor: '#fff',
      borderRadius: 12,
        borderTopWidth:0.6 ,
      borderColor:"gray" ,
      justifyContent:"center"
 
    }}>
      {/* Avatar Section */}
      <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            overflow: 'hidden', 
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:2
        
      }}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
      </View>

      {/* Text Section */}
      <View style={{
        flex: 1,
        marginLeft: 14,
        justifyContent: 'center',
      }}>
        <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#222',
         }}>{item.full_name || "mohan"}</Text>
        <Text style={{
          fontSize: 13,
          color: '#888',
      
        }}>{item.created_at}</Text>
      </View>
    </View>
  )
}
// const RequestItem = ({ item }) => {
//   console.log(" 1111 item",item)
//   return(
//     <View style={styles.itemContainer}>
//     <View style={[styles.avatarWrapper,{
//       alignItems:"center" ,
//       justifyContent:"center"
//     }]}>
//       <Image source={{ uri: item.image }} style={styles.avatar} />
   
//       {/* <View style={styles.badge}>
//       <Image source={imageIndex.orangProfiel} style={{
//         height:22,

//         width:22,
//       }}/>
//       </View> */}
//     </View>

//     <View style={{ flex: 1, marginLeft: 12 }}>
//       <Text style={styles.name}>{item.full_name} 
        
//         {/* <Text style={styles.subText}>sent you a friend requests</Text> */}
//         </Text>

//       {/* <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.acceptButton}>
//           <Text style={styles.acceptText}>Accept</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.rejectButton}>
//           <Text style={styles.rejectText}>Reject</Text>
//         </TouchableOpacity>
//       </View> */}

//       <Text style={styles.time}>{item.time}</Text>
//     </View>

//     {/* <TouchableOpacity style={styles.menuButton}>
//       <Text style={styles.menuIcon}>⋮</Text>
//     </TouchableOpacity> */}
//   </View>
//   )
// }

const Likedyou = () => {
  // const newRequests = DATA.filter(item => item.type === 'new');
  // const earlierRequests = DATA.filter(item => item.type === 'earlier');
 const {  navigation,
  isLoading,
  setIsLoading,
   likeYou,  }= useLikedyou()
  return (
    <SafeAreaView style={{
        flex: 1,
          backgroundColor: '#fff',
    }}>
            {isLoading ? <LoadingModal /> : null}

                <StatusBarComponent/>

    <ScrollView style={styles.container}>
      <Text style={styles.header}>Liked You</Text>
      <Text style={styles.sectionTitle}>New</Text>
      <View style={{
        marginTop:11
      }}>
      {likeYou.map(item => <RequestItem key={item.id} item={item} />)}
      </View>
      {/* <Text style={styles.sectionTitle}>Earlier</Text>
      {earlierRequests.map(item => <RequestItem key={item.id} item={item} />)} */}
    </ScrollView>
    </SafeAreaView>
  );
};



export default Likedyou;
