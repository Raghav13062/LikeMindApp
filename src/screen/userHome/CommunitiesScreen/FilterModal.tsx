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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  categories: any[];
  selectedCategories: string[];
  onCategorySelect: (categoryName: string) => void;
  onClearFilters: () => void;
  // ✅ फ़िल्टर लागू होने के बाद प्रदर्शित होने वाले आइटम्स की संख्या
  appliedCount: number; 
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  categories,
  selectedCategories,
  onCategorySelect,
  onClearFilters,
  appliedCount, // ✅ प्रॉप को स्वीकार किया गया
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Search/Filter logic
  const filteredCategories = categories.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const numSelectedFilters = selectedCategories.length;
  const isClearDisabled = numSelectedFilters === 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        {/* बाहर टैप करने पर बंद करने के लिए */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            {/* Modal Content - Prevent tap outside from closing on this specific view */}
            <TouchableWithoutFeedback> 
              <View style={styles.modalContent}>
                
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Filter by Category</Text>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {/* Search Input */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search categories..."
                    placeholderTextColor="#999"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                
                {/* Category List */}
                <FlatList
                    data={filteredCategories}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => {
                        const selected = selectedCategories.includes(item.name);
                        return (
                            <TouchableOpacity
                                style={styles.categoryItem}
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
                                {/* Custom Checkbox Style */}
                                <View style={[
                                    styles.checkbox, 
                                    selected && styles.checkboxSelected
                                ]}>
                                    {selected && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>No categories found.</Text>
                    )}
                />

                {/* Footer Buttons */}
                <View style={styles.footer}>
                    {/* Clear All Button */}
                    <TouchableOpacity
                        style={[styles.footerButton, styles.clearButton, isClearDisabled && styles.clearButtonDisabled]}
                        onPress={onClearFilters}
                        disabled={isClearDisabled}
                    >
                        <Text style={[styles.clearText, isClearDisabled && styles.clearTextDisabled]}>Clear All</Text>
                    </TouchableOpacity>

                    {/* Apply/Done Button */}
                    <TouchableOpacity
                        style={[styles.footerButton, styles.applyButton]}
                        // Done बटन केवल Modal को बंद करता है, क्योंकि फ़िल्टरिंग पहले ही लागू हो चुकी है।
                        onPress={onClose} 
                    >
                        <Text style={styles.applyText}>
                            Show {appliedCount} {appliedCount === 1 ? 'Item' : 'Items'}
                        </Text>
                    </TouchableOpacity>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        maxHeight: '85%',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 22,
        color: '#999',
    },
    searchInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#eee',
    },
    listContainer: {
        paddingBottom: 20,
    },
    categoryItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
        flexShrink: 1,
    },
    categoryTextSelected: {
        color: '#FF9800',
        fontWeight: '600',
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        borderColor: '#FF9800',
        backgroundColor: '#FF9800',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: -2,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 40,
        fontSize: 16,
        color: '#999',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    footerButton: {
        flex: 1,
        padding: 14,
        borderRadius: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
    },
    clearButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    clearButtonDisabled: {
        opacity: 0.6,
    },
    applyButton: {
        backgroundColor: '#FF9800',
        marginLeft: 10,
    },
    clearText: {
        textAlign: 'center',
        color: '#555',
        fontWeight: '600',
        fontSize: 16,
    },
    clearTextDisabled: {
        color: '#aaa',
    },
    applyText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default FilterModal;