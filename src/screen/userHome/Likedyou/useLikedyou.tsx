import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GetSocial } from '../../../Api/apiRequest';
  const useLikedyou = () => {
  const navigation: any = useNavigation();
   const [isLoading, setIsLoading] = useState(false);
  const [likeYou, setlikeYou] = useState([]);
 
  useEffect(() => {
 
     social()
  }, []);

 
 

  const social = async () => {
    try {
      setIsLoading(true);
      const response = await GetSocial(setIsLoading);
      if (response?.data) {
        setlikeYou(response.data)
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
     likeYou, setlikeYou ,
   };
};

export default useLikedyou;
