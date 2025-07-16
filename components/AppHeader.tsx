import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';

interface AppHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, onBackPress, showBackButton = true }) => {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();

  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      {showBackButton && onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>
            {isRTL ? '← ' : '← '}
            {t.common.back}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    backButton: {
      marginRight: theme.spacing.md,
    },
    backButtonText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
      fontWeight: theme.typography.fontWeight.bold,
    },
    headerTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
    },
  });

export default AppHeader;
