import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';

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

  const styles = createStyles(theme, isRTL);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>{t.appointment.appointmentBooked}</Text>
        <Text style={styles.subtitle}>{t.appointment.appointmentDetails}</Text>

        <View style={styles.appointmentCard}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>{t.appointment.patientName}:</Text>
            <Text style={styles.value}>{appointment.patientName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>{t.appointment.specialty}:</Text>
            <Text style={styles.value}>{appointment.specialty}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>{t.appointment.doctorName}:</Text>
            <Text style={styles.value}>{appointment.doctorName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>{t.appointment.date}:</Text>
            <Text style={styles.value}>{appointment.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>{t.appointment.time}:</Text>
            <Text style={styles.value}>{appointment.time}</Text>
          </View>
        </View>

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
      fontSize: 40,
      color: 'white',
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
    appointmentCard: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.large,
      marginBottom: theme.spacing.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    detailRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    label: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    value: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      fontWeight: theme.typography.fontWeight.medium,
      textAlign: isRTL ? 'left' : 'right',
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
      color: 'white',
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

export default AppointmentSummaryScreen;
