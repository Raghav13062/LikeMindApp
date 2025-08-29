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

export default function CreateCommunityModal({ visible,onSummit, onClose }: any) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    categoryName: '',
    tags: '',
    privacy: 'Public',
    logo: null,
  });

  const [getCategorylist, setgetCategorylist] = useState([]);
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

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Community Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              multiline
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
            />
          </>
        );

      case 2:
        return (
          <>
            {/* Custom Dropdown */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={{ color: form.categoryName ? 'black' : '#999' }}>
                {form.categoryName || 'Select Category'}
              </Text>
            </TouchableOpacity>

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
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChangeText={(text) => setForm({ ...form, tags: text })}
            />
          </>
        );

      case 3:
        return (
          <>
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
          </>
        );

      case 4:
        return (
          <>
            <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
              <Text style={{ color: 'white' }}>
                {form.logo ? 'Change Logo' : 'Upload Logo'}
              </Text>
            </TouchableOpacity>
            {form.logo && (
              <Image
                source={{ uri: form.logo }}
                style={{ width: 100, height: 100, marginTop: 10 }}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.modalContainer}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.modalTitle}>Create Community (Step {step}/4)</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.stepBtn, { color: 'black' }]}>Close</Text>
          </TouchableOpacity>
        </View>

        {renderStep()}

        <View style={styles.modalActions}>
          {step > 1 && (
            <TouchableOpacity onPress={prev}>
              <Text style={styles.stepBtn}>Back</Text>
            </TouchableOpacity>
          )}
          {step < 4 ? (
            <TouchableOpacity onPress={next}>
              <Text style={styles.stepBtn}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onSummit(form)}>
              <Text style={[styles.stepBtn, { color: '#F39C12' }]}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
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
  modalActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
