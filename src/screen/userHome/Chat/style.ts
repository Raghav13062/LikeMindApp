import { StyleSheet } from 'react-native';

// प्राथमिक रंग: #F39C12 (नारंगी/एम्बर)
const PRIMARY_COLOR = '#F39C12'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // साइड पैडिंग
    backgroundColor: '#F7F9FC', // हल्का नीला/ग्रे बैकग्राउंड
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700', // ज्यादा बोल्ड
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  flatListContent: {
    paddingBottom: 20, // बॉटम पैडिंग
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // सफेद बैकग्राउंड
    borderRadius: 14, // गोल किनारे
    padding: 15,
    marginBottom: 10,
    // आकर्षक शैडो (अब नारंगी प्राथमिक रंग का उपयोग करके)
    shadowColor: PRIMARY_COLOR, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
   },
  userImage: {
    height: 66,
    width: 66,
    borderRadius: 66.5,
    //  borderWidth: 2,
    // borderColor: PRIMARY_COLOR, // नारंगी बॉर्डर
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10, // ऐरो के लिए जगह
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50', // गहरा रंग
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationIcon: {
    width: 22,
    height: 22,
     marginRight: 4,
  },
  userAddress: {
    fontSize: 13,
    color: '#7F8C8D',
    fontWeight: '500',
    flexShrink: 1, // ओवरफ्लो रोकने के लिए
  },
  chatArrow: {
    width: 18,
    height: 18,
    tintColor: PRIMARY_COLOR, // नारंगी ऐरो
  },
});