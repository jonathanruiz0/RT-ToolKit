
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// screens
import CalculatorScreen from './screens/CalculatorScreen';
import InterpretScreen from './screens/InterpretScreen';
import HistoryScreen from './screens/HistoryScreen';

// theme
import { colors } from './theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#999',
            tabBarStyle: { backgroundColor: colors.cardSelected },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Calculator': iconName = 'calculator-variant'; break;
                case 'Interpret': iconName = 'notes-medical'; break;
                case 'History':   iconName = 'history'; break;
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }
          })}
        >
          <Tab.Screen name="Calculator" component={CalculatorScreen} />
          <Tab.Screen name="Interpret"  component={InterpretScreen}  />
          <Tab.Screen name="History"    component={HistoryScreen}    />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
