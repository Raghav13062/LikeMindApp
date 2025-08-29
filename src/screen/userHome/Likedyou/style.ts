
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
     backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    marginTop:12
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#99A1BE',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarWrapper: {
    width: 54,
    height: 54,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  badge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: '#FFA500',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  subText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#8E44AD',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: '#F1F4F5',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  acceptText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  rejectText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: 'black',
  },
  menuButton: {
    paddingHorizontal: 8,
  },
  menuIcon: {
    fontSize: 22,
    color: '#999',
  },
});
export default styles;
