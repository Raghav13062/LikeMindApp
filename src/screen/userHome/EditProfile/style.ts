
import { Dimensions, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom:20
   },
  backButton: {
    marginBottom: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 35,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  editButton: {
    padding: 5,
    borderRadius: 15,
    position: 'absolute',
    bottom: -15,
    right: 140,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 130,
    backgroundColor: '#FFA500',
    borderRadius: 12,
    padding: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
     marginBottom: 10,
    color: "#ADA4A5"
  },
  input: {
    borderWidth: 1,
    borderColor: '#F8F8F8',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
    height:60,
    justifyContent:"center"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  updateButton: {
    marginTop: 20,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropView: {
    height: 45,
    justifyContent: "center",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8',
  }, 
  title :{
    marginBottom:12,
    color:"black",
    fontSize:20 ,
    fontWeight:"600" ,
  marginTop:2
   }
});
export default styles;
