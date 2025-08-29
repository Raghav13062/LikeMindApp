import React, { useEffect, useState } from 'react';
import { Text, Image, Keyboard, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SharedUser from './SharedUser';
 
type TabScreen = {
  name: string;
  Component: React.ComponentType<any>;
  label?: string;
  logo: any;
  logo1: any;
};

const Tab = createBottomTabNavigator();

export default function SharedTabNavigator() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isKeyboardVisible ? 'none' : 'flex',
          paddingTop: 12,
          height: 70,
        },
      }}
    >
      {SharedUser.map((screen: TabScreen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <Image
                  source={focused ? screen.logo1 : screen.logo}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain',
                    // tintColor: focused ? '#A0D803' : '#999999',
                  }}
                />
                {screen.label && (
                  <Text
                    style={{
                      fontWeight: '700',
                      color: focused ? '#F39C12' : '#999999',
                      fontSize: 10,
                      marginTop: 4,
                      width: 55,
                      textAlign: 'center',
                    }}
                  >
                    {screen.label}
                  </Text>
                )}
              </>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
