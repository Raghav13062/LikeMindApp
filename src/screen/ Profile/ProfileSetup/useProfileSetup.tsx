import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
 import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

const useProfileSetup = () => {
  const navigation:any = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownVisible2, setisDropdownVisible2] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedCashValue, setSelectedCashValue] = useState('');
  const [selected, setSelected] = useState("");
  const taskOptions = ['Scheduled Tasks', 'Flexible Tasks'];
  const [locationModal, setLocationModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [desp, setdesp] = useState('');
  const [fullName, setfullName] = useState('');
  const [VolunteersNumber, setVolunteersNumber] = useState('');
  const [TypesTasksData, setTypesTasksData] = useState([]);
  const [errors, setErrors] = useState<any>({});
   const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setisLoading] = useState(false);
   const [StartshowPicker, setStartshowPicker] = useState(false);
  const [lateLocation, setlateLocation] = useState("");
  const [StartTime, setStartTime] = useState(new Date());
  const [time, setTime] = useState(new Date());
 
  const formattedStartTime = (date:any) => {
    return date instanceof Date && !isNaN(date.getTime())
      ? date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      : '';
  };
  
    const formattedTime =
    time instanceof Date && !isNaN(time.getTime())
      ? time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      : '';

 
    const dropdownOptions = ['Per Hour', 'Per Day',  ];
  const dropdownCashReward = ['Per Hour', 'Per Day', "For the Job" ];

 
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const CashDropdown = (option:any) => {
    setisDropdownVisible2(!isDropdownVisible2);
    setSelectedCashValue(option)
  };
  // const fetchCountries = async () => {
  //   try {
  //     const data = await Gettypetasks(setisLoading);
  //     if (data?.status === "1") {
  //        setTypesTasksData(data?.data)
  //      }
       
  //   } catch (error) {
  //     console.error("Error in fetchCountries:", error);
  //   }
  // };


  const handleOptionSelect = (option: any) => {
    setSelectedValue(option);
    setDropdownVisible(false);
  };

  const handleModalSubmit = () => {
    setLocationModal(false);
  };

  const handleLocationSelected = (location: { latitude: number, longitude: number, address: string }) => {
      setSelectedAddress(location.address); // Only storing the address
    handleModalSubmit();
  };

   
  const onChange = (event:any, selectedTime:any) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  const onStartChange = (event:any, selectedTime:any) => {
    setStartshowPicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };
  const validateForm = () => {
    const formErrors: Record<string, string> = {};
  
    if (!fullName.trim()) {
      formErrors.fullName = 'Task name is required.';
    }
  
    if (!selected) {
      formErrors.selected = 'Please select a task type.';
    }
  
    if (!selectedCashValue.trim()) {
      formErrors.selectedCashValue = 'Please select a cash reward type.';
    }
  
    if (!selectedValue) {
      formErrors.selectedValue = 'Please select the type of task.';
    }

    if (!VolunteersNumber.trim()) {
      formErrors.VolunteersNumber = 'Number of volunteers is required.';
    } else if (isNaN(Number(VolunteersNumber))) {
      formErrors.VolunteersNumber = 'Must be a valid number.';
    } else if (Number(VolunteersNumber) <= 0) {
      formErrors.VolunteersNumber = 'Number must be greater than zero.';
    }
  
    if (!selectedAddress.trim()) {
      formErrors.selectedAddress = 'Please select a location.';
    }
  
    // if (!desp.trim()) {
    //   formErrors.desp = 'Description is required.';
    // }
  
    setErrors(formErrors);
  
    return Object.keys(formErrors).length === 0;
  };
  const formatTimeForAPI = (date:any) => {
    return date.toISOString().substr(11, 5); // "HH:mm"
  };
  

  const handleSubmit = async () => {
    const startFormatted = formatTimeForAPI(StartTime);
  const endFormatted = formatTimeForAPI(time);
    //  if (validateForm()) {
    //   try {
    //     const params = {
    //       userId:isLogin?.id,
    //       name: fullName,
    //       description: desp,
    //       taskType: selectedValue?.id,
    //       rewardType: selectedCashValue,
    //       scheduleType: selected,
    //       numberOfVolunteers: VolunteersNumber,
    //       location: selectedAddress,
    //       latitude: lateLocation?.latitude,
    //       longitude: lateLocation?.longitude,
    //       startTime: startFormatted,
    //       endTime: endFormatted,
    //       navigation:navigation
    //      };
    //      const response = await AddTaskApi(params, setisLoading);
  
        
  
    //   } catch (error) {
    //     console.error("Error in handleSubmit:", error);
    //   }
    // } else {
    //   console.log("Validation failed");
    // }
  };
  
  return {
    navigation,
    isDropdownVisible, setDropdownVisible,
    selectedValue, setSelectedValue,
    dropdownOptions,
    handleLocationSelected,
    selected, setSelected,
    taskOptions,
    locationModal, setLocationModal,
    selectedAddress, setSelectedAddress,
    errors, setErrors,
    toggleDropdown,
    handleOptionSelect,
    desp, setdesp,
    fullName, setfullName,
    VolunteersNumber, setVolunteersNumber,
    showPicker, setShowPicker,
    onChange,
    formattedTime,
    time, setTime,
    StartTime, setStartTime,
    StartshowPicker, setStartshowPicker,
    onStartChange,
    formattedStartTime,
    validateForm ,
    handleSubmit ,
    dropdownCashReward ,
    CashDropdown ,
    isDropdownVisible2, setisDropdownVisible2 ,
    selectedCashValue, setSelectedCashValue ,
    isLoading ,
    TypesTasksData,
   };
};

export default useProfileSetup;
