import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ReferenceScreen from './screens/ReferenceScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import InterpretScreen from './screens/InterpretScreen';
import HistoryScreen from './screens/HistoryScreen';
import PreceptorScreen from './screens/PreceptorScreen';
import ProceduresScreen from './screens/ProceduresScreen';
import EducationScreen from './screens/EducationScreen';

import { colors } from './theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ReferenceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ReferenceHome" component={ReferenceScreen} options={{ title:'Clinical Reference' }} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ title:'Calculator' }} />
      <Stack.Screen name="Interpret" component={InterpretScreen} options={{ title:'ABG Interpretation' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title:'History' }} />
    </Stack.Navigator>
  );
}

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
                case 'Reference':  iconName = 'book-open-variant'; break;
                case 'Preceptor':  iconName = 'account-tie'; break;
                case 'Procedures': iconName = 'clipboard-text'; break;
                case 'Education':  iconName = 'school'; break;
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }
          })}
        >
          <Tab.Screen name="Reference" component={ReferenceStack} />
          <Tab.Screen name="Preceptor" component={PreceptorScreen} />
          <Tab.Screen name="Procedures" component={ProceduresScreen} />
          <Tab.Screen name="Education" component={EducationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
