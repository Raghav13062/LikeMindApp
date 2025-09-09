import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { UserGetCateoryApi } from '../Api/apiRequest';

export default function CreateCommunityModal({ visible, onSummit, onClose }: any) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    categoryName: '',
    tags: '',
    privacy: 'Public',
    logo: null,
  });

  const [errors, setErrors] = useState<any>({});
  const [getCategorylist, setgetCategorylist] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    UserGetCateoryApi1();
  }, []);

  const UserGetCateoryApi1 = async () => {
    try {
      const response = await UserGetCateoryApi(setIsLoading);
      if (response && response.data) {
        setgetCategorylist(response.data);
      } else {
        console.warn('No response or invalid response data.');
      }
    } catch (error) {
      console.error('Category fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.8,
      });
      if (image?.path) {
        setForm({ ...form, logo: image.path });
      }
    } catch (error) {
      console.log('Image pick cancelled or failed', error);
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = 'Title is required';
      valid = false;
    }
    if (!form.description.trim() || form.description.length < 1) {
      newErrors.description = 'Description must be at least 10 characters';
      valid = false;
    }
    if (!form.category) {
      newErrors.category = 'Please select a category';
      valid = false;
    }
    if (!form.tags.trim()) {
      newErrors.tags = 'Please enter at least one tag';
      valid = false;
    }
    if (!form.logo) {
      newErrors.logo = 'Please upload a community logo';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSummit(form);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.modalContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.modalTitle}>Create Community</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.stepBtn, { color: 'black' }]}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Step 1: Title + Description */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Community Name"
          placeholderTextColor={"black"}
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <Text style={styles.label}>Summary / Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Write a short description"
          multiline
                    placeholderTextColor={"black"}

          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
        />
        {errors.description && (
          <Text style={styles.error}>{errors.description}</Text>
        )}

        {/* Step 2: Category + Tags */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={{ color: form.categoryName ? 'black' : '#999' }}>
            {form.categoryName || 'Select Category'}
          </Text>
        </TouchableOpacity>
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}

        {showDropdown && (
          <View style={styles.dropdownList}>
            {getCategorylist.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setForm({
                    ...form,
                    category: item.id,
                    categoryName: item.name,
                  });
                  setShowDropdown(false);
                }}
              >
                <Text style={{
                  color:"black",
                  fontSize:14
                }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Tags</Text>
        <TextInput
          style={styles.input}
          placeholder="Tags (comma separated)"
          value={form.tags}
                              placeholderTextColor={"black"}

          onChangeText={(text) => setForm({ ...form, tags: text })}
        />
        {errors.tags && <Text style={styles.error}>{errors.tags}</Text>}

        {/* Step 3: Privacy */}
        <Text style={styles.label}>Privacy</Text>
        {['Public', 'Private', 'Invite-only'].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.privacyOption,
              form.privacy === opt && styles.selectedOption,
            ]}
            onPress={() => setForm({ ...form, privacy: opt })}
          >
            <Text style={{ color: 'black', fontSize: 14 }}>{opt}</Text>
          </TouchableOpacity>
        ))}

        {/* Step 4: Logo Upload */}
        <Text style={styles.label}>Community Logo</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
          <Text style={{ color: 'white' }}>
            {form.logo ? 'Change Logo' : 'Upload Logo'}
          </Text>
        </TouchableOpacity>
        {errors.logo && <Text style={styles.error}>{errors.logo}</Text>}
        {form.logo && (
          <Image
            source={{ uri: form.logo }}
            style={{ width: 100, height: 100, marginTop: 10 }}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={[styles.submitBtn]} onPress={handleSubmit}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
            Create
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize:14
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  privacyOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 5,
    borderColor: '#ccc',
  },
  selectedOption: {
    borderColor: '#F39C12',
    borderWidth: 2,
  },
  uploadBtn: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F39C12',
  },
  submitBtn: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#27AE60',
  },
  stepBtn: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 150,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
