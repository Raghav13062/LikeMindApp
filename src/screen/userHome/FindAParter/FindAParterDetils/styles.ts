
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  roleText: {
    fontSize: 16,
    color: '#677294',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  ratingText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  bioText: {
    fontSize: 15,
    color: '#677294',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   },
  circleButton: {
    
  },
});
export default styles;
