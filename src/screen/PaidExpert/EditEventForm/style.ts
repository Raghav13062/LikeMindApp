
import { Platform } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5, 
    marginTop:20
  },
  input: {
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#333',
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',flexDirection:"row",
    alignItems:"center"
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#444',
    marginLeft:11
  },
  imagePicker: {
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  imagePickerText: {
    color: '#777',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#150149',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
