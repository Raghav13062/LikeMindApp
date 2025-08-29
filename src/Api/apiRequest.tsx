

import { base_url } from './index';
import ScreenNameEnum from '../routes/screenName.enum';
import { loginSuccess } from '../redux/feature/authSlice';
import { errorToast, successToast } from '../utils/customToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginCustomer =async (
    param: any,
    setLoading: (loading: boolean) => void,
    dispatch: any) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("identity", param?.email);
        formdata.append("password",param?.password);
         const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/auth/login`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                                                  console.log("res",res)

                const response = JSON.parse(res)
                                    console.log("response",response)

                if (response.status == '1') {
                     setLoading(false)
                    successToast(
                        response?.message
                    );
                    AsyncStorage.setItem("token", response?.data?.token);
                     if(response?.data?.user_data?.user_type === "USER"){
                         dispatch(loginSuccess({ userData: response?.data, token: response?.data?.token, }));
                         param.navigation.reset({
                            index: 0,
                            routes: [{ name: ScreenNameEnum.TabNavigator }],
                        });
                    }
                    if(response?.data?.user_data?.user_type === "PAID"){
                         dispatch(loginSuccess({ userData: response?.data, token: response?.data?.token, }));
                         param.navigation.reset({
                            index: 0,
                            routes: [{ name: ScreenNameEnum.PaidExpertTab }],
                        });
                    }
                    if(response?.data?.user_data?.user_type === "PARTNER"){
                         dispatch(loginSuccess({ userData: response?.data, token: response?.data?.token, }));
                         param.navigation.reset({
                            index: 0,
                            routes: [{ name: ScreenNameEnum.SharedChatDetails }],
                        });
                    }
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error("error,e",error));
 
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
 
const SinupCustomer = (params: any,
    setLoading: (loading: boolean) => void,) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("full_name", params?.userName);
        formdata.append("password", params.password);
        formdata.append("email", params?.email);
        formdata.append("user_type", params?.type);
    //  formdata.append("email", "demo@gmail.com");
        // formdata.append("user_type", params?.type);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/auth/signup`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                console.log("res",res)
                const response = JSON.parse(res)
                console.log("response",response)

                if (response.status == '1') {
                    successToast(
                        response?.message
                    );
                    params.navigation.navigate(ScreenNameEnum.LoginScreen);
                    return response
                } else {
                    console.log("response.error,",response)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) => console.error(error));
        return respons
    } catch (error) {
        console.log("error",error)
        errorToast(
            'Network error',
        );
    }
};


const restEmailOtpScreen = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("identity", param?.email);
         const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/auth/password-reset`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.OtpScreen, {
                        email: param?.email
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const otp_Verify = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("identity", param?.email);
        formdata.append("otp", param?.otp);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/auth/verify-otp`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    console.log("response?.result?.id",response?.data?.user_id)
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.CreatePassword, {
                        userId: response?.data?.user_id
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const updatePassword = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", param?.userId);
        formdata.append("c_password", param?.confirmPassword);
        formdata.append("password", param?.password);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/auth/create-new-password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.LoginScreen)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
 
const Get_post_Api = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ⬅️ Send token properly
        },
      };
  
      const response = await fetch(`${base_url}/auth/get-profile`, requestOptions); // ✅ await here
      const responseData = await response.json(); // ✅ parse JSON
  
      if (responseData.status === "1") {
        return responseData;
      } else {
        errorToast(responseData.error || "Something went wrong");
        return null;
      }
  
    } catch (error) {
      console.error("API call error:", error);
      errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };
  

 
  const EditProfile_Api = async (
    param: any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
  
      if (param.images) {
        formData.append("image", {
          uri: param.images,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
  if(param?.name){
    formData.append("full_name", param?.name);
  }
  if(param?.age){
    formData.append("age", param?.age);

  }
  if(param?.addresh){
    formData.append("address", param?.addresh ?? '');

  }
  if(param?.traveling){
    formData.append("exp_level", param?.traveling ?? '');

  }
  if(param?.bio){
    formData.append("goles", param?.bio ?? '');

  }
  if(param?.desp){
    formData.append("about", param?.desp ?? '');

  }

      const response = await fetch(`${base_url}/auth/update-profile`, {
        method: "POST",
        headers: {
           'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });
  
      const text = await response.text();
      const json = JSON.parse(text);
  
      setLoading(false);
  
      if (json.status == '1') {
        successToast(json?.message);
      } else {
        errorToast(json?.message);
      }
  
      return json;
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      errorToast('Network error');
    }
  };
  const ChangePass_Api = (
    param: any,
    setLoading: (loading: boolean) => void,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", param?.id);
        formdata.append("c_password", param?.password);
        formdata.append("password", param?.confirmPassword);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = fetch(`${base_url}/auth/create-new-password`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    // param.navigation.()
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

  const Policies_Api = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}/common/get_privacy_policy`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
  
      const result = await response.json();
  console.log("result",result)
      setLoading(false);
  
      if (result.status == "1") {
        return result;
      } else {
        errorToast(result.error || "Something went wrong");
        return null;
      }
    } catch (error) {
      setLoading(false);
      errorToast("Network error");
      return null;
    }
  };
  
  const Support_Api = async (
    data: { id: string; title: string;navigation:any },
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", data.id);
      formData.append("message", data.title);
      const response = await fetch(`${base_url}/common/ask_support`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
  
      const result = await response.json();
      console.log("result", result);
      setLoading(false);
      successToast(result?.message)
      data.navigation.goBack();

  
      if (result.status == "1") {
        return result;
      } else {
        errorToast(result.error || "Something went wrong");
        return null;
      }
    } catch (error) {
      setLoading(false);
      errorToast("Network error");
      return null;
    }
  };
  
  const getquestions = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_url}/common/get_questions`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
  
      const result = await response.json();
  console.log("result",result)
      setLoading(false);
  
      if (result.status == "1") {
        return result;
      } else {
        errorToast(result.error || "Something went wrong");
        return null;
      }
    } catch (error) {
      setLoading(false);
      errorToast("Network error");
      return null;
    }
  };
  
  const UserGetCommunitiesApi = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      // Get token from local storage
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);
  
      // Setup request headers
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
  
      // Call the API
      const response = await fetch(`${base_url}/get_communities`, requestOptions);
  
      // Parse the response only ONCE
      const responseData = await response.json();
      console.log("API Response Data:", responseData);
  
      // Check if API returned success
      if (response.ok && responseData.status === "1") {
        return responseData;
      } else {
        // Show error message from API
        errorToast(responseData.error || responseData.message || "Something went wrong");
        return null;
      }
  
    } catch (error) {
      console.error("API call error:", error);
      errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const UserGetCateoryApi = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      // Get token from local storage
      const token = await AsyncStorage.getItem("token");
   
      // Setup request headers
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
  
      // Call the API
      const response = await fetch(`${base_url}/get-community-categories`, requestOptions);
  
      // Parse the response only ONCE
      const responseData = await response.json();
   
      // Check if API returned success
      if (response.ok && responseData.status === "1") {
        return responseData;
      } else {
        // Show error message from API
        errorToast(responseData.error || responseData.message || "Something went wrong");
        return null;
      }
  
    } catch (error) {
       errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  
  const userAddCommunity = async (
    param: any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
  
      if (param.logo) {
        formData.append("image", {
          uri: param.logo,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
  if(param?.description){
    formData.append("description", param?.description);
  }
  if(param?.name){
    formData.append("name", param?.description);
  }
  if(param?.category){
    formData.append("categor_id", param?.category);
  }
  if(param?.tags){
    formData.append("tags", param?.tags);

  }
  if(param?.privacy){
    formData.append("privacytype", param?.privacy);

  }

   

      const response = await fetch(`${base_url}/create-community`, {
        method: "POST",
        headers: {
           'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });
  
      const text = await response.text();
      const json = JSON.parse(text);
  
      setLoading(false);
  
      if (json.status == '1') {
        successToast(json?.message);
      } else {
        errorToast(json?.message);
      }
  
      return json;
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      errorToast('Network error');
    }
  }; 



  const Usergetevents = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      // Get token from local storage
      const token = await AsyncStorage.getItem("token");
   
      // Setup request headers
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
  
      // Call the API
      const response = await fetch(`${base_url}/get-events`, requestOptions);
  
      // Parse the response only ONCE
      const responseData = await response.json();
   
      // Check if API returned success
      if (response.ok && responseData.status === "1") {
        return responseData;
      } else {
        // Show error message from API
        errorToast(responseData.error || responseData.message || "Something went wrong");
        return null;
      }
  
    } catch (error) {
      console.error("API call error:", error);
      errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };



  const GeteventcategoriesApi = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
   
      const response = await fetch(`${base_url}/get-event-categories`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const text = await response.text();
   
      try {
        const data = JSON.parse(text);
   
        if (response.ok && data.status === "1") {
          return data;
        } else {
          errorToast(data.message || "API Error");
          return null;
        }
      } catch (err) {
        console.error("JSON Parse Error:", err);
        errorToast("Invalid response format");
        return null;
      }
  
    } catch (error) {
      console.error("API call error:", error);
      errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };
  const socialusersApi = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      // Get token from local storage
      const token = await AsyncStorage.getItem("token");
   
      // Setup request headers
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
  
      // Call the API
      const response = await fetch(`${base_url}/get-social-users`, requestOptions);
  
      // Parse the response only ONCE
      const responseData = await response.json();
   
      // Check if API returned success
      if (response.ok && responseData.status === "1") {
        return responseData;
      } else {
        // Show error message from API
        errorToast(responseData.error || responseData.message || "Something went wrong");
        return null;
      }
  
    } catch (error) {
      console.error("API call error:", error);
      errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };




  const userLikeApi = async (
    id:any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
     try {
      const token = await AsyncStorage.getItem("token");
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          like_id: id,
        }),
      };
  
      const response = await fetch(`${base_url}/like-profile`, requestOptions);
      const responseData = await response.json();
       if (response.ok && responseData.status === "1") {
        successToast(responseData?.message)
        return responseData;
      } else {
        errorToast(responseData.error || responseData.message || "Something went wrong");
        return null;
      }
    } catch (error) {
       errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  }; 

  const RejectprofileApi = async (
    id:any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
     try {
      const token = await AsyncStorage.getItem("token");
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          like_id: id,
        }),
      };
  
      const response = await fetch(`${base_url}/reject-profile`, requestOptions);
      const responseData = await response.json();
       if (response.ok && responseData.status === "1") {
        successToast(responseData?.message)
        return responseData;
      } else {
        errorToast(responseData.error || responseData.message || "Something went wrong");
        return null;
      }
    } catch (error) {
       errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  }; 
  const BookingEvent = async (
    item:any,
    setLoading: (loading: boolean) => void,
    navigation:any
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
  
 
  if(item?.price){
    formData.append("total_amount", item?.price);
  }
  if(item?.id){
    formData.append("event_id", item?.id);
  }
   
      const response = await fetch(`${base_url}/booking-event`, {
        method: "POST",
        headers: {
           'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });
  
      const text = await response.text();
      const json = JSON.parse(text);
  
      setLoading(false);
  
      if (json.status == '1') {
        successToast(json?.message);
        navigation.goBack()
      } else {
        errorToast(json?.message);
       }
  
      return json;
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      errorToast('Network error');
    }
  };

  const GetSocial = async (
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      // Get token from local storage
      const token = await AsyncStorage.getItem("token");
      // Setup request headers
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      // Call the API
      const response = await fetch(`${base_url}/get-social-user-likes`, requestOptions);
       const responseData = await response.json();
      if (response.ok && responseData.status === "1") {
        return responseData;
      } else {
        // Show error message from API
        errorToast(responseData.error || responseData.message || "Something went wrong");
        return null;
      }
  
    } catch (error) {
      console.error("API call error:", error);
      errorToast("Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };
  
export {UserGetCateoryApi, RejectprofileApi,GetSocial, BookingEvent,userLikeApi,socialusersApi,GeteventcategoriesApi,Usergetevents, userAddCommunity, Support_Api,getquestions,UserGetCommunitiesApi,  Get_post_Api,ChangePass_Api,Policies_Api,   SinupCustomer, EditProfile_Api, updatePassword, restEmailOtpScreen, LoginCustomer, otp_Verify, }  