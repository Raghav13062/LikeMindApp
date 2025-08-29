import {   useState,   } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
 import { BookingEvent } from '../../../Api/apiRequest';
  const useMarketProfile = () => {
  const navigation:any = useNavigation();
       const [loading, setLoading] = useState(false);
       const [bookModal, setbookModal] = useState(false);
      const route:any = useRoute()
  const {item} = route?.params || ""
   const submiFrom = async () => {
     
    try {
       const response = await BookingEvent(item,setLoading,navigation);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
 


  return {
    navigation,
    submiFrom ,
    item ,
    bookModal, setbookModal ,
    loading
   };
};

export default useMarketProfile;
