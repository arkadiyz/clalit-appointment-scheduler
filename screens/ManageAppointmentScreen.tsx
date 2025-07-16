import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { cancelAppointment, selectSpecialty } from '../redux/slices/appSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../hooks/useTheme';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import { useTranslation } from '../hooks/useTranslation';
import AppHeader from '../components/AppHeader';
import InfoCard from '../components/InfoCard';

type ManageAppointmentNavigationProp = StackNavigationProp<RootStackParamList, 'ManageAppointment'>;

interface Props {
  navigation: ManageAppointmentNavigationProp;
}

const ManageAppointmentScreen: React.FC<Props> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { currentAppointment } = useSelector((state: RootState) => state.app);
  const { theme } = useTheme();
  const { alertConfig, isVisible, showAlert, hideAlert } = useCustomAlert();
  const { t, isRTL } = useTranslation();
  const styles = createStyles(theme, isRTL);

  console.log('--------------------------- ManageAppointmentScreen ---------------------------');

  const handleUpdateAppointment = () => {
    if (!currentAppointment) return;

    dispatch(selectSpecialty(currentAppointment.specialty));
    navigation.navigate('DoctorCalendar', {
      specialty: currentAppointment.specialty,
    });
  };

  const handleCancelAppointment = () => {
    showAlert({
      title: t.manage.cancelConfirmTitle,
      message: t.manage.cancelConfirmMessage,
      buttons: [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.common.confirm,
          style: 'destructive',
          onPress: () => {
            dispatch(cancelAppointment());
            showAlert({
              title: t.manage.appointmentCanceledTitle,
              message: t.manage.appointmentCanceledMessage,
              buttons: [
                {
                  text: t.common.confirm,
                  onPress: () => navigation.navigate('Main'),
                },
              ],
            });
          },
        },
      ],
    });
  };

  if (!currentAppointment) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader title={t.manage.manageAppointment} onBackPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <View style={styles.noAppointmentContainer}>
            <Text style={styles.noAppointmentText}>{t.manage.noAppointmentToManage}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const appointmentItems = [
    { label: t.appointment.specialty, value: currentAppointment.specialty },
    { label: t.appointment.doctorName, value: currentAppointment.doctorName },
    { label: t.appointment.date, value: currentAppointment.date },
    { label: t.appointment.time, value: currentAppointment.time },
    {
      label: t.appointment.status,
      value: t.appointment.active,
      valueStyle: styles.activeStatus,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={t.manage.manageAppointment} onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>{t.manage.currentAppointmentDetails}</Text>

        <InfoCard items={appointmentItems} />

        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>{t.manage.availableActions}</Text>

          <TouchableOpacity style={[styles.actionButton, styles.updateButton]} onPress={handleUpdateAppointment}>
            <Text style={styles.actionButtonText}>{t.manage.updateAppointmentAction}</Text>
            <Text style={styles.actionButtonSubtext}>{t.manage.updateDescription}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={handleCancelAppointment}>
            <Text style={styles.actionButtonText}>{t.manage.cancelAppointmentAction}</Text>
            <Text style={styles.actionButtonSubtext}>{t.manage.cancelDescription}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{t.manage.note}</Text>
          <Text style={styles.infoText}>{t.manage.noteDescription}</Text>
        </View>
      </View>

      <CustomAlert
        visible={isVisible}
        title={alertConfig?.title || ''}
        message={alertConfig?.message}
        buttons={alertConfig?.buttons || []}
        onDismiss={hideAlert}
      />
    </SafeAreaView>
  );
};

const createStyles = (theme: any, _isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
      color: theme.colors.text,
    },
    activeStatus: {
      color: theme.colors.success,
      fontWeight: theme.typography.fontWeight.bold,
    },
    actionsContainer: {
      marginBottom: theme.spacing.lg,
    },
    actionsTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
    },
    actionButton: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.md,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    updateButton: {
      borderLeftColor: theme.colors.warning,
    },
    cancelButton: {
      borderLeftColor: theme.colors.error,
    },
    actionButtonText: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    actionButtonSubtext: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.textSecondary,
    },
    infoBox: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    infoTitle: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    infoText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      textAlign: 'right',
    },
    noAppointmentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noAppointmentText: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
export default ManageAppointmentScreen;
