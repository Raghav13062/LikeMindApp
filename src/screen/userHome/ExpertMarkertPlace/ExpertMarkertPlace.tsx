import React, { useState, useMemo } from 'react';
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
  const { navigation, isLoading, eventCategories, event } = useExpertMarkert();

  const [searchText, setSearchText] = useState('');

  // ✅ Filtered data using search
  const filteredEvents = useMemo(() => {
    if (!searchText) return event;
    return event.filter((item: any) =>
      `${item?.name} ${item?.title} ${item?.about}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, event]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoading ? <LoadingModal /> : null}

      <StatusBarComponent />
      <CustomHeader
        imageSource={imageIndex.backNavsPuple}
        label="Expert Marketplace"
      />

      {/* ✅ Search bar connected */}
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
            <View style={styles.categoryItem} key={index}>
              <View style={styles.categoryIcon}>
                <Image
                  source={{ uri: cat.image }}
                  style={{ height: 25, width: 25 }}
                />
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ✅ Event List with Search */}
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
