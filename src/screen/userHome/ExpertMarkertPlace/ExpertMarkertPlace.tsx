import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

import SearchBar from '../../../compoent/SearchBar';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import LoadingModal from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useExpertMarkert from './useExpertMarkertP';
import styles from './style';

export default function ExpertMarkertPlace() {
  const { navigation, isLoading, eventCategories, event } = useExpertMarkert();

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return event.filter((item: any) => {
      const searchableText = `
        ${item?.name || ''}
        ${item?.title || ''}
        ${item?.about || ''}
        ${item?.price !== null && item?.price !== undefined ? item?.price : ''}
      `.toLowerCase();

      const matchesSearch = searchableText.includes(searchText.toLowerCase());
      const matchesCategory =
        !selectedCategory || item.category_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchText, event, selectedCategory]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {isLoading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader
        imageSource={imageIndex.backNavsPuple}
        label="Expert Marketplace"
      />

      {/* ✅ Search Bar */}
      <View style={{ marginTop: 15, marginHorizontal: 16, marginBottom: 10 }}>
        <SearchBar value={searchText} onSearchChange={setSearchText} />
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* ✅ Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {eventCategories.map((cat: any, index) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedCategory(isSelected ? null : cat.id)
                }
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                ]}
              >
                <Image
                  source={{ uri: cat.image }}
                  style={styles.categoryImage}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ✅ Event List */}
        <FlatList
          data={filteredEvents}
          ListEmptyComponent={<EmptyListComponent message="No Event Found" />}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => {
            const formattedDate = moment(item?.created_at).format(
              'ddd, MMM DD – h:mm A'
            );

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ScreenNameEnum.MarketProfileDetails, {
                    item,
                  })
                }
                style={styles.card}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item?.name}</Text>
                  <Text style={styles.cardSubtitle}>{item?.title}</Text>
                  <Text style={styles.cardDate}>{formattedDate}</Text>
                  <View style={styles.ratingRow}>
                    <Image
                      source={imageIndex.star}
                      style={{ height: 12, width: 12, marginRight: 5 }}
                    />
                    <Text style={styles.ratingText}>
                      {item.rating || '0.0'} ★ ({item.views || '0'} views)
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
