import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  onBookNew: () => void;
}

const NoAppointmentCard: React.FC<Props> = (props) => {
  const { onBookNew } = props;
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.noAppointmentCard}>
      <Text style={styles.cardTitle}>{t.main.noActiveAppointment}</Text>
      <Text style={styles.description}>{t.main.noAppointmentDescription}</Text>

      <TouchableOpacity style={styles.bookButton} onPress={onBookNew}>
        <Text style={styles.bookButtonText}>{t.main.bookNewAppointment}</Text>
      </TouchableOpacity>
    </View>
  );
};
const createStyles = (theme: any) =>
  StyleSheet.create({
    noAppointmentCard: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.large,
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
    },
    description: {
      fontSize: theme.typography.fontSize.md,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
      color: theme.colors.textSecondary,
    },
    bookButton: {
      backgroundColor: theme.colors.success,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bookButtonText: {
      color: theme.colors.surface, // החלפת 'white' בצבע מהנושא
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

export default NoAppointmentCard;
