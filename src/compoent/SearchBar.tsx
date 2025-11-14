import React from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import imageIndex from "../assets/imageIndex";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  value?: string;
  onfilter?:any
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  onSearchChange,
  value,
  onfilter
}) => {
  return (
    <View style={styles.searchBar}>
      <Image source={imageIndex.search} style={styles.icon} resizeMode="cover" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(48, 45, 45, 1)"
        onChangeText={onSearchChange}
        value={value}
      />
      <TouchableOpacity onPress={onfilter}>
      <Image source={imageIndex.filter} style={styles.icon} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 55,
    marginVertical: 15,
     ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,   // a bit softer
        shadowRadius: 8,       // slightly wider blur
      },
      android: {
         shadowColor: '#000',   // helps on Android 12+
      },
    }),
  
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginLeft: 15,
  },
});

export default SearchBar;
