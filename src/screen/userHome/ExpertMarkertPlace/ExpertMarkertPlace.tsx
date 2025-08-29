import React from 'react';
import {
  View,
  Text,
  ScrollView,
 
  Image,
  TouchableOpacity,
  FlatList,
 } from 'react-native';
import SearchBar from '../../../compoent/SearchBar';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
 import ScreenNameEnum from '../../../routes/screenName.enum';
import useExpertMarkert from './useExpertMarkertP';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import moment from 'moment';
import LoadingModal from '../../../utils/Loader';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ExpertMarkertPlace() {
 
  const {  navigation,
    isLoading,
     eventCategories,
     event}=useExpertMarkert()
 
  return (
    <SafeAreaView style={{
      flex:1 ,
      backgroundColor:"white"
    }}>
                  {isLoading ? <LoadingModal /> : null}

       <StatusBarComponent/>
         <CustomHeader
                
                
                imageSource={imageIndex.backNavsPuple} label="Expert Marketplace" />

<View style={{
  marginTop:15,
  marginHorizontal:10 ,
  marginBottom:12
}}>
<SearchBar/>
</View>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
        {eventCategories.map((cat:any, index) => {
           return(
            <View style={styles.categoryItem} key={index}>
            <View style={styles.categoryIcon}> 
              <Image source={{uri:cat.image}} style={{
                height:25,
                width:25
              }} />
               <Text style={styles.categoryLabel}>{cat.name}</Text>
            </View>
          </View>
          )
        })}
      </ScrollView>
<FlatList
      data={event}
      showsHorizontalScrollIndicator={false}
       ListEmptyComponent={<EmptyListComponent message="No Event found." />}

      renderItem={((item:any)=>{


const rawDate = item?.item?.created_at;

 const formattedDate = moment(rawDate).format('ddd, MMM DD – h:mm A');
         return(
          <TouchableOpacity 
        
        
        onPress={()=>navigation.navigate(ScreenNameEnum.MarketProfileDetails,{
          item:item?.item
        })}
        style={styles.card}  >
          <Image   source={{
          uri:  item?.item?.image
        }} style={styles.avatar} />
          <View style={styles.cardInfo}>
            <Text style={styles.name}>{item.item?.name}</Text>
            <Text style={styles.role}>{item.item.title}</Text>
             <View style={styles.ratingRow}>
               <Text style={styles.ratingText}>
                <Image source={imageIndex.star} style={{
                  height:12,
                  width:12,

                }}/>
                {item.rating ||"00"} ({item.views ||"views"} views)
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        )
      })}
      keyExtractor={(item) => item.id}
    />
      
    </ScrollView>
    </SafeAreaView>
  );
}

