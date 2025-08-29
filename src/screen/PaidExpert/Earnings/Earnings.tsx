import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

const transactions = [
  {
    id: '1',
    title: 'Sports',
    type: 'Payment',
    amount: '- $ 15.99',
    date: 'Today, Mar 20',
    color: '#FFB74D',
  },
  {
    id: '2',
    title: 'Bank of America',
    type: 'Deposit',
    amount: '+ $ 2,045.00',
    date: 'Today, Mar 20',
    color: '#81C784',
  },
  {
    id: '3',
    title: 'To Brody Armando',
    type: 'Sent',
    amount: '- $ 986.00',
    date: 'Today, Mar 20',
    color: '#E57373',
  },
  {
    id: '4',
    title: 'Bitcoin',
    type: 'Deposit',
    amount: '+ $ 2,550.99',
    date: 'Yesterday, Dec 28',
    color: '#FFD54F',
  },
  {
    id: '5',
    title: 'Paypal',
    type: 'Freelance',
    amount: '+ $ 2,328.00',
    date: 'Yesterday, Dec 28',
    color: '#4FC3F7',
  },
];

const TransactionItem = ({ item }: any) => (
  <View style={styles.transactionItem}>
    {/* <View style={[styles.iconCircle, { backgroundColor: item.color }]} /> */}
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subText}>{item.type}</Text>
    </View>
    <Text style={[styles.amount, { color:"black" }]}>
    {/* <Text style={[styles.amount, { color: item.amount.includes('+') ? '#4CAF50' : '#F44336' }]}> */}
      {item.amount}
    </Text>
  </View>
);

const Earnings = () => {
  return (
    <SafeAreaView style={{
        flex:1 ,
        backgroundColor:"white"
    }}>
        <StatusBarComponent/>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Earnings */}
      <Text style={styles.heading}>Earnings</Text>
      <View style={styles.earningsBox}>
        <View style={styles.earningCard}>
          <Text style={styles.cardLabel}>Total Earnings</Text>
          <Text style={styles.cardAmount}>$2,500</Text>
        </View>
        <View style={styles.earningCard}>
          <Text style={styles.cardLabel}>Pending Payouts</Text>
          <Text style={styles.cardAmount}>$1,200</Text>
        </View>
      </View>

      {/* Transactions */}
      <Text style={styles.heading}>Transactions History</Text>
      {transactions.map((item, index) => (
        <View key={index}>
          {index === 0 || transactions[index - 1].date !== item.date ? (
            <Text style={styles.dateLabel}>{item.date}</Text>
          ) : null}
          <TransactionItem item={item} />
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color:"black"
  },
  earningsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,   // a bit softer
        shadowRadius: 8,       // slightly wider blur
      },
      android: {
        elevation: 6,          // bumps the depth
        shadowColor: '#000',   // helps on Android 12+
      },
    }),
  },
  earningCard: {
    width: '48%',
  },
  cardLabel: {
    fontSize: 14,
    color: '#8E44AD',
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color:"black"
  },
  dateLabel: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color:"black"
  },
  subText: {
    color: '#777',
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Earnings;