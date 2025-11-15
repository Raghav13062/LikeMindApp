// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   Image,
// //   FlatList,
// //   TouchableOpacity,
// //   ActivityIndicator,
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import StatusBarComponent from '../../../compoent/StatusBarCompoent';
// // import CustomHeader from '../../../compoent/CustomHeader';
// // import SearchBar from '../../../compoent/SearchBar';
// // import imageIndex from '../../../assets/imageIndex';
// // import styles from './style'; // यह अपडेटेड स्टाइल फ़ाइल का उपयोग करेगा
// // import EmptyListComponent from '../../../compoent/EmptyListComponent';
// // import ScreenNameEnum from '../../../routes/screenName.enum';
// // import { useNavigation } from '@react-navigation/native';

// // const DiscoverGroupsScreen = () => {
// //   const navigation = useNavigation();
// //   const [loading, setLoading] = useState(false);
// //   const [users, setUsers] = useState([]); // all users from API
// //   const [filteredUsers, setFilteredUsers] = useState([]); // users after search
// //   const [searchText, setSearchText] = useState(''); // user input text

// //   // ✅ Fetch Users from API
// //   const fetchUsers = async () => {
// //     try {
// //       setLoading(true);
// //       const token = await AsyncStorage.getItem('token');
// //       if (!token) {
// //         console.warn('No token found!');
// //         setLoading(false);
// //         return;
// //       }

// //       const myHeaders = new Headers();
// //       myHeaders.append('Authorization', `Bearer ${token}`);

// //       const requestOptions = {
// //         method: 'GET',
// //         headers: myHeaders,
// //       };

// //       const response = await fetch('https://onetenbd.com/likemind/api/get-social-users', requestOptions);
// //       const result = await response.json();

// //       if (result?.success && Array.isArray(result.data)) {
// //         setUsers(result.data);
// //         setFilteredUsers(result.data); // initially show all users
// //       } else {
// //         console.warn('No valid data received.');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching users:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   // ✅ Search filter logic
// //   const handleSearch = (text) => {
// //     setSearchText(text);

// //     if (text.trim() === '') {
// //       setFilteredUsers(users);
// //       return;
// //     }

// //     const lowerText = text.toLowerCase();
// //     const filtered = users.filter((user) => {
// //       const fullName = `${user.first_name} ${user.last_name || ''}`.toLowerCase();
// //       const address = user.address ? user.address.toLowerCase() : '';
// //       return fullName.includes(lowerText) || address.includes(lowerText);
// //     });
// //     setFilteredUsers(filtered);
// //   };

// //   const renderUserCard = ({ item }) => (
// //     <TouchableOpacity
// //       style={styles.userCard}
// //       onPress={() => navigation.navigate(ScreenNameEnum.ChatDetails, { item: item })}
// //     >
// //       <Image
// //         source={{ uri: item.image || 'https://via.placeholder.com/150' }}
// //         style={styles.userImage}
// //       />
// //       <View style={{ flex: 1, marginLeft: 12 }}>
// //         <Text style={styles.userName}>
// //           {item.first_name} {item.last_name || ''}
// //         </Text>
        
// //       </View>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
// //       <StatusBarComponent />
// //       {/* 💡 यदि 'backNavsPuple' बैंगनी है, तो आपको नारंगी आइकन 'backNavsOrange' का उपयोग करना चाहिए */}
// //       <CustomHeader imageSource={imageIndex.backNavsPuple} label="Chat" /> 

// //       <View style={styles.container}>
// //         {/* ✅ Pass onChange handler to SearchBar */}
// //         <SearchBar
// //           placeholder="Search users..."
// //           value={searchText}
// //           onSearchChange={handleSearch}
// //         />

// //         <Text style={styles.sectionTitle}>All Chats</Text>

// //         {loading ? (
// //           // ActivityIndicator का रंग #F39C12 (नारंगी) में बदला गया
// //           <ActivityIndicator size="large" color="#F39C12" style={{ marginTop: 20 }} />
// //         ) : (
// //           <FlatList
// //           showsVerticalScrollIndicator={false}
// //             data={filteredUsers}
// //             keyExtractor={(item) => item.id.toString()}
// //             renderItem={renderUserCard}
// //             ListEmptyComponent={<EmptyListComponent message="No users found." />}
// //             contentContainerStyle={{ paddingBottom: 50 }}
// //           />
// //         )}
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // export default DiscoverGroupsScreen;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import StatusBarComponent from '../../../compoent/StatusBarCompoent';
// import CustomHeader from '../../../compoent/CustomHeader';
// import SearchBar from '../../../compoent/SearchBar';
// import imageIndex from '../../../assets/imageIndex';
// import styles from './style'; // यह अपडेटेड स्टाइल फ़ाइल का उपयोग करेगा
// import EmptyListComponent from '../../../compoent/EmptyListComponent';
// import ScreenNameEnum from '../../../routes/screenName.enum';
// import { useNavigation } from '@react-navigation/native';

// const DiscoverGroupsScreen = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]); // all users from API
//   const [filteredUsers, setFilteredUsers] = useState([]); // users after search
//   const [searchText, setSearchText] = useState(''); // user input text

//   // ✅ Fetch Users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         console.warn('No token found!');
//         setLoading(false);
//         return;
//       }

//       const myHeaders = new Headers();
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//       };

//       const response = await fetch('https://onetenbd.com/likemind/api/get-social-users', requestOptions);
//       const result = await response.json();

//       if (result?.success && Array.isArray(result.data)) {
//         // Mock data enhancement: Add a simple address if missing for better UI
//         const enhancedData = result.data.map(user => ({
//             ...user,
//             address: user.address || (user.id % 3 === 0 ? 'San Francisco, CA' : user.id % 2 === 0 ? 'New Delhi, India' : 'Online/Global')
//         }));
//         setUsers(enhancedData);
//         setFilteredUsers(enhancedData); // initially show all users
//       } else {
//         console.warn('No valid data received.');
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Search filter logic
//   const handleSearch = (text) => {
//     setSearchText(text);

//     if (text.trim() === '') {
//       setFilteredUsers(users);
//       return;
//     }

//     const lowerText = text.toLowerCase();
//     const filtered = users.filter((user) => {
//       const fullName = `${user.first_name} ${user.last_name || ''}`.toLowerCase();
//       const address = user.address ? user.address.toLowerCase() : '';
//       return fullName.includes(lowerText) || address.includes(lowerText);
//     });
//     setFilteredUsers(filtered);
//   };

//   const renderUserCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.userCard}
//       onPress={() => navigation.navigate(ScreenNameEnum.ChatDetails, { item: item })}
//     >
//       <Image
//         // यदि image URI उपलब्ध नहीं है, तो एक डिफ़ॉल्ट प्लेसहोल्डर का उपयोग करें
//         source={item.image ? { uri: item.image } : imageIndex.defaultUserPlaceholder} 
//         style={styles.userImage}
//       />
//       <View style={styles.userInfoContainer}> 
//         <Text style={styles.userName} numberOfLines={1}>
//           {item.first_name} {item.last_name || ''}
//         </Text>
//         {/* ✅ यूज़र एड्रेस/लोकेशन */}
//         {item.address && (
//           <View style={styles.locationContainer}>
//             {/* 💡 सुनिश्चित करें कि आपके पास एक 'location' आइकन 'imageIndex' में है */}
//             <Image 
//               source={imageIndex.locationIcon} // अपने location आइकन का सही नाम यहाँ बदलें
//               style={styles.locationIcon} 
//             />
//             <Text style={styles.userAddress} numberOfLines={1}>
//               {item.address}
//             </Text>
//           </View>
//         )}
//       </View>
//       {/* ✅ चैट ऐरो आइकन */}
//       <Image 
//         source={imageIndex.arrowRight} // अपने right-arrow आइकन का सही नाम यहाँ बदलें
//         style={styles.chatArrow}
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//       <StatusBarComponent />
      
//       {/* 💡 Header: थीम के अनुरूप, 'Chat' को 'Discover' या 'Community' में बदलें */}
//       <CustomHeader 
//         // 💡 यहाँ आपको एक 'नारंगी' back आइकन (जैसे imageIndex.backNavsOrange) का उपयोग करना चाहिए
//         imageSource={imageIndex.backNavsOrange} 
//         label="Discover Users" // शीर्षक को 'Chat' से बदलकर 'Discover Users' करें
//       /> 

//       <View style={styles.container}>
//         {/* ✅ SearchBar */}
//         <SearchBar
//           placeholder="Search by name or location..."
//           value={searchText}
//           onSearchChange={handleSearch}
//         />

//         <Text style={styles.sectionTitle}>Community</Text>

//         {loading ? (
//           // ActivityIndicator का रंग #F39C12 (नारंगी) में बदला गया
//           <ActivityIndicator size="large" color="#F39C12" style={{ marginTop: 20 }} />
//         ) : (
//           <FlatList
//           showsVerticalScrollIndicator={false}
//             data={filteredUsers}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={renderUserCard}
//             ListEmptyComponent={<EmptyListComponent message={`No users found matching "${searchText}".`} />}
//             contentContainerStyle={styles.flatListContent}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DiscoverGroupsScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import SearchBar from '../../../compoent/SearchBar';
import imageIndex from '../../../assets/imageIndex';
import styles from './style'; // यह अपडेटेड स्टाइल फ़ाइल का उपयोग करेगा
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

// 💡 WhatsApp Communities जैसी UI के लिए डमी डेटा 
// हम इसे API डेटा से नहीं बल्कि API डेटा पर आधारित एक ग्रुप लिस्ट मान रहे हैं।
const MOCK_COMMUNITIES_DATA = [
  { id: 101, name: 'Tech Innovators Hub', members: 1250, description: 'Discussions on AI and latest gadgets.', image: 'https://via.placeholder.com/150/F39C12/FFFFFF?text=T' },
];

const DiscoverGroupsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState(MOCK_COMMUNITIES_DATA); 
  const [filteredGroups, setFilteredGroups] = useState(MOCK_COMMUNITIES_DATA); 
  const [searchText, setSearchText] = useState(''); 
  
  // 💡 Note: यहाँ API कॉल को कमेंट किया गया है क्योंकि यह 'users' लाता है, 'groups' नहीं।
  // यदि आपके पास ग्रुप्स का API है, तो आप fetchUsers को fetchGroups से बदल सकते हैं।

  /* useEffect(() => {
    // fetchGroups(); // यदि ग्रुप्स के लिए API हो तो इसे कॉल करें
  }, []);
  */

  // ✅ Search filter logic (ग्रुप्स के लिए अपडेटेड)
  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === '') {
      setFilteredGroups(groups);
      return;
    }

    const lowerText = text.toLowerCase();
    const filtered = groups.filter((group) => {
      const name = group.name.toLowerCase();
      const desc = group.description ? group.description.toLowerCase() : '';
      return name.includes(lowerText) || desc.includes(lowerText);
    });
    setFilteredGroups(filtered);
  };

  const renderGroupCard = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard} // 'userCard' स्टाइल अब 'groupCard' की तरह काम करेगी
      onPress={() => 
         navigation.navigate(ScreenNameEnum.ChatDetails, { group: item })} 
    >
       <Image
              source={{ uri:  'https://shawanoleader.com/wp-content/uploads/2024/11/Fotolia_66660956_Subscription_Monthly_M.jpg' }}
        // source={{ uri: item.image || 'https://shawanoleader.com/wp-content/uploads/2024/11/Fotolia_66660956_Subscription_Monthly_M.jpg' }}
        style={styles.userImage} 
      />
      <View style={styles.userInfoContainer}> 
        <Text style={styles.userName} numberOfLines={1}>
          {item.name}
        </Text>
        {/* ✅ मेंबर काउंट या डिस्क्रिप्शन */}
        <View style={styles.locationContainer}>
          <Image 
            // 💡 यह एक 'people' या 'member' आइकन होना चाहिए
            source={{uri:"https://www.kindpng.com/picc/m/719-7191738_round-png-image-man-transparent-png.png"}} 
            style={styles.locationIcon} 
          />
          <Text style={styles.userAddress} numberOfLines={1}>
            {item.members.toLocaleString()} Members
          </Text>
        </View>
      </View>
      {/* ✅ 'Join' बटन या ऐरो (WhatsApp Communities में आमतौर पर Join/View का एक्शन होता है) */}
      <Image 
        source={imageIndex.messageaActive} 
        style={styles.chatArrow}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
     

      <View style={styles.container}>
        {/* ✅ SearchBar */}
        <SearchBar
          placeholder="Search communities..."
          value={searchText}
          onSearchChange={handleSearch}
        />

        {/* 💡 Section Title 1: WhatsApp की तरह ही */}
        <Text style={styles.sectionTitle}>Communities to Discover</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#F39C12" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
          showsVerticalScrollIndicator={false}
            data={filteredGroups}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGroupCard}
            ListEmptyComponent={<EmptyListComponent message={`No communities found matching "${searchText}".`} />}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiscoverGroupsScreen;