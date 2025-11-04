import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  categories: any[];
  selectedCategories: string[];
  onCategorySelect: (categoryName: string) => void;
  onClearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  categories,
  selectedCategories,
  onCategorySelect,
  onClearFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      // 🔒 Disable swipe-down close (on iOS)
      presentationStyle="overFullScreen"
      onRequestClose={() => {}} // disable hardware back button close (optional)
    >
      <View style={styles.overlay}>
        {/* Prevent tap outside from closing */}
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Filter by Category</Text>
            <FlatList
              data={filteredCategories}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item }) => {
                const selected = selectedCategories.includes(item.name);
                return (
                  <TouchableOpacity
                    style={[
                      styles.categoryItem,
                      selected && styles.categoryItemSelected
                    ]}
                    onPress={() => onCategorySelect(item.name)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected && styles.categoryTextSelected
                      ]}
                    >
                      {item.name}
                    </Text>
                    {selected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
            />

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.footerButton, styles.clearButton]}
                onPress={onClearFilters}
              >
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerButton, styles.applyButton]}
                onPress={onClose}
              >
                <Text style={styles.applyText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  },
  categoryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItemSelected: {
    backgroundColor: '#fff5e6',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#ff9500',
    fontWeight: '600',
  },
  checkmark: {
    color: '#ff9500',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  footerButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#f3f3f3',
  },
  applyButton: {
    backgroundColor: '#ff9500',
  },
  clearText: {
    textAlign: 'center',
    color: '#555',
    fontWeight: '500',
  },
  applyText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});

export default FilterModal;
