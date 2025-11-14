import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HTML from 'react-native-render-html';
import Loading from '../../utils/Loader';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomHeader from '../../compoent/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { Policies_Api } from '../../Api/apiRequest';
import { height } from '../../utils/Constant';

const About = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [policyData, setPolicyData] = useState<any>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      const response = await Policies_Api(setLoading);
      if (response?.data?.length > 0) {
        setPolicyData(response.data[0]); // Accessing first policy object
      } else {
        setPolicyData(null);
      }
    } catch (error) {
      setPolicyData(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      <StatusBarComponent />
      <CustomHeader
        mainView={{ marginTop: 20 }}
        imageSource={imageIndex.backorange}
        label="Terms and Condition"
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.illustrationWrapper}>
          <Image
            source={imageIndex.privacy}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {policyData?.privacy_policy_text && (
          <>
            <Text style={styles.sectionTitle}>Privacy Policy</Text>
            <HTML
              source={{ html: policyData.privacy_policy_text }}
              contentWidth={width}
              tagsStyles={styles.htmlStyles}
            />
          </>
        )}
        {!policyData?.privacy_policy_text && (
          <Text style={styles.bodyText}>No Privacy Policy available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 12,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  illustration: {
    width: '80%',
    height: height * 0.3,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
    marginBottom: 10,
    lineHeight: 24,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'justify',
  },
  htmlStyles: {
    p: {
      fontSize: 14,
      color: '#444',
      lineHeight: 24,
      textAlign: 'justify',
      marginTop: 6,
    },
    strong: {
      fontWeight: 'bold',
      color: '#000',
    },
    li: {
      fontSize: 14,
      color: '#444',
      marginBottom: 8,
      lineHeight: 22,
    },
    ul: {
      paddingLeft: 20,
      marginBottom: 10,
    },
    h1: {
      fontSize: 20,
      fontWeight: '600',
      color: '#000',
      marginBottom: 10,
    },
    h2: {
      fontSize: 18,
      fontWeight: '500',
      color: '#222',
      marginBottom: 8,
    },
    a: {
      color: '#007bff',
    },
  },
});

export default About;
