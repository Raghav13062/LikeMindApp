import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from ".";
import { errorToast, successToast } from "../utils/customToast";

const EventApicall = async (
    param: any,
    image:any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      if (image) {
        formData.append("image", {
          uri: image,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
     formData.append("category_id", "1");
  
  if(param?.category?.id){
    formData.append("category_id", param?.category?.id);
  }
  if(param?.title){
    formData.append("title", param?.title);
  }
  if(param?.coachName){
    formData.append("name", param?.coachName);
  }
 
  if(param?.about){
    formData.append("about", param?.about);
  }
  if(param?.price){
    formData.append("price", param?.price);
  }
      const response = await fetch(`${base_url}/create-event`, {
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



  const GeteventCategories = async (
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
      const response = await fetch(`${base_url}/get-event-categories`, requestOptions);
  
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



  const GetEventPaid = async (
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


  const updateEvent = async (
    param: any,
    image:any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      if (image) {
        formData.append("image", {
          uri: image,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
   
  if(param?.category?.id){
    formData.append("category_id", param?.category?.id);
  }
  if(param?.item?.id){
    formData.append("id", param?.item?.id);
  }
  if(param?.title){
    formData.append("title", param?.title);
  }
  if(param?.coachName){
    formData.append("name", param?.coachName);
  }
 
  if(param?.about){
    formData.append("about", param?.about);
  }
  if(param?.price){
    formData.append("price", param?.price);
  }
      const response = await fetch(`${base_url}/update-event`, {
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
  const DeleteEvent = async (
     setLoading: (loading: boolean) => void ,
     item:any
  ) => {
    setLoading(true);
  
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
  if(item){
    formData.append("id",item);
  }
 
      const response = await fetch(`${base_url}/delete-event`, {
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




  const getgroups = async (
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
      const response = await fetch(`${base_url}/get-groups`, requestOptions);
  
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
  export { DeleteEvent,getgroups,EventApicall,updateEvent,GetEventPaid,GeteventCategories }  