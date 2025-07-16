import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Animated, Dimensions } from 'react-native';
import { RootState, AppDispatch } from '../redux/store';
import { cancelAppointment, logoutUser, toggleTheme, setLanguage } from '../redux/slices/appSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Appointment } from '../types';
import { useCustomAlert } from '../hooks/useCustomAlert';
import { useTranslation } from './useTranslation';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const useMainScreen = (navigation: MainScreenNavigationProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, currentAppointment, appointments } = useSelector((state: RootState) => state.app);

  const { alertConfig, isVisible, showAlert, hideAlert } = useCustomAlert();
  const { t, currentLanguage, isRTL } = useTranslation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Animation setup
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const menuWidth = screenWidth * 0.8;

  // Animation functions
  const openMenu = () => {
    setIsMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsMenuVisible(false);
    });
  };

  const getTransformValue = () => {
    return slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: isRTL ? [menuWidth, 0] : [-menuWidth, 0],
    });
  };

  // Navigation handlers
  const handleBookNewAppointment = () => {
    setIsMenuVisible(false);
    navigation.navigate('BookingScreen');
  };

  const handleManageAppointment = (appointment: Appointment) => {
    setIsMenuVisible(false);
    navigation.navigate('ManageAppointment', { appointment });
  };

  const handleCancelAppointment = (appointmentId?: string) => {
    const targetAppointment = appointmentId ? appointments.find((apt) => apt.id === appointmentId) : currentAppointment;

    if (!targetAppointment) return;

    showAlert({
      title: t.manage.cancelConfirmTitle,
      message: t.manage.cancelConfirmMessage,
      buttons: [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.common.confirm,
          style: 'destructive',
          onPress: () => {
            dispatch(cancelAppointment(appointmentId));
            showAlert({
              title: t.main.appointmentCanceled,
              message: t.main.appointmentCanceled,
              buttons: [{ text: t.common.confirm }],
            });
          },
        },
      ],
    });
  };

  // Menu handlers
  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuVisible(false);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleLanguage = () => {
    const newLanguage = currentLanguage === 'he' ? 'en' : 'he';
    dispatch(setLanguage(newLanguage));
  };

  return {
    // State
    user,
    appointments,
    currentAppointment,
    alertConfig,
    isVisible,
    isMenuVisible,
    isRTL,
    currentLanguage,
    t,

    // Animation
    slideAnim,
    getTransformValue,

    // Functions
    hideAlert,
    openMenu,
    closeMenu,
    handleBookNewAppointment,
    handleManageAppointment,
    handleCancelAppointment,
    handleLogout,
    handleToggleTheme,
    handleToggleLanguage,
  };
};
