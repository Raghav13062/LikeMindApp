import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
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
    console.log('Filtering item:', item);

    // Combine all searchable fields
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoading && <LoadingModal />}

      <StatusBarComponent />
      <CustomHeader
        imageSource={imageIndex.backNavsPuple}
        label="Expert Marketplace"
      />

      {/* ✅ Search bar */}
      <View style={{ marginTop: 15, marginHorizontal: 10, marginBottom: 12 }}>
        <SearchBar value={searchText} onSearchChange={setSearchText} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ✅ Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        >
          {eventCategories.map((cat: any, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? null : cat.id
                )
              }
              style={[
                styles.chip,
                {
                  backgroundColor:
                    selectedCategory === cat.id
                      ? "#f9f9f9"
                      : "#f9f9f9",
                },
              ]}
            >

              <View style={styles.categoryIcon}>
                <Image
                  source={{ uri: cat.image }}
                  style={{ height: 20, width: 20, marginRight: 8 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    fontWeight: '600',
                    color: 'black',
                  }}
                >
                  {cat.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ✅ Event List */}
        <FlatList
          data={filteredEvents}
          ListEmptyComponent={
            <EmptyListComponent message="No Event found." />
          }
          renderItem={({ item }) => {
            const rawDate = item?.created_at;
            const formattedDate = moment(rawDate).format(
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
              >
                <Image
                  source={{ uri: item?.image }}
                  style={styles.avatar}
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.name}>{item?.name}</Text>
                  <Text style={styles.role}>{item?.title}</Text>
                  <Text style={styles.date}>{formattedDate}</Text>
                  <View style={styles.ratingRow}>
                    <Image
                      source={imageIndex.star}
                      style={{ height: 12, width: 12 }}
                    />
                    <Text style={styles.ratingText}>
                      {item.rating || '00'} ({item.views || '0'} views)
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
