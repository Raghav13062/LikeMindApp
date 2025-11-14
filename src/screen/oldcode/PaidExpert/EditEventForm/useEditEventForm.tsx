import { useEffect, useState,   } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
 import ImagePicker from "react-native-image-crop-picker";
  
import { LayoutAnimation } from 'react-native';
import {   GeteventCategories, updateEvent } from '../../../Api/apiPaidExperti';
  const useEditEventForm = () => {
  const navigation:any = useNavigation();
  const [title, setTitle] = useState('');
  const [coachName, setCoachName] = useState('');
  const [about, setAbout] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryOptions, setcategoryOptions] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const route:any = useRoute() 
  const {item} = route?.params || ""
 useEffect(()=>{
  fetchEventS()
  setTitle(item?.title)
  setCoachName(item?.name) 
  setAbout(item?.about) 
  setPrice(item?.price)
  
 },[])

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
    }).catch((err) => console.log(err));
  };
  const fetchEventS = async () => {
    try {
       const response = await GeteventCategories(setLoading);
      if (response?.data) {
         setcategoryOptions(response.data)
      } else {
       }
    } catch (error) {
      console.error("Community fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowDropdown(!showDropdown);
  };

  const submitForm = () => {
   

    handleSubmit()
   }; 


  
  const handleSubmit = async () => {
     
    try {
      const params = {
        title,
        coachName,
        about,
        price,
        category,
        item,
    
      };
  console.log("params",params)
      const response = await updateEvent(params,image, setLoading);
      // if (response) {
      //   console.log("response",response)
      //   }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
 


  return {
    navigation,
    coachName, setCoachName,
    title, setTitle ,
    about, setAbout,
    price, setPrice ,
    category, setCategory ,
    showDropdown, setShowDropdown ,
    image, setImage ,
    toggleDropdown ,
    pickImage ,
    submitForm ,
    loading ,
    categoryOptions ,
    item
   };
};

export default useEditEventForm;
