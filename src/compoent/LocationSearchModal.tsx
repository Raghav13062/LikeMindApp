 
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Keyboard, Platform } from 'react-native';

export default function LocationSearchModal({ visible, onClose, onSelectLocation, }:any) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeout = useRef(null);
const apiKey = 'AIzaSyDgFGS91BvviXh_f-nmvtEggUHJcaGyUwA';
  useEffect(() => {
    if (!visible) {
      setQuery('');
      setSuggestions([]);
      setLoading(false);
      setError(null);
    }
  }, [visible]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    // Debounce requests
    if (searchTimeout?.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => searchTimeout.current && clearTimeout(searchTimeout.current);
  }, [query]);

  async function fetchSuggestions(input) {
    if (!apiKey) {
      setError('Google Places API key is required (pass via prop `apiKey`)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use the Places Autocomplete endpoint
      const encoded = encodeURIComponent(input);
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encoded}&key=${apiKey}&language=hi&types=geocode`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
        setError(json.error_message || json.status);
        setSuggestions([]);
      } else {
        setSuggestions(json.predictions || []);
      }
    } catch (e) {
      setError(e.message);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  async function selectSuggestion(item:any) {
    Keyboard.dismiss();
    setLoading(true);
    try {
      // Get place details to retrieve lat/lng
      const placeId = item.place_id;
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=name,geometry,formatted_address`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.status !== 'OK') {
        setError(json.error_message || json.status);
        setLoading(false);
        return;
      }

      const result = json.result;
      const location = result.geometry && result.geometry.location;
      const place = {
        name: result.name || item.description,
        address: result.formatted_address || item.description,
        latitude: location ? location.lat : null,
        longitude: location ? location.lng : null,
        placeId,
      };

      // Pass selected place back to parent
      onSelectLocation && onSelectLocation(place);
      onClose && onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }:any) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => selectSuggestion(item)}>
        <Text numberOfLines={1} style={styles.itemText}>{item.description}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextInput
              placeholder="Search location"
              value={query}
              onChangeText={setQuery}
              autoFocus
              style={styles.input}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {loading && <ActivityIndicator style={{ margin: 12 }} />}

          {error ? (
            <View style={styles.messageBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={() => (
                <View style={styles.messageBox}>
                  <Text style={styles.infoText}>{query ? 'No results' : 'Type to search places'}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  cancelButton: {
    paddingHorizontal: 8,
  },
  cancelText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  itemText: {
    fontSize: 16,
  },
  messageBox: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#666',
  },
  errorText: {
    color: '#c00',
  },
});

 