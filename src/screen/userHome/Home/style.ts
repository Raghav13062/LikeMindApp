
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginHorizontal: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold',color:"black" },
  iconRow: { flexDirection: 'row', alignItems: 'center' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
    marginHorizontal: 3,
    alignItems: 'flex-start',
  
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  
  },
  featureIcon: { height: 50, width: 50, resizeMode: 'contain' },
  cardText: { marginLeft: 12, flex: 1 },
  cardTitle: { fontWeight: '600', color:"black", fontSize: 15 },
  cardDesc: { fontSize: 13, color: '#666', lineHeight: 16, marginTop: 3 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  sectionTitle: { fontSize: 15, fontWeight: 'bold',color:"black" },
  viewAll: { color: '#8E44AD', fontSize: 13 },

  horizontalScroll: { marginTop: 12 },
  eventCard: {
    width: 260,
    marginRight: 16,
    marginLeft: 2,
    marginBottom: 3,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    
  
    ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        },
        android: {
          elevation: 4,
        },
      }),
  
  },
  eventImage: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  eventTitle: { fontSize: 13, fontWeight: '500' },
  eventTime: { color: '#8E44AD', fontSize: 13,marginTop:2,
    marginBottom:5
   },
  joinButton: {
    marginTop: 6,
    backgroundColor: '#F39C12',
    paddingVertical: 4,
    borderRadius: 20,
    width: 80,
  },
  joinText: { color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: 14 },

  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  personName: { fontWeight: 'bold', fontSize: 15 },
  personDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  connectButton: {
    backgroundColor: '#F39C12',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  connectText: { color: '#fff', fontWeight: '600' },
  peopleCard: {
    width: 180,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,      // <— noticeably rounder
    marginRight: 16,
    marginLeft: 2,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  
    // Shadow (iOS) & Elevation (Android)
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
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    
 
    justifyContent: 'center',
    alignItems: 'center',
   },
  peopleAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  
  peopleName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 6,
    color:"black"
  },
  
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f2f2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFA500',
    marginRight: 6,
  },
  
  tagText: {
    fontSize: 12,
    color: '#333',
    marginLeft:5
  },
  
  peopleLocation: {
    fontSize: 12,
    color: 'purple',
    textAlign: 'center',
    marginBottom: 10,
  },
  
  connectButtonPeople: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  
});
export default styles;
