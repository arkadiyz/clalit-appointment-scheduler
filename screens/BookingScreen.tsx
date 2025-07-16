import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { selectSpecialty } from '../redux/slices/appSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';
import { medicalSpecialties, getSpecialtyTranslation } from '../utils/mockData';
import AppHeader from '../components/AppHeader';

type BookingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookingScreen'>;

interface Props {
  navigation: BookingScreenNavigationProp;
}

const BookingScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const { t, isRTL } = useTranslation();
  console.log('--------------------------- BookingScreen ---------------------------');

  const handleSpecialtySelect = (specialty: string) => {
    dispatch(selectSpecialty(specialty));
    navigation.navigate('DoctorCalendar', { specialty });
  };

  const renderSpecialtyItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.specialtyCard} onPress={() => handleSpecialtySelect(item)}>
      <Text style={styles.specialtyText}>{getSpecialtyTranslation(item, t)}</Text>
      <Text style={styles.arrowText}>{isRTL ? '←' : '→'}</Text>
    </TouchableOpacity>
  );

  const styles = createStyles(theme, isRTL);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={t.booking.newAppointmentTitle} onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>{t.booking.selectSpecialty}</Text>
        <Text style={styles.subtitle}>{t.booking.selectSpecialtyDescription}</Text>

        <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
          {medicalSpecialties.map((item, index) => (
            <View key={index}>{renderSpecialtyItem({ item })}</View>
          ))}
        </ScrollView>
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
    },
    title: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.md,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
      color: theme.colors.textSecondary,
    },
    listContainer: {
      paddingBottom: theme.spacing.lg,
    },
    specialtyCard: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    specialtyText: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      textAlign: isRTL ? 'right' : 'left',
    },
    arrowText: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.primary,
      fontWeight: theme.typography.fontWeight.bold,
    },
  });

export default BookingScreen;
