import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Assuming these are the correct imports from your project structure
import useCommunities from './useCommunities'; 
import CustomHeader from '../../../compoent/CustomHeader';
import SearchBar from '../../../compoent/SearchBar';
import LoadingModal from '../../../utils/Loader';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import CreateCommunityModal from '../../../compoent/CreateCommunityModal';
import FilterModal from './FilterModal';
import imageIndex from '../../../assets/imageIndex'; 
import { JoinCommunityModal } from '../../../compoent/JoinCommunityModal';
import { Tuple } from '@reduxjs/toolkit';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

// --- External Component: CommunityCard ---
// Moved outside the main component to prevent re-rendering on parent state changes


// --- Main Screen Component ---
export default function CommunitiesScreen() {
  const {
    isLoading,
    handleSubmit,
    categoryList,
    filteredList,
    showCreateModal,
    setShowCreateModal,
    search,
    setSearch,
    showFilterModal,
    setShowFilterModal,
    selectedCategories,
    handleCategorySelect,
    handleClearFilters,
    isLogin
  } = useCommunities();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
const navigation = useNavigation()
  const handleCommunitySelect = (community: any) => {
    setSelectedCommunity(community);
    setShowJoinModal(true);
  };
  const CommunityCard = React.memo(({ item, onSelect }: { item: any; onSelect: (item: any) => void }) => {
  const handlePress = () => {
    onSelect(item);
  };

    const handleDelete = () => {
    onSelect(item);
  };
  const  isOwner= isLogin?.user_data.id == item?.user_id ? true : false
  return (
    <View style={styles.card}   >
      <TouchableOpacity        onPress={handlePress} // Use the same press handler for the button
>
      <Image 
        source={{ uri: item.logo || item.image || 'https://via.placeholder.com/100' }} 
        style={styles.cardImage} 
      /></TouchableOpacity>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item?.name || 'Untitled Community'}
        </Text>
        
        {/* <Text style={styles.cardDescription} numberOfLines={2}>
          {item?.description || 'A growing community. Join now to participate!'}
        </Text> */}
        
        {/* Price Tag */}
        {item?.price > 0 && (
          <Text style={styles.priceText}>
            Price: ₹{item.price}
          </Text>
        )}
            {item?.joined === true && (
  <Text style={[styles.priceText,{
    color: 'blue',
  }]}>
    Joined
  </Text>
)}

        {/* Category Chip */}
        {item?.category && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item.category}</Text>
          </View>
        )}
      </View>

      { isOwner == false && item?.joined == false ?( 

        <TouchableOpacity
        style={styles.joinBtn}
       onPress={handlePress} // Use the same press handler for the button
        activeOpacity={0.7}
      >
<Text style={styles.joinBtnText}>
   Join
</Text>
      </TouchableOpacity>
      ) :
      
      <>
 {isOwner  && item?.joined == false &&(
  <TouchableOpacity       
   onPress={() =>
          navigation.navigate(ScreenNameEnum.ChatDetails, { item: item })
        }
  
  // Use the same press handler for the button
>
  <Image source={imageIndex.message} style={{
  height:30,
  width:30 ,
  resizeMode:"contain",
  marginTop:11,
  marginLeft:11
}}/>
</TouchableOpacity>
 )}

  </>
      }

      

    
      
{item?.joined == true  && (   

 <TouchableOpacity
         onPress={handlePress} // Use the same press handler for the button
        activeOpacity={0.7}
        style={{alignItems:"center",   }}
      >
<Image source={imageIndex.message} style={{
  height:30,
  width:30 ,
  resizeMode:"contain",
  marginTop:11
}}/>
      </TouchableOpacity>

) }

      
    </View>
  );
});
  const renderCommunityCard = ({ item }: { item: any }) => (
    <CommunityCard item={item}
     onSelect={handleCommunitySelect} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header with Filter Icon */}
      <View style={styles.headerContainer}>
        <CustomHeader 
          imageSource={imageIndex.backorange} 
          label="Communities" 
          rightIcon={imageIndex.filterIcon} 
          onRightIconPress={() => setShowFilterModal(true)}
        />
      </View>

      <View style={styles.contentWrapper}>
        {isLoading && <LoadingModal />}
        
        {/* Search Bar with Filter Trigger */}
        <SearchBar
          value={search}
          onSearchChange={setSearch}
          placeholder="Search communities..."
          onfilter={() => setShowFilterModal(true)}
        />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Category Chips List (Optional, can be removed if FilterModal is primary) */}
          {/* <Text style={styles.sectionTitle}>Filter by Category</Text>
          <FlatList
            data={categoryList}
            keyExtractor={(item: any) => item.name || item.id?.toString()}
            horizontal
            style={styles.categoryList}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message="No categories available." />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.colorfulChip,
                  selectedCategories.includes(item.name) && styles.selectedChip
                ]}
                activeOpacity={0.85}
                onPress={() => handleCategorySelect(item.name)}
              >
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/256/6724/6724239.png" }}
                  style={styles.tagIcon}
                />
                <Text style={[
                  styles.colorfulChipText,
                  selectedCategories.includes(item.name) && styles.selectedChipText
                ]}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            )}
          /> */}

          {/* Communities List */}
          <Text style={styles.sectionTitle}>
             {filteredList.length > 0 ? 'Available Communities' : 'Communities'}
          </Text>
          <FlatList
            data={filteredList}
            keyExtractor={(item, index) => (item.id || index).toString()}
            renderItem={renderCommunityCard}
            contentContainerStyle={styles.communitiesListContainer}
            scrollEnabled={false} // Important: Disable FlatList scroll when inside ScrollView
            ListEmptyComponent={<EmptyListComponent message="Data not Found" />}
          />
        </ScrollView>
      </View>

      {/* FAB (Floating Action Button) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+ Create Community</Text>
      </TouchableOpacity>

      {/* Modals */}
      <CreateCommunityModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSummit={handleSubmit}
      />
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        categories={categoryList}
        selectedCategories={selectedCategories}
        onCategorySelect={handleCategorySelect}
        onClearFilters={handleClearFilters}
      />
      <JoinCommunityModal 
        visible={showJoinModal} 
        data={selectedCommunity} 
        onClose={() => setShowJoinModal(false)} 
      /> 
      
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Light background
  },
  headerContainer: {
    marginTop: 15,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 80, // Increased padding for FAB visibility
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginTop: 20,
    marginBottom: 8,
  },

  categoryList: {
    marginTop: 5,
    marginBottom: 5,
  },
  colorfulChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: '#007AFF', 
    borderColor: '#007AFF',
  },
  colorfulChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 5,
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  tagIcon: {
    width: 16,
    height: 16,
  },

  // --- Community Card ---
  communitiesListContainer: {
    paddingTop: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // Shadow for Android & iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
     alignItems: 'center',
  },
  cardImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#EAEAEA',
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  priceText: {
    fontSize: 12, 
    color: 'green', 
    marginTop: 4, 
    fontWeight: '600',
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F7FA', // Light Cyan background for tag
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginTop: 4,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#00BCD4', // Cyan color
  },
  joinBtn: {
    backgroundColor: '#FF9800', // Orange button
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },

  // --- FAB (Floating Action Button) ---
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 50,
    right: 20,
    bottom: 30,
    backgroundColor: '#FF9800', 
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
   },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});