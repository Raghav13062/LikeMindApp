
import {  StyleSheet } from 'react-native';
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"

  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    width: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F7941D',
  },
  email: {
    fontSize: 12,
    color: '#9DB2BF',
    fontWeight:"400",
    marginTop:5
  },
  menuList: {
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    // borderBottomColor: '#eee',
    // borderBottomWidth: 1,
  },
  menuLabel: {
    fontSize: 14,
    marginLeft: 15,
    flex: 1,
    fontWeight:"500",
    color: '#352C48',
  },
});
export default styles;
