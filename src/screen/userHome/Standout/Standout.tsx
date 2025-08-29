// import React, { useState, useEffect, useRef } from 'react';
// import {
//      Text,
//     View,
//     Dimensions,
//     Image,
//     TouchableOpacity,
//     PanResponder,
//     Animated,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import StatusBarComponent from '../../../compoent/StatusBarCompoent';
// import imageIndex from '../../../assets/imageIndex';
// import styles from './style';
// import useStandout from './useStandout';
// import LoadingModal from '../../../utils/Loader';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export default function Standout() {
//     const { isLoading, standoutList, setStandoutList } = useStandout();
//     const pan = useRef(new Animated.ValueXY()).current;

// const swipeCard = (direction) => {
//     const swipedProfile = standoutList[0]; // Top profile
//     let toValue;

//     if (direction === 'right') {
//         toValue = { x: SCREEN_WIDTH, y: 0 };
//         console.log("Liked (retain):", swipedProfile?.full_name || swipedProfile?.email);
//     } else if (direction === 'left') {
//         toValue = { x: -SCREEN_WIDTH, y: 0 };
//         console.log("Disliked (remove):", swipedProfile?.full_name || swipedProfile?.email);
//     } else if (direction === 'up') {
//         toValue = { x: 0, y: -SCREEN_WIDTH };
//         console.log("Super Liked:", swipedProfile?.full_name || swipedProfile?.email);
//     } else {
//         return;
//     }

//     Animated.timing(pan, {
//         toValue,
//         duration: 200,
//         useNativeDriver: false,
//     }).start(() => {
//         if (direction === 'left') {
//             // Remove only on left swipe
//             const updatedProfiles = standoutList.slice(1);
//             setStandoutList(updatedProfiles);
//         }
//         // Always reset pan position
//         pan.setValue({ x: 0, y: 0 });
//     });
// };


//     const panResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: (evt, gestureState) => {
//                 return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
//             },
//             onPanResponderMove: Animated.event(
//                 [null, { dx: pan.x, dy: pan.y }],
//                 { useNativeDriver: false }
//             ),
//             onPanResponderRelease: (evt, gestureState) => {
//                 if (gestureState.dx > 120) {
//                     swipeCard('right'); // Like
//                 } else if (gestureState.dx < -120) {
//                     swipeCard('left'); // Dislike
//                 } else if (gestureState.dy < -120) {
//                     swipeCard('up'); // Super Like
//                 } else {
//                     Animated.spring(pan, {
//                         toValue: { x: 0, y: 0 },
//                         useNativeDriver: false,
//                         friction: 5,
//                     }).start();
//                 }
//             },
//         })
//     ).current;

//     const renderProfileCard = (item, index) => {
//         const isTop = index === 0;
//         const panStyle = isTop
//             ? {
//                   transform: [
//                       { translateX: pan.x },
//                       { translateY: pan.y },
//                       {
//                           rotate: pan.x.interpolate({
//                               inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
//                               outputRange: ['-20deg', '0deg', '20deg'],
//                           }),
//                       },
//                   ],
//               }
//             : {};

//         return (
//             <Animated.View
//                 key={item.id}
//                 style={[styles.card, panStyle, { zIndex: standoutList.length - index }]}
//                 {...(isTop ? panResponder.panHandlers : {})}
//             >
//                 <Image source={{ uri: item?.image }} style={styles.image} />
//                 <View style={[styles.overlayTop, { flexDirection: 'row', justifyContent: 'center' }]}>
//                     <View
//                         style={{
//                             borderWidth: 2,
//                             borderColor: '#fff',
//                             borderRadius: 55,
//                             overflow: 'hidden',
//                             width: 55,
//                             height: 55,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Image source={{ uri: item.image }} style={styles.avatar} />
//                     </View>
//                     <View style={{ marginLeft: 12 }}>
//                         <Text style={styles.name}>{item?.full_name}</Text>
//                         <Text style={styles.role}>{item?.exp_level}</Text>
//                     </View>
//                 </View>

//                 {/* Overlay: Buttons */}
//                 <View style={styles.actions}>
//                     <TouchableOpacity onPress={() => swipeCard('left')}>
//                         <Image source={imageIndex.dislike1} style={{ height: 133, width: 80 }} />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => swipeCard('up')}>
//                         <Image source={imageIndex.likePurple} style={{ height: 133, width: 80 }} />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => swipeCard('right')}>
//                         <Image source={imageIndex.likes} style={{ height: 133, width: 80 }} />
//                     </TouchableOpacity>
//                 </View>
//             </Animated.View>
//         );
//     };

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//             {isLoading ? <LoadingModal /> : null}

//             <StatusBarComponent />
//             <Text
//                 style={{
//                     fontSize: 23,
//                     color: 'black',
//                     fontWeight: '600',
//                     marginLeft: 15,
//                     marginTop: 11,
//                 }}
//             >
//                 Standouts
//             </Text>
//             <View style={styles.container}>{standoutList.map(renderProfileCard)}</View>
//         </SafeAreaView>
//     );
// }
 
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
   TouchableOpacity,
  } from 'react-native';
import SearchBar from '../../../compoent/SearchBar';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
 import ScreenNameEnum from '../../../routes/screenName.enum';
 import LoadingModal from '../../../utils/Loader';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFindParter from '../FindAParter/useFindParter';
 
const Standout = () => {
 const {    navigation,
  isLoading,
  LikeFunction,
  closeFunction,
  standoutList}= useFindParter()
 
  const PartnerCard = ({ item }:any) => { 
    return (
      <TouchableOpacity style={styles.card} 
      onPress={()=>{
        navigation.navigate(ScreenNameEnum.FindAParterDetils,{
          item:item
        })
      }}
       >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.profileBadge}>
          <Image source={{ uri: item.image }} style={styles.badgeImage} />
        </View>
        <View style={styles.overlay}>
          <View style={{
            flex:1
          }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
          </View>
        
          <View style={styles.actions}>
  <TouchableOpacity onPress={() => closeFunction(item?.id)}>
    <Image source={imageIndex.clos} style={styles.actionIcon} />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => LikeFunction(item?.id)}>
    <Image
      source={item?.like_profile ? imageIndex.Likecircle : imageIndex.circl1}
      style={styles.actionIcon}
      tintColor={item?.like_profile ? "white":""}
    />
  </TouchableOpacity>

  <TouchableOpacity>
    <Image source={imageIndex.mess} style={styles.actionIcon} />
  </TouchableOpacity>
</View>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
       <StatusBarComponent/>
       {isLoading ? <LoadingModal /> : null}

        

 
 <View style={{
    paddingHorizontal: 16,
    flex:1,
    marginTop:20 
 }}>
     <SearchBar/>

      <FlatList
        data={standoutList}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }) => <PartnerCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 ,marginTop:11,}}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </SafeAreaView>
  );
};

export default Standout;

