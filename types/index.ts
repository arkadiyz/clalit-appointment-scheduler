export interface User {
  username: string;
  password: string;
  isAuthenticated: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  nameEn: string;
  specialty: string;
  specialtyEn: string;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'active' | 'cancelled';
}

export interface AppState {
  user: User | null;
  currentAppointment: Appointment | null;
  appointments: Appointment[];
  doctors: Doctor[];
  selectedSpecialty: string | null;
  selectedDoctor: Doctor | null;
  isDarkMode: boolean;
  currentLanguage: 'en' | 'he';
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  BookingScreen: undefined;
  DoctorCalendar: { specialty: string };
  AppointmentSummary: { appointment: Appointment };
  RootStackParamList: undefined;
  ManageAppointment: undefined;
};

export interface CustomAlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons: CustomAlertButton[];
  onDismiss?: () => void;
}

export interface AlertOptions {
  title: string;
  message?: string;
  buttons: CustomAlertButton[];
}

export type userLoginParams = {
  username: string;
  password: string;
};
