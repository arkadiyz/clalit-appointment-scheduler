import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { bookAppointment, updateAppointment } from '../redux/slices/appSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, TimeSlot, Appointment } from '../types';
import { getDoctorBySpecialty } from '../utils/mockData';
import { useTheme } from '../hooks/useTheme';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import { useTranslation } from '../hooks/useTranslation';
import AppHeader from '../components/AppHeader';

type DoctorCalendarNavigationProp = StackNavigationProp<RootStackParamList, 'DoctorCalendar'>;
type DoctorCalendarRouteProp = RouteProp<RootStackParamList, 'DoctorCalendar'>;

interface Props {
  navigation: DoctorCalendarNavigationProp;
  route: DoctorCalendarRouteProp;
}

const DoctorCalendarScreen: React.FC<Props> = ({ navigation, route }) => {
  const { specialty, isUpdating, existingAppointment } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.app);
  const { theme } = useTheme();
  const { alertConfig, isVisible, showAlert, hideAlert } = useCustomAlert();
  const { t, currentLanguage, isRTL } = useTranslation();
  const styles = createStyles(theme, isRTL);

  console.log('--------------------------- DoctorCalendarScreen ---------------------------');
  console.log('isUpdating:', isUpdating);
  console.log('existingAppointment:', existingAppointment);

  const doctor = getDoctorBySpecialty(specialty);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  //   console.log('DoctorCalendarScreen loaded:');
  //   console.log('specialty:', specialty);
  //   console.log('doctor found:', doctor);
  //   console.log('user:', user);

  const availableSlots = doctor?.availableSlots.filter((slot) => slot.isAvailable) || [];

  // console.log('availableSlots:', availableSlots);

  // קיבוץ התורים לפי תאריכים
  const groupedSlots = availableSlots.reduce((groups: { [key: string]: TimeSlot[] }, slot) => {
    if (!groups[slot.date]) {
      groups[slot.date] = [];
    }
    groups[slot.date].push(slot);
    return groups;
  }, {});

  const dates = Object.keys(groupedSlots).sort();

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBookAppointment = () => {
    if (!selectedSlot || !doctor || !user) {
      console.log('Missing data - showing error');
      showAlert({
        title: t.common.error,
        message: t.booking.pleaseSelectSlot,
        buttons: [{ text: t.common.confirm }],
      });
      return;
    }

    if (isUpdating && existingAppointment) {
      // עדכון תור קיים
      console.log('Updating existing appointment...');
      const updatedAppointment: Appointment = {
        ...existingAppointment,
        date: selectedSlot.date,
        time: selectedSlot.time,
      };

      console.log('Updated appointment:', updatedAppointment);
      dispatch(updateAppointment(updatedAppointment));
      navigation.navigate('AppointmentSummary', { appointment: updatedAppointment });
    } else {
      
      // יצירת תור חדש
      console.log('Creating new appointment...');
      const appointment: Appointment = {
        id: Date.now().toString(),
        patientName: user.username,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: selectedSlot.date,
        time: selectedSlot.time,
        status: 'active',
      };

      console.log('New appointment created:', appointment);
      dispatch(bookAppointment(appointment));
      navigation.navigate('AppointmentSummary', { appointment });
    }
  };

  const renderTimeSlot = ({ item }: { item: TimeSlot }) => (
    <TouchableOpacity style={[styles.timeSlot, selectedSlot?.id === item.id && styles.selectedTimeSlot]} onPress={() => handleSlotSelect(item)}>
      <Text style={[styles.timeText, selectedSlot?.id === item.id && styles.selectedTimeText]}>{item.time}</Text>
    </TouchableOpacity>
  );

  const renderDateSection = (date: string) => (
    <View key={date} style={styles.dateSection}>
      <Text style={styles.dateTitle}>{date}</Text>
      <FlatList
        data={groupedSlots[date]}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.timeRow}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={t.booking.doctorCalendar} onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>{t.booking.selectDateTime}</Text>

        {doctor && (
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{currentLanguage === 'he' ? doctor.name : doctor.nameEn}</Text>
            <Text style={styles.specialtyText}>{currentLanguage === 'he' ? doctor.specialty : doctor.specialtyEn}</Text>
          </View>
        )}

        {dates.length > 0 ? (
          <FlatList
            data={dates}
            renderItem={({ item }) => renderDateSection(item)}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.calendarContainer}
          />
        ) : (
          <View style={styles.noSlotsContainer}>
            <Text style={styles.noSlotsText}>{t.booking.noSlotsAvailable}</Text>
          </View>
        )}

        {selectedSlot && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedInfoText}>
              {t.booking.selected}: {selectedSlot.date} {t.booking.at} {selectedSlot.time}
            </Text>
            <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
              <Text style={styles.bookButtonText}>{t.booking.bookAppointment}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <CustomAlert
        visible={isVisible}
        title={alertConfig?.title || ''}
        message={alertConfig?.message}
        buttons={alertConfig?.buttons || []}
        onDismiss={hideAlert}
      />
    </SafeAreaView>
  );
};

const createStyles = (theme: any, _isRTL: boolean) =>
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
      marginBottom: theme.spacing.lg,
      color: theme.colors.text,
    },
    doctorInfo: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    doctorName: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    specialtyText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.textSecondary,
    },
    calendarContainer: {
      paddingBottom: theme.spacing.lg,
    },
    dateSection: {
      backgroundColor: theme.colors.card,
      marginBottom: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    dateTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
    },
    timeRow: {
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
    },
    timeSlot: {
      flex: 0.3,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.small,
      alignItems: 'center',
      marginHorizontal: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedTimeSlot: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    timeText: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
    },
    selectedTimeText: {
      color: theme.colors.surface,
    },
    selectedInfo: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      marginTop: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    selectedInfoText: {
      fontSize: theme.typography.fontSize.md,
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
      textAlign: 'center',
      fontWeight: theme.typography.fontWeight.medium,
    },
    bookButton: {
      backgroundColor: theme.colors.success,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.medium,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bookButtonText: {
      color: theme.colors.surface,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
    },
    noSlotsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noSlotsText: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

export default DoctorCalendarScreen;
