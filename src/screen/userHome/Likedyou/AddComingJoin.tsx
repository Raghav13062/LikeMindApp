import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

interface NextUpItem {
  id: string;
  type: 'Event' | 'Lesson';
  title: string;
  date: string;
  time: string;
  price: string;
}

const NextUpScreen = () => {
  const [formData, setFormData] = useState({
    type: 'Event',
    title: '',
    date: '',
    time: '',
    price: '',
  });

  const [activities, setActivities] = useState<NextUpItem[]>([]);
  const [filterType, setFilterType] = useState<'All' | 'Event' | 'Lesson'>('All');

  const handleAdd = () => {
    if (!formData.title || !formData.date || !formData.time || !formData.price) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newItem: NextUpItem = {
      id: Date.now().toString(),
      type: formData.type as 'Event' | 'Lesson',
      title: formData.title,
      date: formData.date,
      time: formData.time,
      price: formData.price,
    };

    setActivities((prev) => [newItem, ...prev]);
    setFormData({ type: 'Event', title: '', date: '', time: '', price: '' });
  };

  const filteredData =
    filterType === 'All'
      ? activities
      : activities.filter((item) => item.type === filterType);

  const renderItem = ({ item }: { item: NextUpItem }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: item.type === 'Event' ? '#E3F2FD' : '#FFF3E0',
        },
      ]}
    >
      <Text style={[styles.label, styles.type]}>
        {item.type === 'Event' ? '🎉 Event' : '📘 Lesson'}
      </Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.datetime}>
        {item.date} - {item.time}
      </Text>
      <Text style={styles.price}>💰 Price: ₹{item.price}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: item.type === 'Event' ? '#1976D2' : '#FB8C00' },
        ]}
        onPress={() => Alert.alert(`${item.type} Details`, item.title)}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
<StatusBarComponent/>
<View style={{ marginTop:40 }}>

                     <CustomHeader imageSource={imageIndex.backorange} label="Upcoming Activities" />
</View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
 
        {/* ---- Form Section ---- */}
        <View style={styles.formContainer}>
 
          {/* Toggle for Event / Lesson */}
          <View style={styles.toggleContainer}>
            {['Event', 'Lesson'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.toggleButton,
                  formData.type === type && styles.activeToggle,
                ]}
                onPress={() => setFormData({ ...formData, type: type as 'Event' | 'Lesson' })}
              >
                <Text
                  style={[
                    styles.toggleText,
                    formData.type === type && styles.activeText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Enter Title"
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
          <TextInput
            placeholder="Enter Date "
            style={styles.input}
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
          />
          <TextInput
            placeholder="Enter Time "
            style={styles.input}
            value={formData.time}
            onChangeText={(text) => setFormData({ ...formData, time: text })}
          />
          <TextInput
            placeholder="Enter Price "
            keyboardType="numeric"
            style={styles.input}
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </View>

        {/* ---- Filter Section ---- */}
       

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default NextUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 16,
    textAlign: 'center',
    color: '#111',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
 
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop:20
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
   },
  activeToggle: {
    backgroundColor: '#ff9500',
    borderColor: '#ff9500',
    height:43,
    justifyContent:'center'
  },
  toggleText: {
    color: '#333',
    fontWeight: '500',
  },
  activeText: {
    color: '#FFF',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    height:55,
    marginTop:20
  },
  addButton: {
    backgroundColor: '#ff9500',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  activeFilterButton: {
    backgroundColor: '#ff9500',
    borderColor: '#ff9500',
  },
  filterText: {
    color: '#333',
  },
  activeFilterText: {
    color: '#FFF',
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  type: {
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginTop: 4,
  },
  datetime: {
    fontSize: 14,
    color: '#666',
    marginVertical: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 8,
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
    fontSize: 15,
  },
});
