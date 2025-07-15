import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { CustomAlertButton, CustomAlertProps } from '../types';

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, buttons, onDismiss }) => {
  const { theme } = useTheme();

  /**
   *
   * @param button
   */
  const handleButtonPress = (button: CustomAlertButton) => {
    if (button.onPress) {
      button.onPress();
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  /**
   *
   * @param buttonStyle
   * @returns style object for the button
   */
  const getButtonStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'destructive':
        return { color: theme.colors.error };
      case 'cancel':
        return {
          color: theme.colors.textSecondary,
          fontWeight: theme.typography.fontWeight.medium,
        };
      default:
        return {
          color: theme.colors.primary,
          fontWeight: theme.typography.fontWeight.semiBold,
        };
    }
  };

  const styles = createStyles(theme);

  return (
    <Modal visible={visible} transparent animationType='fade' onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>

          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, index < buttons.length - 1 && styles.buttonBorder]}
                onPress={() => handleButtonPress(button)}
              >
                <Text style={[styles.buttonText, getButtonStyle(button.style)]}>{button.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    alertContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.large,
      minWidth: Dimensions.get('window').width * 0.7,
      maxWidth: Dimensions.get('window').width * 0.9,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    content: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    message: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    buttonContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonBorder: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.border,
    },
    buttonText: {
      fontSize: theme.typography.fontSize.md,
      textAlign: 'center',
    },
  });

export default CustomAlert;
