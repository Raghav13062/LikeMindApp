  import React from 'react';
  import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions,   } from 'react-native';
  import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
  import CustomHeader from '../../../../compoent/CustomHeader';
  import imageIndex from '../../../../assets/imageIndex';
  import styles from './styles';
  import { useRoute } from '@react-navigation/native';
  import { SafeAreaView } from 'react-native-safe-area-context';
    
  const { width } = Dimensions.get('window');

  const FindAParterDetils = ({ navigation }:any) => {
    const router:any = useRoute() 
    const {item}= router?.params || ""
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
          
          <StatusBarComponent/>
          <CustomHeader
                  
                  
                  imageSource={imageIndex.backNavsPuple} label="Profile" />
      <View style={styles.container}>
      
  
        <Image 
          source={{ uri: item.image }} 
          style={styles.profileImage} 
        />

        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.roleText}>{item.exp_level}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          {[1,2,3,4,5].map((_, index) => (
          <Image  style={{
            height:22,
            width:22 
          }} source={imageIndex.star}/>
          ))}
          <Text style={styles.ratingText}>0 (0 views)</Text>
        </View>

        {/* Bio */}
        <Text style={styles.bioText}>
          Passionate about travel and tech. Looking for meaningful connections.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.circleButton}>
          <Image source={imageIndex.dislike1} style={{
                                height:120,
                                width:120
                          }}/>   
          </TouchableOpacity>

          <TouchableOpacity  >
          <Image source={imageIndex.likePurple} style={{
                                height:120,
                                width:120
                          }}/>   
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleButton}>
          <Image source={imageIndex.likes} style={{
                        height:120,
                        width:120
                          }}/>   
          </TouchableOpacity>
        </View>
  </View>
      </SafeAreaView>
    );
  };



  export default FindAParterDetils;
  