
import {  StyleSheet } from 'react-native';
 

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  progressContainer: {
    marginBottom: 12,
    marginTop:12

  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  
  progressBar: {
    height: 6,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    width: '20%',
    height: '100%',
    backgroundColor: '#9b5de5',
  },
  progressText: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    color: '#444',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F7F8F8',
    backgroundColor: '#F7F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    color:"black"
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageBox: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#ffba08',
     borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle:"dotted"
  },
  plusText: {
    fontSize: 24,
    color: '#ffba08',
  },
  nextButton: {
    backgroundColor: '#ffba08',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;
