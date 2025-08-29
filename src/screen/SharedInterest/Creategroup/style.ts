
import { Platform } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    
 
    justifyContent: 'center',
    alignItems: 'center',
   },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginLeft: 10,
  },
  searchBox: {
    marginTop: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  groupCard: {
    width: 240,
    marginRight: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
  },
  groupImage: {
    width: '100%',
    height: 100,
  },
  groupContent: {
    padding: 10,
  },
  groupTitle: {
    fontWeight: '600',
    fontSize: 14,
    color:"black"
  },
  groupTime: {
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },
  joinBtn: {
    backgroundColor: '#ffb300',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinBtnText: {
    fontWeight: '600',
    color: '#fff',
  },
  eventCard: {
     backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1, // Android shadow

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom:15,
  
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 10,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color:"black",
    marginBottom:5
  },
  eventLocation: {
    fontSize: 14,
    color: '#777',
  },
  eventTime: {
    fontSize: 13,
    marginBottom: 10,
    color:"gray"
  },
  rsvpBtn: {
    borderWidth: 0.5,
    borderColor: '#8E44A',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',

  },
  rsvpText: {
    color: '#8E44AD',
    fontWeight: '600',
    fontSize:14
  },
});
export default styles;
