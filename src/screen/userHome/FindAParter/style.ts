
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    // elevation: 5,
    // // shadowColor: '#000',
    // // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 220,
  },
  profileBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 55,
    overflow: 'hidden',
    width: 55,
    height: 55,
  },
  
  badgeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
 
    borderTopEndRadius:12,
    borderTopStartRadius:12,
     flexDirection:"row"
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  role: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
 
   actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,  // optional, for side spacing
   },
  actionIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    marginHorizontal: 10, // spacing between icons
  },
  
  iconBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  }, 
  img:{
    height:70,
    width:70,
    resizeMode:"contain"
  }
});
export default styles;
