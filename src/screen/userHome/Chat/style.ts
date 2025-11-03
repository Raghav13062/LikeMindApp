import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
   },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  userAddress: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
});
