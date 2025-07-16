import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';

interface InfoItem {
  label: string;
  value: string;
  valueStyle?: any;
}

interface InfoCardProps {
  items: InfoItem[];
}

const InfoCard: React.FC<InfoCardProps> = ({ items }) => {
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  const styles = createStyles(theme, isRTL);

  console.log('InfoCardqqqq - items received:', items);

  return (
    <View style={styles.card}>
      {items.map((item, index) => {
        console.log(`InfoCard - item ${index}:`, item);
        return (
          <View key={index} style={styles.detailRow}>
            <Text style={styles.label}>{item.label}:</Text>
            <Text style={[styles.value, item.valueStyle]}>{item.value || 'לא זמין'}</Text>
          </View>
        );
      })}
    </View>
  );
};

const createStyles = (theme: any, _isRTL: boolean) =>
  StyleSheet.create({
    card: {
      direction: _isRTL ? 'rtl' : 'ltr',
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.large,
      marginBottom: theme.spacing.xl,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    detailRow: {
      flexDirection: 'row',
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
    },
    value: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      fontWeight: theme.typography.fontWeight.medium,
    },
  });

export default InfoCard;
