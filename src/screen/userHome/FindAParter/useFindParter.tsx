import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import {   RejectprofileApi, socialusersApi,  userLikeApi } from '../../../Api/apiRequest';
 
const useFindParter = () => {
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
        setStandoutList(response.data)
      }  
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const LikeFunction = async (id:any) => {
    try {
      setIsLoading(true);
      const response = await userLikeApi(id,setIsLoading);
      if (response) {
        fetchEventS()
       }  
    } catch (error) {
     } finally {
      setIsLoading(false);
    }
  };
  const closeFunction = async (id:any) => {
    try {
      setIsLoading(true);
      const response = await RejectprofileApi(id,setIsLoading);
      if (response) {
        fetchEventS()
       }  
    } catch (error) {
     } finally {
      setIsLoading(false);
    }
  };
  return {
    navigation,
    isLoading,
    setIsLoading,
    closeFunction,
    standoutList, setStandoutList ,
    LikeFunction };
};

export default useFindParter;
