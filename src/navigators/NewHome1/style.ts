import { Dimensions, Platform, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 20,
  },
  // Custom Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    marginRight: 10,
    fontSize: 16,
    color: '#666',
  },
  customAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6750A4', // प्रोफाइल आइकन का रंग
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  customIconButton: {
    padding: 4,
  },
  // Section Titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  // Next Up Card, Expert Card, Communities, Events List Styles... (पिछले कोड से अपरिवर्तित)
  nextUpCard: {
    backgroundColor: '#ff7b00',
    borderRadius: 12,
    padding: 20,
    alignItems: 'flex-start',
   },
  nextUpTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  nextUpDate: {
    fontSize: 16,
    color: '#E6E0F0',
  },
  horizontalScroll: {
    marginVertical: 5,
  },
  expertCard: {
    width: 150,
    height: 100,
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  expertTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  expertTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  expertName: {
    fontSize: 12,
    color: '#555',
  },
  communityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    
  },
  communityName: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#388E3C',
  },
  unreadBadge: {
    marginLeft: 8,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  eventBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventIcon: {
    marginRight: 15,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventSubText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  // Custom FAB/Speed Dial Styles
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'flex-end',
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6750A4', // प्राइमरी कलर
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fabMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fabMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  fabMenuText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
 export default styles;