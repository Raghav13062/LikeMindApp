// // CommunitiesScreen.tsx
// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native';
// import CreateCommunityModal from '../../../compoent/CreateCommunityModal';
// import SearchBar from '../../../compoent/SearchBar';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import StatusBarComponent from '../../../compoent/StatusBarCompoent';
// import styles from './style';
// import useCommunities from './useCommunities';
// import LoadingModal from '../../../utils/Loader';
// import EmptyListComponent from '../../../compoent/EmptyListComponent';
// import CustomHeader from '../../../compoent/CustomHeader';
// import imageIndex from '../../../assets/imageIndex';
// import ScreenNameEnum from '../../../routes/screenName.enum';
// import FilterModal from './FilterModal';

// export default function CommunitiesScreen() {
//   const {
//     navigation,
//     isLoading,
//     handleSubmit,
//     categoryList,
//     filteredList,
//     showCreateModal,
//     setShowCreateModal,
//     search,
//     setSearch,
//     showFilterModal,
//     setShowFilterModal,
//     selectedCategories,
//     handleCategorySelect,
//     handleClearFilters,
//   } = useCommunities();

// const renderCommunityCard = ({ item }: any, setShowCreateModal: any) => {
//   return (
//     <View style={styles.card}>
//       {/* Image Section */}
//       <Image source={{ uri: item.image }} style={styles.cardImage} />

//       {/* Content Section */}
//       <View style={styles.cardContent}>
//         <Text style={styles.cardTitle}>{item?.name}</Text>
//          <Text style={styles.cardDescription} numberOfLines={2}>
//           {item?.description || 'New community available! Join now.'}
//         </Text>

//         {/* Tag Chip */}
//         {item?.tag && (
//           <View style={styles.chip}>
//             <Text style={styles.chipText}>{item?.tag}</Text>
//           </View>
//         )}
//       </View>

//       {/* Join Button */}
//       <TouchableOpacity
//         style={styles.joinBtn}
//         onPress={() => setShowCreateModal(true)}
//       >
//         <Text style={styles.joinBtnText}>Join</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBarComponent />
//       <CustomHeader imageSource={imageIndex.backorange} label="Communities" />
      
//       <View style={{ paddingHorizontal: 16, marginTop: 15 }}>
//         {isLoading ? <LoadingModal /> : null}
        
//         <SearchBar
//           value={search}
//           onSearchChange={setSearch}
//           onfilter={() => setShowFilterModal(true)} // ✅ Filter button click पर modal show होगा
//         />

//         <ScrollView showsVerticalScrollIndicator={false}>
//            <FlatList
//             data={categoryList}
//             keyExtractor={(item: any) => item.id.toString()}
//             horizontal
//             style={{ marginTop: 20 }}
//             showsHorizontalScrollIndicator={false}
//             ListEmptyComponent={<EmptyListComponent message="No categories found." />}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={[
//                   styles.colorfulChip,
//                   selectedCategories.includes(item.name) && styles.selectedChip
//                 ]}
//                 activeOpacity={0.85}
//                 onPress={() => handleCategorySelect(item.name)}
//               >
//                 <Image
//                   source={{ uri: "https://cdn-icons-png.flaticon.com/256/6724/6724239.png" }}
//                   style={styles.tagIcon}
//                 />
//                 <Text style={[
//                   styles.colorfulChipText,
//                   selectedCategories.includes(item.name) && styles.selectedChipText
//                 ]}>
//                   {item?.name}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />

//           <FlatList
//             data={filteredList}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderCommunityCard}
//             contentContainerStyle={styles.list}
//             style={{ marginTop: 30 }}
//             showsVerticalScrollIndicator={false}
//             ListEmptyComponent={<EmptyListComponent message="No communities found." />}
//           />
//         </ScrollView>
//       </View>

//       {/* Filter Modal - ✅ Corrected */}
     

//       {/* FAB Buttons */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => setShowCreateModal(true)}
//         activeOpacity={0.85}
//       >
//         <Text style={styles.fabText}> 👥 Add Community</Text>
//       </TouchableOpacity>

 
// {/* 
//         <TouchableOpacity
//         style={styles.fab12}
//         onPress={() => navigation.navigate(ScreenNameEnum.AddComingJoin)}
//         activeOpacity={0.85}
//       >
//         <Text style={styles.fabText}>📘 Add Upcoming </Text>
//       </TouchableOpacity>   */}

//       {/* Create Modal */}
//       <CreateCommunityModal
//         visible={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSummit={handleSubmit}
//       />
//        <FilterModal
//         visible={showFilterModal} // ✅ state variable से कंट्रोल
//         onClose={() => setShowFilterModal(false)}
//         categories={categoryList}
//         selectedCategories={selectedCategories}
//         onCategorySelect={handleCategorySelect}
//         onClearFilters={handleClearFilters}
//       />
      
//     </SafeAreaView>
//   );
// }

import React from 'react';
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
import useCommunities from './useCommunities';
import CustomHeader from '../../../compoent/CustomHeader';
import SearchBar from '../../../compoent/SearchBar';
import LoadingModal from '../../../utils/Loader';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import CreateCommunityModal from '../../../compoent/CreateCommunityModal';
import FilterModal from './FilterModal';
import imageIndex from '../../../assets/imageIndex'; // मान लें कि इसमें filterIcon है

const CommunityCard = ({ item, onJoinPress }: any) => {
  // Join/View action के लिए Placeholder
  const handlePress = () => {
    onJoinPress(item);
  };
   return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handlePress}>
      <Image 
        source={{ uri: item.logo || item.image || 'https://via.placeholder.com/100' }} 
        style={styles.cardImage} 
      />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item?.name || 'Untitled Community'}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item?.description || 'A growing community. Join now to participate!'}
        </Text>
{item?.price !=0 && (
        <Text style={{fontSize:12, color:'green', marginTop:4, fontWeight:'600'}}>
          Price:₹{item.price}
        </Text>
        )}
             
                {item?.category && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item.category}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.joinBtn}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.joinBtnText}>Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


// --- Main Screen Component ---
export default function CommunitiesScreen() {
  const {
    navigation,
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
  } = useCommunities();

  const handleCommunityPress = (community: any) => {
    // Ideally, navigate to the Community Detail Screen
    // navigation.navigate(ScreenNameEnum.COMMUNITY_DETAIL, { communityId: community.id });
    console.log(`Navigating to details for: ${community.name}`);
  };

  const renderCommunityCard = ({ item }: any) => (
    <CommunityCard item={item} onJoinPress={handleCommunityPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        marginTop:15
      }}>
  
       <CustomHeader 
        imageSource={imageIndex.backorange} 
        label="Communities" 
        rightIcon={imageIndex.filterIcon} // assuming filterIcon exists
        onRightIconPress={() => setShowFilterModal(true)}
      />
      </View>
      <View style={styles.contentWrapper}>
        {isLoading && <LoadingModal />}
        
        {/* Search Bar with Filter Trigger */}
        <SearchBar
          value={search}
          onSearchChange={setSearch}
          placeholder="Search ..."
          onfilter={() => setShowFilterModal(true)}
        />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Category Chips List */}
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
                  // selectedCategories.includes(item.name) && styles.selectedChip
                ]}
                activeOpacity={0.85}
                onPress={() => handleCategorySelect(item.name)}
              >
                 <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/256/6724/6724239.png" }}
                  style={[
                     styles.tagIcon,
                   ]}
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
            scrollEnabled={false} // ScrollView के अंदर है, इसलिए इसे disable करें
            ListEmptyComponent={<EmptyListComponent message="No communities found matching your filter." />}
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
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Light background
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop:10
  },
  scrollViewContent: {
    paddingBottom: 20, // FAB के लिए जगह
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
    backgroundColor: '#007AFF', // Primary Blue
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
    // elevation: 3,
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
    backgroundColor: '#FF9800', // Orange button
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