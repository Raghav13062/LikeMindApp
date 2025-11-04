import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  categoryChipSelected: {
     backgroundColor: '#ff9500',
  },
  categoryImage: {
    height: 22,
    width: 22,
    borderRadius: 11,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: 'black',
    fontWeight: '600',
  },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth:0.5,
    borderColor:'#E0E0E0'
   
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    backgroundColor: '#EEE',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#444',
  },
});

export default styles;
