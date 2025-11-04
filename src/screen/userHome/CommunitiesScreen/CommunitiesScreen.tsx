// CommunitiesScreen.tsx
import React from 'react';
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
import FilterModal from './FilterModal';

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

const renderCommunityCard = ({ item }: any, setShowCreateModal: any) => {
  return (
    <View style={styles.card}>
      {/* Image Section */}
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      {/* Content Section */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item?.name}</Text>
         <Text style={styles.cardDescription} numberOfLines={2}>
          {item?.description || 'New community available! Join now.'}
        </Text>

        {/* Tag Chip */}
        {item?.tag && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item?.tag}</Text>
          </View>
        )}
      </View>

      {/* Join Button */}
      <TouchableOpacity
        style={styles.joinBtn}
        onPress={() => setShowCreateModal(true)}
      >
        <Text style={styles.joinBtnText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backorange} label="Communities" />
      
      <View style={{ paddingHorizontal: 16, marginTop: 15 }}>
        {isLoading ? <LoadingModal /> : null}
        
        <SearchBar
          value={search}
          onSearchChange={setSearch}
          onfilter={() => setShowFilterModal(true)} // ✅ Filter button click पर modal show होगा
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Categories Horizontal List */}
          <FlatList
            data={categoryList}
            keyExtractor={(item: any) => item.id.toString()}
            horizontal
            style={{ marginTop: 20 }}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message="No categories found." />}
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
          />

          <FlatList
            data={filteredList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCommunityCard}
            contentContainerStyle={styles.list}
            style={{ marginTop: 30 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message="No communities found." />}
          />
        </ScrollView>
      </View>

      {/* Filter Modal - ✅ Corrected */}
     

      {/* FAB Buttons */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}> 👥 Add Community</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fab1}
        onPress={() => navigation.navigate(ScreenNameEnum.Creategroup)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>🗣️ Host Event</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.fab12}
        onPress={() => navigation.navigate(ScreenNameEnum.AddComingJoin)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>📘 Add Upcoming </Text>
      </TouchableOpacity>

      {/* Create Modal */}
      <CreateCommunityModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSummit={handleSubmit}
      />
       <FilterModal
        visible={showFilterModal} // ✅ state variable से कंट्रोल
        onClose={() => setShowFilterModal(false)}
        categories={categoryList}
        selectedCategories={selectedCategories}
        onCategorySelect={handleCategorySelect}
        onClearFilters={handleClearFilters}
      />
      
    </SafeAreaView>
  );
}