
import {  Platform, StyleSheet } from 'react-native';
 

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  photoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop:10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    color:"black"
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    color:"black",
    height:50,
    
  },
  chip: {
     borderRadius: 16,
    paddingVertical: 8,
     alignSelf: 'flex-start',
    marginBottom: 8,
        color:"black",
        fontWeight:"600"

  },
 
  dayText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  dateBox: {
    width: 40,
    height: 50,
    borderRadius: 10,
    borderColor: '#8E44AD',
    borderWidth: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBoxActive: {
    backgroundColor: '#8E44AD',
    borderColor: '#8E44AD',
  },
  dateText: {
    color:"black"
  },
  dateTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  timeRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  timeChip: {
    backgroundColor: '#8E44AD',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    color:"white",
    fontSize:14
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    marginTop:11,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
   },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 6,
    color:"black"
  },
  cardText: {
    color:"black"

  },
  editButton: {
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:20,
    marginHorizontal:18
  },
  editText: {
    color:"white",
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;
