
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
   },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color:"black"
  },
  seeAll: {
    color: '#8E44AD',
  },
  categoryList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    justifyContent:"center",
    marginTop:12
  },
  categoryIcon: {
    backgroundColor: '#7D8A95',
     borderRadius: 11,
    justifyContent:"center",
    alignItems:"center" ,
    height:60,
     width:65 ,
   },
  categoryLabel: {
    marginTop: 6,
    fontSize: 12,
    color:"white"
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  cardInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    color:"black"
  },
  role: {
    fontSize: 12,
    color: '#677294',
  },
  services: {
    fontSize: 12,
    color: '#999',
    marginTop:2
   },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    // marginLeft: 6,
    fontSize: 12,
    color: '#444',
  },
});
export default styles;
