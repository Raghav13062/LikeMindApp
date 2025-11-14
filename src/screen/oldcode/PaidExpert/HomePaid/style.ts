
import { Platform } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { fontSize: 18, fontWeight: 'bold' },
  icons: { flexDirection: 'row' },
  icon: { fontSize: 20, marginLeft: 10 },
  statusDelete: {
    backgroundColor: '#F44336', // red
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 16,
  },
  searchInput: { flex: 1, marginHorizontal: 8 },
  searchIcon: { fontSize: 16 },
  filterIcon: { fontSize: 16 },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    alignItems: 'flex-start',
  
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,   // a bit softer
        shadowRadius: 8,       // slightly wider blur
      },
      android: {
        elevation: 6,          // bumps the depth
        shadowColor: '#000',   // helps on Android 12+
      },
    }),
  },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  profileName: { fontSize: 16, fontWeight: 'bold',color:"black" ,marginBottom:5,marginTop:2},
  profileRating: {marginTop:4, fontSize: 12, color: 'black' },
  profileDetail: { fontSize: 13, marginTop:12, fontWeight: '600',color:"#677294" },
  profileServices: { fontSize: 12, color: 'black' ,marginTop:5, marginBottom:11 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginBottom:12,
    marginTop:8,
    color:"#677294"
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    
 
    justifyContent: 'center',
    alignItems: 'center',
   },
  sectionTitle: { fontWeight: 'bold', fontSize: 16,color:"black" },
  seeAll: { color: '#8E44AD', fontWeight: '600',fontSize:14 },
  clientCard: {
    flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white', // Make sure "white" is lowercase
  padding: 12,
  borderRadius: 15,
  marginBottom: 10,

  // Shadow for Android
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,   // a bit softer
      shadowRadius: 8,       // slightly wider blur
    },
    android: {
      elevation: 6,          // bumps the depth
      shadowColor: '#000',   // helps on Android 12+
    },
  }),
  marginHorizontal:1,
  
  },
  clientImg: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  clientName: { fontWeight: '600',color:"black",fontSize:15 },
  clientDate: { fontSize: 12, color: '#8E44AD' },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-start', // this ensures the button sizes based on content
    },
  badgeText: { fontSize: 11, marginTop:3, color: '#fff', fontWeight: '600' },
  statusActive: { backgroundColor: '#22C55E' },
  statusInactive: { backgroundColor: '#9CA3AF' },
  statusPending: { backgroundColor: '#F59E0B' },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 15,

    width: 320,
    marginHorizontal:1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,   // a bit softer
        shadowRadius: 8,       // slightly wider blur
      },
      android: {
        elevation: 6,          // bumps the depth
        shadowColor: '#000',   // helps on Android 12+
      },
    }),
    marginBottom:12
  },
  serviceImg: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  serviceTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
    color: '#111',
  },
  serviceDesc: {
    fontSize: 12,
    color: '#555',
  },

});

export default styles;
