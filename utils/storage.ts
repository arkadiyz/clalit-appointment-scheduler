import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Appointment } from '../types';

const STORAGE_KEYS = {
  USER: '@medical_app_user',
  APPOINTMENT: '@medical_app_appointment',
  AUTH_STATE: '@medical_app_auth_state',
};

// פונקציות שמירה ושליפת נתוני משתמש
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

// פונקציות שמירה ושליפת נתוני תור
export const saveAppointment = async (appointment: Appointment): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.APPOINTMENT, JSON.stringify(appointment));
  } catch (error) {
    console.error('Error saving appointment data:', error);
  }
};

export const getAppointment = async (): Promise<Appointment | null> => {
  try {
    const appointmentData = await AsyncStorage.getItem(STORAGE_KEYS.APPOINTMENT);
    return appointmentData ? JSON.parse(appointmentData) : null;
  } catch (error) {
    console.error('Error getting appointment data:', error);
    return null;
  }
};

export const removeAppointment = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.APPOINTMENT);
  } catch (error) {
    console.error('Error removing appointment data:', error);
  }
};

// פונקציות שמירה ושליפת מצב התחברות
export const saveAuthState = async (isAuthenticated: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_STATE, JSON.stringify(isAuthenticated));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

export const getAuthState = async (): Promise<boolean> => {
  try {
    const authState = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_STATE);
    return authState ? JSON.parse(authState) : false;
  } catch (error) {
    console.error('Error getting auth state:', error);
    return false;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.APPOINTMENT, STORAGE_KEYS.AUTH_STATE]);
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};
