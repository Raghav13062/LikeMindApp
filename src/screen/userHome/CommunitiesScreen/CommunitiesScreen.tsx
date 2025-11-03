import React, { useState } from 'react';
import {
  View,
  Text,
 
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
 
} from 'react-native';
import CreateCommunityModal from '../../../compoent/CreateCommunityModal';
 import SearchBar from '../../../compoent/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import styles from './style';
import useCommunities from './useCommunities';
import LoadingModal from '../../../utils/Loader';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import ScreenNameEnum from '../../../routes/screenName.enum';

 
 
export default function CommunitiesScreen() {
const {   navigation,
  isLoading,
  handleSubmit,
  categoryList, 
   filteredList,
  showCreateModal, setShowCreateModal ,
  search, setSearch}= useCommunities()
  const renderCommunityCard = ({ item }:any) => {
    return(
        <View style={styles.card}>
         <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item?.name}</Text>
          <Text style={styles.cardDescription}>{item?.privacytype}</Text>
          <Text style={styles.cardMembers}>{item?.description || "new titl"}</Text>
           <Text style={styles.chipText}>{item?.tag}</Text>

          <TouchableOpacity style={styles.joinBtn} 
          
          onPress={() => setShowCreateModal(true)}
          >
            <Text style={styles.joinBtnText}>join</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBarComponent/>
        <CustomHeader imageSource={imageIndex.backorange} label="Communities" />
<View  style={{
      paddingHorizontal: 16,
      marginTop:15

}}>
         <View style={styles.container1}>
      {/* <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('EventListScreen')}
      >
        <Text style={styles.icon}>➕</Text>
        <Text style={styles.text}>Host Event</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('OfferExperties')}

      
      >
        <Text style={styles.icon}>➕</Text>
        <Text style={styles.text}>Offer Expertise</Text>
      </TouchableOpacity> */}
    </View>
      {isLoading ? <LoadingModal /> : null}
      <SearchBar value={search} onSearchChange={setSearch} />

 

<ScrollView showsVerticalScrollIndicator={false}> 
   <FlatList
  data={categoryList}
  keyExtractor={(item: any) => item.id.toString()}
  horizontal
  style={{ marginTop: 20 }}
  showsHorizontalScrollIndicator={false}
  ListEmptyComponent={<EmptyListComponent message="No communities found." />}
  renderItem={({ item, index }) => {
    // Assign a color from a palette dynamically
 
    return (
      <TouchableOpacity
        style={[styles.colorfulChip,]}
        activeOpacity={0.85}
      >
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/256/6724/6724239.png" }}
          style={styles.tagIcon}
        />
        <Text style={styles.colorfulChipText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  }}
/>

      <FlatList
        data={filteredList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCommunityCard}
        contentContainerStyle={styles.list}
        style={{
          marginTop:30
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyListComponent message="No communities found." />}

      />
      </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}> 👥 Add Community</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fab1}
      // onPress={() => navigation.navigate('EventListScreen')}
            onPress={() => navigation.navigate(ScreenNameEnum.Creategroup)}

        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>🗣️ Host Event</Text>
      </TouchableOpacity>
      {/* Create Modal */}
      <CreateCommunityModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSummit={handleSubmit}
      />
    </SafeAreaView>
  );
}

