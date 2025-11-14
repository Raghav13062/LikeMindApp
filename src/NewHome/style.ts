import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const CARD_BACKGROUND = '#FFFFFF';
const BACKGROUND_LIGHT = '#F8F8F8'; // Ultra light background for depth
const TEXT_DARK = '#212121'; // Near black for sharp text
const TEXT_MUTED = '#8A8A8A'; // Soft gray for secondary text
const ACCENT_ORANGE = '#ff7b00'; // Clean, strong orange for FAB/Next Up
const ACCENT_BLUE = '#007AFF'; // iOS standard blue for schedule
const ACCENT_PURPLE = '#7950F2'; // Community accent color
const FAB_COMMUNITY_COLOR = '#00C7BE'; // New, distinct color for Community FAB

const styles = StyleSheet.create({
  // --- Global Container/Safe Area ---
  safeArea: { flex: 1, backgroundColor: BACKGROUND_LIGHT },
  container: { flex: 1, backgroundColor: BACKGROUND_LIGHT }, 
  
  // --- Shared Styles ---
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: BACKGROUND_LIGHT 
  },
  section: {
    marginBottom: 25, 
    marginTop: 22,
    paddingHorizontal: 16, 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: TEXT_DARK,
    marginBottom: 12, 
    paddingHorizontal: 0,
  },
  shadowStyle: {
    // Shared, subtle shadow for cards
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Subtle, modern shadow
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  horizontalListContainer: { paddingVertical: 5, paddingHorizontal: 0 }, 

  // --- 1. Header ---
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, 
    paddingBottom: 15,
    backgroundColor: CARD_BACKGROUND, 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderColor: '#EFEFEF',
  },
  headerGreeting: {
    fontSize: 24, 
    fontWeight: '800', 
    color: TEXT_DARK,
  },
  headerAvatar: {
    width: 45, 
    height: 45,
    borderRadius: 22.5,
  },

  // --- 2. YOUR NEXT UP (The Gradient Card) ---
  nextUpCardWrapper: {
    height: 140, 
    borderRadius: 18, 
     overflow: 'hidden',
    marginHorizontal: 0, 
    marginBottom: 10,
    // Strong shadow applied here
    ...Platform.select({
      ios: { shadowColor: ACCENT_ORANGE, shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
     }),
  },
  nextUpGradient: {
    ...StyleSheet.absoluteFillObject,
    // Slightly darker orange for better text contrast
    backgroundColor: '#F39C12', 
    opacity: 1, 
  },
  nextUpContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  nextUpLabel: {
    fontSize: 12,
    fontWeight: '800', 
    color: 'rgba(255, 255, 255, 0.95)', 
  },
  nextUpTitle: {
    fontSize: 20, 
    fontWeight: '900', 
    color: CARD_BACKGROUND,
    marginBottom: 10,
  },
  nextUpButton: {
    backgroundColor: CARD_BACKGROUND,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
   },
  nextUpButtonText: {
    color: ACCENT_ORANGE,
    fontWeight: '700',
    fontSize: 14,
  },

  // --- 3. Expert Schedule Cards ---
  lessonCard: {
    width: width * 0.45, 
    height: 150, 
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 14,
    padding: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    },
  lessonTitle: { fontSize: 14, fontWeight: '800', color: TEXT_DARK }, 
  lessonTime: { fontSize: 13, color: ACCENT_BLUE, fontWeight: '700' }, 
  lessonExpert: { fontSize: 12, color: TEXT_MUTED, marginBottom: 8 },
  lessonButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5, 
    borderColor: ACCENT_BLUE,
  },
  lessonButtonText: { color: ACCENT_BLUE, fontSize: 12, fontWeight: '600' },

  // --- 4. Communities Cards ---
  communityCard: {
    width: width * 0.35,
    height: 125,
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 14,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    },
  communityIcon: { 
      marginBottom: 8, 
      width: 40, height: 40, borderRadius: 20, 
      backgroundColor: 'rgba(121, 80, 242, 0.1)', // Light purple background
      alignItems: 'center', 
      justifyContent: 'center' 
  }, 
  communityIconInner: { color: ACCENT_PURPLE }, 
  communityName: { fontSize: 13, fontWeight: '700', color: TEXT_DARK, textAlign: 'center', marginTop: 5 }, 
  unreadBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF3B30', 
    borderRadius: 10, 
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  unreadText: { fontSize: 9, color: CARD_BACKGROUND, fontWeight: 'bold' },
  
  // --- Community Empty State Styles ---
  communityEmptyState: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF', 
  },
  communityEmptyText: {
    fontSize: 14,
    color: TEXT_MUTED,
    marginBottom: 10,
    textAlign: 'center',
  },
  communityEmptyButton: {
    backgroundColor: ACCENT_PURPLE, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  communityEmptyButtonText: {
    color: CARD_BACKGROUND,
    fontWeight: '700',
    fontSize: 14,
  },

  // --- 5. Event List Items (Horizontal) ---
  eventListItem: {
    width: width * 0.55, 
    height: 90,
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 14,
    padding: 15,
    marginRight: 15,
    justifyContent: 'center',
    },
  eventListTitle: { fontSize: 16, fontWeight: '700', color: TEXT_DARK, marginBottom: 4 },
  eventListTime: { fontSize: 13, fontWeight: '600', color: ACCENT_ORANGE, marginBottom: 2 },
  eventListLocation: { fontSize: 12, color: TEXT_MUTED },

  // --- 6. People & Exploration ---
  peopleListContainer: { alignItems: 'center', paddingVertical: 5 },
  peopleAvatarContainer: {
    alignItems: 'center',
    marginRight: 18, 
    width: 60, 
  },
  peopleAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 3,
    borderColor: CARD_BACKGROUND, 
    marginBottom: 5,
  },
  peopleNameLabel: { fontSize: 11, color: TEXT_MUTED, textAlign: 'center' },

  // --- 7. FAB Speed Dial Styles (REFINED) ---
  fabContainer: {
    position: 'absolute',
    bottom: 35, 
    right: 25, 
    alignItems: 'flex-end',
    zIndex: 99,
  },
  mainFabButton: {
    backgroundColor: ACCENT_ORANGE,
    width: 60,
    height: 60,
    borderRadius: 30,
    // Stronger shadow for the main floating button
    ...Platform.select({
        ios: { shadowColor: ACCENT_ORANGE, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
     }),
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainFabIcon: { fontSize: 35, fontWeight: '300', color: CARD_BACKGROUND, lineHeight: Platform.OS === 'ios' ? 40 : 45 },
  secondaryFabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    marginBottom: 10, // Spacing between animated options
  },
  secondaryFabButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
   },
  fabCommunity: { backgroundColor: FAB_COMMUNITY_COLOR }, // Cyan/Teal
  fabEvent: { backgroundColor: ACCENT_PURPLE }, // Purple
  secondaryFabText: {
    backgroundColor: CARD_BACKGROUND,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 13, 
    fontWeight: '600',
    color: TEXT_DARK,
    marginRight: 8, 
   }
});
 export default styles;