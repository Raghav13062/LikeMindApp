
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
import useFindParter from './useFindParter';
import LoadingModal from '../../../utils/Loader';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
 
const FindAParter = () => {
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

         <CustomHeader
                
                
                imageSource={imageIndex.backNavsPuple} label="Find a Partner" />

 
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

export default FindAParter;

