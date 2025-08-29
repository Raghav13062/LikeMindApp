import React from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import imageIndex from "../assets/imageIndex";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  value?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  onSearchChange,
  value,
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
      <Image source={imageIndex.filter} style={styles.icon} resizeMode="cover" />
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
    height: 50,
    marginVertical: 15,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,   // a bit softer
        shadowRadius: 8,       // slightly wider blur
      },
      android: {
        elevation: 6,          // bumps the depth
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
