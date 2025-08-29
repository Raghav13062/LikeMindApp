import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
   Image,
  Platform,
} from 'react-native';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import { getquestions } from '../../../../Api/apiRequest';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from '../../../../utils/Loader';

const FAQItem = ({ question, answer, expanded, onToggle }: any) => (
  <View style={styles.promptContainer}>
    <TouchableOpacity onPress={onToggle} style={styles.dropdown}>
      <Text style={styles.promptText}>{question}</Text>
      <Image
        source={expanded ? imageIndex.dounopen : imageIndex.down}
        style={{ height: 28, width: 28 }}
      />
    </TouchableOpacity>
    {expanded && (
      <View style={styles.answerBox}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
    )}
  </View>
);

const FAQ = () => {
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Open first by default
  const navigation: any = useNavigation();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getquestions(setLoading);
      if (response?.data?.length > 0) {
        setQuestions(response.data); // Set full list of questions
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching questions", error);
      setQuestions([]);
    }
  };

  const toggleItem = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backNavsPuple} label="Profile" />
      {isLoading ? <LoadingModal /> : null}

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.headerTitle}>100% completed</Text>

        <Text style={styles.description}>
          User selects at least 2 prompts, then answers them in short text inputs (150–200 characters)
        </Text>

        {questions.map((item, index) => (
          <FAQItem
            key={item.id}
            question={item.question}
            answer={"Short text input (150–200 characters)"} // Placeholder
            expanded={expandedIndex === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </ScrollView>

      <CustomButton
        title={'Next'}
        onPress={() => {
          navigation.navigate(ScreenNameEnum.ProfilePhots);
        }}
        buttonStyle={{ marginHorizontal: 18, backgroundColor: "#F39C12" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 4,
    fontSize: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 12,
    marginTop: 10,
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8E44AD',
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  promptContainer: {
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAEEFF',
    padding: 14,
    borderRadius: 10,
  },
  promptText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  answerBox: {
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 6,
    borderColor: '#eee',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  answerText: {
    fontSize: 14,
    color: '#444',
  },
});

export default FAQ;
