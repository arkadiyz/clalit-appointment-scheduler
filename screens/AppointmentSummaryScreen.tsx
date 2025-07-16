import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';
import InfoCard from '../components/InfoCard';

type AppointmentSummaryNavigationProp = StackNavigationProp<RootStackParamList, 'AppointmentSummary'>;
type AppointmentSummaryRouteProp = RouteProp<RootStackParamList, 'AppointmentSummary'>;

interface Props {
  navigation: AppointmentSummaryNavigationProp;
  route: AppointmentSummaryRouteProp;
}

const AppointmentSummaryScreen: React.FC<Props> = ({ navigation, route }) => {
  const { appointment } = route.params;
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  console.log('--------------------------- AppointmentSummaryScreen ---------------------------');

  const handleBackToMain = () => {
    navigation.navigate('Main');
  };

  const appointmentItems = [
    { label: t.appointment.patientName, value: appointment.patientName },
    { label: t.appointment.specialty, value: appointment.specialty },
    { label: t.appointment.doctorName, value: appointment.doctorName },
    { label: t.appointment.date, value: appointment.date },
    { label: t.appointment.time, value: appointment.time },
  ];

  const styles = createStyles(theme, isRTL);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>{t.appointment.appointmentBooked}</Text>
        <Text style={styles.subtitle}>{t.appointment.appointmentDetails}</Text>

        <InfoCard items={appointmentItems} />

        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>{t.appointment.importantNotes}</Text>
          <Text style={styles.noticeText}>{t.appointment.arriveEarly}</Text>
          <Text style={styles.noticeText}>{t.appointment.bringDocuments}</Text>
          <Text style={styles.noticeText}>{t.appointment.canModify}</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleBackToMain}>
          <Text style={styles.confirmButtonText}>{t.appointment.confirmAndReturn}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
      justifyContent: 'center',
    },
    successIcon: {
      alignSelf: 'center',
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.success,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    checkmark: {
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.surface,
      fontWeight: theme.typography.fontWeight.bold,
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
      color: theme.colors.success,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.lg,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
      color: theme.colors.text,
      fontWeight: theme.typography.fontWeight.medium,
    },
    noticeBox: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.xl,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    noticeTitle: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    noticeText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
      textAlign: isRTL ? 'right' : 'left',
    },
    confirmButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    confirmButtonText: {
      color: theme.colors.surface, 
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

export default AppointmentSummaryScreen;
