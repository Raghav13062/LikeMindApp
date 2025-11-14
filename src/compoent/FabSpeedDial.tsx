import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenNameEnum from '../routes/screenName.enum';

const FabSpeedDial = () => {
  const [fabOpen, setFabOpen] = useState(false);
  const navigation = useNavigation()

  return (
    <View style={styles.fabContainer}>
      {fabOpen && (
        <View style={styles.fabMenu}>
          <TouchableOpacity
            style={styles.fabMenuItem}
             onPress={() => {
    navigation.navigate(ScreenNameEnum.CommunitiesScreen);
    setFabOpen(false);   // close FAB properly
  }}
            >
            <MaterialIcons name="group-add" size={24} color="#6750A4" />
            <Text style={styles.fabMenuText}>Create Community</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fabMenuItem}
onPress={() => {
    navigation.navigate(ScreenNameEnum.EventListScreen);
    setFabOpen(false);   // close FAB properly
  }}            
            
            >
            <MaterialIcons name="event" size={24} color="#6750A4" />
            <Text style={styles.fabMenuText}>Host Event</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setFabOpen(!fabOpen)}
        activeOpacity={0.8}>
        <MaterialIcons
          name={fabOpen ? 'close' : 'add'}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 20,
    alignItems: 'flex-end',
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6750A4',
    justifyContent: 'center',
    alignItems: 'center',
     shadowColor: '#000', // iOS shadow
      
  },
  fabMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
     borderWidth:1,
    borderColor:'#ccc'
  },
  fabMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  fabMenuText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default FabSpeedDial;
