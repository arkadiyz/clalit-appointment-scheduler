import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appointment } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../hooks/useTheme';
import AppointmentCard from './AppointmentCard';

interface Props {
  appointments: Appointment[];
  currentAppointment: Appointment | null;
  onBookNew: () => void;
  onManage: () => void;
  onCancel: (id: string) => void;
}

const AppointmentsList: React.FC<Props> = (props) => {
  const { appointments, currentAppointment, onBookNew, onManage, onCancel } = props;

  const { t } = useTranslation();
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.appointmentsSection}>
      {/* התור הראשי (הקרוב ביותר) */}
      {currentAppointment && <AppointmentCard appointment={currentAppointment} isMain={true} onUpdate={onManage} onCancel={onCancel} />}

      {/* תורים נוספים */}
      {appointments.length > 1 && (
        <View style={styles.additionalAppointments}>
          <Text style={styles.additionalTitle}>
            {t.main.additionalAppointments} ({appointments.length - 1})
          </Text>
          {appointments
            .filter((apt) => apt.id !== currentAppointment?.id)
            .map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} isMain={false} onUpdate={onManage} onCancel={onCancel} />
            ))}
        </View>
      )}

      {/* כפתור תור חדש */}
      <TouchableOpacity style={styles.addAppointmentButton} onPress={onBookNew}>
        <Text style={styles.addAppointmentButtonText}>+ {t.main.bookNewAppointment}</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    appointmentsSection: {
      marginBottom: theme.spacing.lg,
    },
    additionalAppointments: {
      marginTop: theme.spacing.md,
    },
    additionalTitle: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      marginBottom: theme.spacing.sm,
      color: theme.colors.text,
    },
    addAppointmentButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.md,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    addAppointmentButtonText: {
      color: 'white',
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

export default AppointmentsList;
