
import {  StyleSheet } from 'react-native';
 

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor:"white"
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop:12

  },
  subHeader: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color:"black"
  },
  progressContainer: {
    marginBottom: 12,
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
  input: {
   borderWidth: 1,
    borderColor: '#F7F8F8',
    backgroundColor: '#F7F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderColor: '#8E44AD',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  chipSelected: {
    backgroundColor: '#8E44AD',
  },
  chipText: {
    color: '#A000C8',
  },
  chipTextSelected: {
    color: '#fff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8E44AD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedDot: {
    width: 10,
    height: 10,
    backgroundColor: '#8E44AD',
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 14,
    color:"black"
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;
