
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { marginTop:11,flex: 1, backgroundColor: '#fff', paddingHorizontal: 12,  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
    marginBottom: 16,
    height: 50,
  },
  searchInput: { flex: 1, paddingVertical: 8, paddingHorizontal: 10, color: '#000' },
  sectionTitle: { color:"black", fontSize: 18, fontWeight: '800', marginVertical: 8 },
  meetupCard: {
    width: 150,
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
  avatar: { width: 70, height: 70,  marginBottom: 8 },
  meetupName: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  connectButton: {
    backgroundColor: '#F39C12',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom:2,
    marginTop:3
  },
  connectButtonText: { fontSize: 14, fontWeight: '600', color: 'white' },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F9FBFF',
    backgroundColor:"#F9FBFF" ,
    marginBottom:10
  },
  chatAvatar: { width: 55, height: 55, borderRadius: 30, marginRight: 12 },
  chatName: { fontSize: 16, fontWeight: '600',color:"black" },
  chatMessage: { fontSize: 14, color: '#777' },
  chatTime: { fontSize: 12, color: '#aaa' },
  chatBadge: {
    backgroundColor: '#9C27B0',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  chatBadgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    
 
    justifyContent: 'center',
    alignItems: 'center',
   },
});

export default styles;
