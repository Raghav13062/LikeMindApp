import { useEffect, useState,   } from 'react';
import { useNavigation } from '@react-navigation/native';
 import {       getgroups } from '../../../Api/apiPaidExperti';
import AsyncStorage from '@react-native-async-storage/async-storage';
  const useHoneShared = () => {
  const navigation:any = useNavigation();
   const [getGroup, setgetGroup] = useState(null);
    const [loading, setLoading] = useState(false);
 useEffect(()=>{
  fetchEventS()
 },[])

  
  const fetchEventS = async () => {
              const token = await AsyncStorage.getItem("token");
console.log("token",token)

    try {
       const response = await getgroups(setLoading);
      if (response?.data) {
        setgetGroup(response.data)
      } else {
        console.warn("No response or invalid community data.");
      }
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
   
 

 
  return {
    navigation,
     loading ,
     getGroup
   };
};

export default useHoneShared;
