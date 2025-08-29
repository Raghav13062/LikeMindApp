import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import {   socialusersApi, Usergetevents } from '../../../Api/apiRequest';
 
const useStandout = () => {
  const navigation: any = useNavigation();
   const [isLoading, setIsLoading] = useState(false);
  const [standoutList, setStandoutList] = useState([]);

  useEffect(() => {
     fetchEventS()
  }, []);

 

  const fetchEventS = async () => {
    try {
      setIsLoading(true);
      const response = await socialusersApi(setIsLoading);
      if (response?.data) {
        console.log("response.data",response.data)
        setStandoutList(response.data)
      } else {
        console.warn("No response or invalid community data.");
      }
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    navigation,
    isLoading,
    setIsLoading,
    standoutList, setStandoutList  };
};

export default useStandout;
