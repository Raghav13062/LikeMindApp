import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8fa',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#7B7B7B',
  },
  itemContainer: {
 flexDirection: 'row',       // ✅ Works on both iOS and Android
alignItems: 'center',       // ✅ Works on both
backgroundColor: '#fff',    // ✅ Works on both
borderRadius: 12,           // ✅ Works on both
padding: 12,                // ✅ Works on both
marginBottom: 10,           // ✅ Works on both
 
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  time: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B81',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 18,
  },
});

export default styles;
