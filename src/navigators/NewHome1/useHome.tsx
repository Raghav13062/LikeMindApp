import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; // ✅ import dispatch
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../../redux/feature/authSlice';
import { getgroups } from '../../Api/apiPaidExperti';
import { Get_post_Api, socialusersApi, UserGetCommunitiesApi, Usergetevents } from '../../Api/apiRequest';

const useHome = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch(); // ✅ initialize dispatch
  const [isLoading, setIsLoading] = useState(false);
  const [event, setevent] = useState([]);
  const [standoutList, setStandoutList] = useState([]);
  const [communitiesList, setCommunitiesList] = useState([]);

  useEffect(() => {
    GetFunction();
    fetchEventS()
    social()
    getgroupsFunction()
    fetchCommunities()
  }, []);

  const GetFunction = async () => {
    try {
      setIsLoading(true);
      const response = await Get_post_Api(setIsLoading);
      if (response && response.data) {
        dispatch(loginSuccess({
          userData: response.data,
          token: response.data.token,
        }));
      } else {
        console.warn("No response or invalid response data.");
      }

    } catch (error) {
     } finally {
      setIsLoading(false);
    }
  };

  const fetchEventS = async () => {
    try {
      setIsLoading(true);
      const response = await Usergetevents(setIsLoading);
      if (response?.data) {
          setevent(response.data)
      }  
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getgroupsFunction = async () => {
    try {
      setIsLoading(true);
      const response = await getgroups(setIsLoading);
      if (response?.data) {
         setevent(response.data)
      }  
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const social = async () => {
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
  
    const fetchCommunities = async () => {
      try {
        setIsLoading(true);
        const response = await UserGetCommunitiesApi(setIsLoading);
        const data = response?.data || [];
        setCommunitiesList(data);
       } catch (error) {
        console.error('Community fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  return {
    navigation,
    isLoading,
    setIsLoading,
     event, setevent ,
     standoutList,
     communitiesList, setCommunitiesList
  };
};

export default useHome;
