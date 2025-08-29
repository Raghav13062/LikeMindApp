
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    borderBottomWidth: 0.9,
    borderColor: "rgba(236, 236, 236, 1)",
    backgroundColor:"#8E44AD"
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 16,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 27
  },
  onlineStatus: {
    color: 'rgba(58, 191, 56, 1)',
    fontSize: 15,
    marginTop: 1,
    fontWeight: "500"
 
  },
  chatList: {
    flex: 1,
     marginHorizontal:20
  },
  chatBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: '75%',
  },
  senderBubble: {
 
    backgroundColor: '#8E44AD',
    alignSelf: 'flex-end',
    borderTopRightRadius: 1, // Adjust this value as needed
    marginTop: 20
 
  },
  receiverBubble: {
   
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 1,  // Adjust this value as needed
    borderTopRightRadius: 10, // Adjust this value as needed
    marginTop: 20
 
  },
  chatText: {
    color: '#333333',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  textInput: {
 
  },
  icon: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});
export default styles;
