
import {  Platform, StyleSheet } from 'react-native';
 

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '700',
    color: 'black',
    marginTop:10
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f9a825',
  },
  nextButton: {
     backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal:20,
    marginBottom:20
  },
  progressContainer: {
    marginBottom: 12,
    marginTop:22
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
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionSelected: {
    borderColor: '#f9a825',
  },
});
export default styles;
