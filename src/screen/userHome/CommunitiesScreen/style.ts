
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

// Replace the existing styles object with the one below

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterRow: {
      marginTop: 6,
      marginBottom: 16,
      paddingVertical: 4,
    },
      colorfulChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#f9f9f9",
    shadowOffset: { width: 0, height: 2 },
   },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
   borderWidth:1,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },

  colorfulChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },

  tagIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },

    tagChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#150149',
      borderRadius: 24,
      paddingHorizontal: 5,
      paddingVertical: 5,
      marginRight: 10,
      height:45 ,marginTop:11,
       
    },
    
   
    
    tagText: {
      fontSize: 13.5,
      fontWeight: '500',
      color: 'white',
    },
    
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 16,
    color: '#212529',
  },
  
  chipWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    height: 44,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chipIcon: {
    height: 18,
    width: 18,
    marginRight: 6,
    resizeMode: 'contain',
  },
  chipText: {
    fontSize: 13,
    color: '#495057',
  },
  list: {
    paddingBottom: 200,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 1,
    overflow: 'hidden',
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover', 
    borderRadius:20
  },
  cardContent: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#212529',
  },
  cardDescription: {
    fontSize: 13.5,
    color: '#6C757D',
    marginTop: 4,
  },
  cardMembers: {
    fontSize: 12,
    color: '#ADB5BD',
    marginTop: 6,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  customChip: {
    backgroundColor: '#E9ECEF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginRight: 6,
    marginBottom: 6,
  },
  joinBtn: {
     alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#F39C12',
    borderRadius: 20,
   },
  joinBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#F39C12',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
       },
    }),
  },
  fabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
   fab1: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#F39C12',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
       },
    }),
  },

    fab12: {
    position: 'absolute',
    right: 20,
    bottom: 170,
    backgroundColor: '#F39C12',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
       },
    }),
  },
});

export default styles;
