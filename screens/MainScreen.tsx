import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useMainScreen } from '../hooks/useMainScreen';
import { useTheme } from '../hooks/useTheme';
import MainHeader from '../components/MainHeader';
import AppointmentsList from '../components/AppointmentsList';
import NoAppointmentCard from '../components/NoAppointmentCard';
import SideMenu from '../components/SideMenu';
import CustomAlert from '../components/CustomAlert';

type MainScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: MainScreenNavigationProps;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const {
    appointments,
    currentAppointment,
    alertConfig,
    isVisible,
    isMenuVisible,
    slideAnim,
    hideAlert,
    getTransformValue,
    openMenu,
    closeMenu,
    handleBookNewAppointment,
    handleManageAppointment,
    handleCancelAppointment,
    handleLogout,
    handleToggleTheme,
    handleToggleLanguage,
  } = useMainScreen(navigation);

  const { theme } = useTheme();
  const styles = createStyles(theme);

  console.log('--------------------------- MainScreen ---------------------------');
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader onMenuPress={openMenu} />

      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView contentContainerStyle={styles.content}>
          {appointments.length > 0 ? (
            <AppointmentsList
              appointments={appointments}
              currentAppointment={currentAppointment}
              onBookNew={handleBookNewAppointment}
              onManage={handleManageAppointment}
              onCancel={handleCancelAppointment}
            />
          ) : (
            <NoAppointmentCard onBookNew={handleBookNewAppointment} />
          )}
        </ScrollView>

        <SideMenu
          isVisible={isMenuVisible}
          slideAnim={slideAnim}
          getTransformValue={getTransformValue}
          onClose={closeMenu}
          onBookNew={handleBookNewAppointment}
          onLogout={handleLogout}
          onToggleTheme={handleToggleTheme}
          onToggleLanguage={handleToggleLanguage}
        />

        <CustomAlert
          visible={isVisible}
          title={alertConfig?.title || ''}
          message={alertConfig?.message}
          buttons={alertConfig?.buttons || []}
          onDismiss={hideAlert}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
    },
  });

export default MainScreen;
