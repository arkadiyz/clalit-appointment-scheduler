import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../hooks/useTheme';

interface Props {
  onMenuPress: () => void;
}

const MainHeader: React.FC<Props> = ({ onMenuPress }) => {
  const { t, isRTL } = useTranslation();
    const { theme } = useTheme();
      const styles = createStyles(theme, isRTL);

    return (
      <View style={styles.header}>
        {isRTL ? (
          <>
            <View style={styles.headerSpacer} />
            <Text style={styles.title}>{t.main.systemTitle}</Text>
            <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
              <Text style={styles.menuButtonIcon}>☰</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
              <Text style={styles.menuButtonIcon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{t.main.systemTitle}</Text>
            <View style={styles.headerSpacer} />
          </>
        )}
      </View>
    );
};

const createStyles = (theme: any, _isRTL: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
      color: theme.colors.text,
    },
    headerSpacer: {
      width: 40,
    },
    menuButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 40,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuButtonIcon: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
    },
  });

export default MainHeader;
