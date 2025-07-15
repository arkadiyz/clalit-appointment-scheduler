import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { RootStackParamList } from '../types';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import BookingScreen from '../screens/BookingScreen';
import DoctorCalendarScreen from '../screens/DoctorCalendarScreen';
import AppointmentSummaryScreen from '../screens/AppointmentSummaryScreen';
import ManageAppointmentScreen from '../screens/ManageAppointmentScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.app);

  console.log('AppNavigator - user:', user);
  console.log('AppNavigator - isAuthenticated:', user?.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user?.isAuthenticated ? (
          <>
            {console.log('AppNavigator - Loading authenticated screens')}
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='BookingScreen' component={BookingScreen} />
            <Stack.Screen name='ManageAppointment' component={ManageAppointmentScreen} />
            <Stack.Screen name='DoctorCalendar' component={DoctorCalendarScreen} />
            <Stack.Screen name='AppointmentSummary' component={AppointmentSummaryScreen} />
          </>
        ) : (
          <>
            {console.log('AppNavigator - Loading login screen')}
            <Stack.Screen name='Login' component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
