import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../hooks/useTheme';
import { Appointment } from '../types/index';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  appointment: Appointment;
  isMain?: boolean;
  onUpdate: (appointment: Appointment) => void;
  onCancel: (id: string) => void;
}

const AppointmentCard: React.FC<Props> = (props) => {
  const { appointment, isMain = false, onUpdate, onCancel } = props;

  const { t, isRTL } = useTranslation();
  const { theme } = useTheme();

  const styles = createStyles(theme, isRTL);
  return (
    <View style={[styles.appointmentCard, isMain && styles.mainAppointmentCard]}>
      {isMain && <Text style={styles.cardTitle}>{t.main.upcomingAppointment}</Text>}

      <View style={styles.appointmentDetails}>
        <Text style={styles.detailText}>
          {t.appointment.specialty}: {appointment.specialty}
        </Text>
        <Text style={styles.detailText}>
          {t.appointment.doctorName}: {appointment.doctorName}
        </Text>
        <Text style={styles.detailText}>
          {t.appointment.date}: {appointment.date}
        </Text>
        <Text style={styles.detailText}>
          {t.appointment.time}: {appointment.time}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.updateButton]} onPress={() => onUpdate(appointment)}>
          <Text style={styles.buttonText}>{t.main.manageAppointment}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => onCancel(appointment.id)}>
          <Text style={styles.buttonText}>{t.main.cancelAppointment}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: any, _isRTL: boolean) =>
  StyleSheet.create({
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
      direction: _isRTL ? 'rtl' : 'ltr',
    },
    mainAppointmentCard: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
    },
    appointmentDetails: {
      marginBottom: theme.spacing.lg,
    },
    detailText: {
      fontSize: theme.typography.fontSize.md,
      marginBottom: theme.spacing.xs,
      direction: _isRTL ? 'rtl' : 'ltr',
      color: theme.colors.text,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: theme.spacing.sm,
    },
    actionButton: {
      flex: 1,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
    },
    updateButton: {
      backgroundColor: theme.colors.warning,
    },
    cancelButton: {
      backgroundColor: theme.colors.error,
    },
    buttonText: {
      color: theme.colors.surface,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: theme.typography.fontSize.md,
    },
  });

export default AppointmentCard;
