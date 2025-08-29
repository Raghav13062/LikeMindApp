
import {  StyleSheet } from 'react-native';
 

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#8E44AD',
  },
  progressText: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    color: '#444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  dayBox: {
    width: 50,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dayBoxSelected: {
    backgroundColor: '#8E44AD',
    borderColor: '#8E44AD',
  },
  dayText: {
    fontSize: 16,
    color: '#000',
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  timeOption: {
    borderColor: '#8E44AD',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    margin: 6,
  },
  timeOptionSelected: {
    backgroundColor: '#8E44AD',
  },
  preferenceContainer: {
    marginTop: 5,
    marginBottom: 25,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#8E44AD',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: '#8E44AD',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;
