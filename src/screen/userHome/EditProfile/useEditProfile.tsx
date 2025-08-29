import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, PermissionsAndroid } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
 import {  request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EditProfile_Api, Get_post_Api } from '../../../Api/apiRequest';
import { loginSuccess } from '../../../redux/feature/authSlice';
 const useEditProfile = () => {
  const navigation:any = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownVisible2, setisDropdownVisible2] = useState(false);
  const [location, setlocation] = useState('');
   const [selected, setSelected] = useState("");
   const [locationModal, setLocationModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [desp, setdesp] = useState('');
  const [fullName, setfullName] = useState('');
  const [Age, setAge] = useState('');
   const [errors, setErrors] = useState<any>({});
   const [isLoading, setisLoading] = useState(false);
     const [modalVisible, setModalVisible] = useState(false);
     const [bio, setbio] = useState('');
  const [imagePrfile, setImagePrfile] = useState();
  const isLogin:any = useSelector <any>((state) => state?.auth?.userData);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch(); // ✅ initialize dispatch

  useEffect(()=>{
    requestCameraPermission()
     setfullName(isLogin?.user_data?.full_name)
    setAge(isLogin?.user_data?.age)
    setdesp(isLogin?.user_data?.about)
    setbio(isLogin?.user_data?.goles)
    setlocation(isLogin?.user_data?.address)
  },[])
  
  const pickImageFromGallery =  async() => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  })
    .then((image) => {
      setImagePrfile(image)
      setModalVisible(false);
    })
    .catch((error) => console.log(error));
};


const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      return (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // iOS permissions
    try {
      const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
      const photoStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

      return (
        cameraStatus === RESULTS.GRANTED && photoStatus === RESULTS.GRANTED
      );
    } catch (error) {
      console.warn("iOS Permission error:", error);
      return false;
    }
  }
};

const options = [
  { name: "Solo Travel" },
  { name: "Couple Travel" },
  { name: "Family Travel" },
    { name: "Weekend Getaway" },
  { name: "Honeymoon Travel" },
    { name: "Health & Wellness Travel" },
  { name: "Remote Work / Digital Nomad" }
];

const handleSelect = (item: any) => {
  setSelectedOption(item?.name);
};
const takePhotoFromCamera = async () => {
  try {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });
    setImagePrfile(image)
    setModalVisible(false);
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
   

 
  const handleOptionSelect = (option: any) => {
    setlocation(option);
    setDropdownVisible(false);
  };
 

  const GetFunction = async () => {
    try {
       const response = await Get_post_Api(setisLoading);
      if (response && response.data) {
        dispatch(loginSuccess({
          userData: response.data,
          token: response.data.token,
        }));
      } else {
        console.warn("No response or invalid response data.");
      }

    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setisLoading(false);
    }
  };

  
  const handleSubmit = async () => {
     
    try {
      const params = {
        name: fullName,
        images: imagePrfile?.path,
        age: Age,
        addresh:location,
        traveling:selectedOption,
        desp:desp,
        navigation: navigation,
        bio:bio
      };
      const response = await EditProfile_Api(params, setisLoading);
      if (response) {
        console.log("response",response)
        GetFunction()
       }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
 
  

     
  return {
    navigation,
    isDropdownVisible, setDropdownVisible,
    location, setlocation,
      selected, setSelected,
     locationModal, setLocationModal,
    selectedAddress, setSelectedAddress,
    errors, setErrors,
     handleOptionSelect,
    desp, setdesp,
    fullName, setfullName,
    Age, setAge,
    
      isDropdownVisible2, setisDropdownVisible2 ,
     isLoading ,
     modalVisible, setModalVisible ,
    imagePrfile ,
    takePhotoFromCamera ,
    pickImageFromGallery ,
    isLogin ,
    selectedOption,
    options ,
    handleSelect ,
    bio, setbio,
    handleSubmit
   };
};

export default useEditProfile;
