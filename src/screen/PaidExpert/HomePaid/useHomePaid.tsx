import { useEffect, useState,   } from 'react';
import { useNavigation } from '@react-navigation/native';
 import {     DeleteEvent, GetEventPaid } from '../../../Api/apiPaidExperti';
  const useHomePaid = () => {
  const navigation:any = useNavigation();
   const [getEvent, setgetEvent] = useState(null);
    const [loading, setLoading] = useState(false);
 useEffect(()=>{
  fetchEventS()
 },[])

  
  const fetchEventS = async () => {
    try {
       const response = await GetEventPaid(setLoading);
      if (response?.data) {
        setgetEvent(response.data)
      } else {
        console.warn("No response or invalid community data.");
      }
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
   
 

const handleDelete = async(item:any)=>{
  try {
    const response = await DeleteEvent(setLoading,item);
   if (response) {
    fetchEventS()
    } 
 } catch (error) {
   console.error("Community fetch error:", error);
 } finally {
   setLoading(false);
 }
}
  return {
    navigation,
    handleDelete,
    loading ,
    getEvent
   };
};

export default useHomePaid;
