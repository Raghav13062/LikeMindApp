import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import {   GeteventcategoriesApi, Usergetevents } from '../../../Api/apiRequest';
 
const useExpertMarkert = () => {
  const navigation: any = useNavigation();
   const [isLoading, setIsLoading] = useState(false);
  const [event, setevent] = useState([]);
  const [eventCategories, seteventCategories] = useState([]);

  useEffect(() => {
     fetchEventS()
     Eventcategories()
  }, []);

 

  const fetchEventS = async () => {
    try {
      setIsLoading(true);
      const response = await Usergetevents(setIsLoading);
      if (response?.data) {
          setevent(response.data)
      } else {
        console.warn("No response or invalid community data.");
      }
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const Eventcategories = async () => {
    try {
      setIsLoading(true);
      const response = await GeteventcategoriesApi(setIsLoading);
      if (response?.data) {
         seteventCategories(response.data)
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
     event, setevent ,
     eventCategories
  };
};

export default useExpertMarkert;
