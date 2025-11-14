import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    // Allows content to scroll and provides padding for the floating button
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100, 
  },
  
  // Profile Details
  name: {
    fontSize: 28, // Slightly larger
    fontWeight: '800', // Bolder
    color: '#1a1a1a', // Dark text for high contrast
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },

  // Rating Section
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
   },
  starText: {
    fontSize: 18,
    color: '#FFCC00', // Vibrant Gold color for stars
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 5, // Space out from stars
    fontWeight: '500',
  },

  // About & Service Sections
  section: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18, // Slightly larger title
    fontWeight: '700',
    color: '#F39C12', // Primary purple color
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify', // Make it cleaner
  },

  // Services & Pricing Rows
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Light separator
    paddingRight: 5,
  },
  priceIcon: {
    height: 22,
    width: 22,
   },
  priceLabel: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    marginLeft: 15, // Increased margin for better separation
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '600', // Very bold
    color: 'black', // Dark Purple for emphasis (Fixed from 'gray')
  },
  
  // Book Button (Fixed at the bottom for a floating effect)
  bookButton: {
    position: 'absolute',
    bottom: 30, // Space from the bottom edge
    left: 20,
    right: 20,
    backgroundColor: '#F39C12', // Vibrant Gold/Yellow for action
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    // Shadow for a "floating" feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 }, // Stronger shadow
    shadowOpacity: 0.35,
    shadowRadius: 8,
   },
  bookButtonText: {
    color: 'white', // Dark text to contrast with Gold button
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default styles;