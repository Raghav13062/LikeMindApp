import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 interface SuccessMessageCustomProps {
  message: string;
  titie?: string;
  first?: boolean;
  color?: string;
  textColor?:string;
}
 
const SuccessMessageCustom = ({ message, titie, first = true, color ,  textColor}: SuccessMessageCustomProps) => {
 
  return (
    <View style={[styles.container, { backgroundColor: color ? color : 'red' }]}>
      {titie && <Text style={[styles.title, {color: textColor ? textColor : "white"}]}>{titie}</Text>}
      <Text style={[styles.message, { color: textColor ? textColor : "white" }]}>{message}</Text>
 
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal:18,
    borderRadius: 8,
    marginVertical: 8,
    alignItems:'center',
    justifyContent:'center',
  },
 title: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 4,
  textAlign: 'center',
  alignSelf: 'center',
},
message: {
  fontSize: 14,
   textAlign: 'center',
  alignSelf: 'center',
},
});
 
export default SuccessMessageCustom;