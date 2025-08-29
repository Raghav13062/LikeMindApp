
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  role: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 8,
    marginTop:3
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  starText: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#777',
    marginLeft:3
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    marginLeft: 6,
  },
  priceValue: {
    fontSize: 14,
    color: '#F29C1F',
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#F29C1F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal:15,
    marginBottom:15
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
export default styles;
