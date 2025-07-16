import { Doctor, TimeSlot } from '../types';
import { Translation } from '../translations';

export const mockTimeSlots: TimeSlot[] = [
  // רפואה משפחה - 15/07/2025
  { id: '1', date: '15/07/2025', time: '09:00', isAvailable: true },
  { id: '2', date: '15/07/2025', time: '10:30', isAvailable: true },
  { id: '3', date: '15/07/2025', time: '14:00', isAvailable: true },

  // רפואה משפחה - 16/07/2025
  { id: '4', date: '16/07/2025', time: '08:30', isAvailable: true },
  { id: '5', date: '16/07/2025', time: '11:00', isAvailable: true },
  { id: '6', date: '16/07/2025', time: '15:30', isAvailable: true },

  // רופא עור - 17/07/2025
  { id: '7', date: '17/07/2025', time: '10:00', isAvailable: true },
  { id: '8', date: '17/07/2025', time: '13:30', isAvailable: true },
  { id: '9', date: '17/07/2025', time: '16:00', isAvailable: true },

  // רופא עור - 18/07/2025
  { id: '10', date: '18/07/2025', time: '09:30', isAvailable: true },
  { id: '11', date: '18/07/2025', time: '12:00', isAvailable: true },
  { id: '12', date: '18/07/2025', time: '17:00', isAvailable: true },

  // רופאת נשים - 19/07/2025
  { id: '13', date: '19/07/2025', time: '08:00', isAvailable: true },
  { id: '14', date: '19/07/2025', time: '11:30', isAvailable: true },
  { id: '15', date: '19/07/2025', time: '14:30', isAvailable: true },

  // רופאת נשים - 20/07/2025
  { id: '16', date: '20/07/2025', time: '09:00', isAvailable: true },
  { id: '17', date: '20/07/2025', time: '13:00', isAvailable: true },
  { id: '18', date: '20/07/2025', time: '16:30', isAvailable: true },
];

// רשימת המקצועות הרפואיים - חזרה למקור
export const medicalSpecialties = ['רפואה משפחה', 'רופא עור', 'רופאת נשים'];

// רשימת הרופאים והמקצועות עם תרגומים
export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'ד"ר יוסי כהן',
    nameEn: 'Dr. Yossi Cohen',
    specialty: 'רפואה משפחה',
    specialtyEn: 'Family Medicine',
    availableSlots: mockTimeSlots.filter((slot) => slot.date === '15/07/2025' || slot.date === '16/07/2025'),
  },
  {
    id: '2',
    name: 'ד"ר שרה לוי',
    nameEn: 'Dr. Sarah Levy',
    specialty: 'רופא עור',
    specialtyEn: 'Dermatology',
    availableSlots: mockTimeSlots.filter((slot) => slot.date === '17/07/2025' || slot.date === '18/07/2025'),
  },
  {
    id: '3',
    name: 'ד"ר רחל אברהם',
    nameEn: 'Dr. Rachel Abraham',
    specialty: 'רופאת נשים',
    specialtyEn: 'Gynecology',
    availableSlots: mockTimeSlots.filter((slot) => slot.date === '19/07/2025' || slot.date === '20/07/2025'),
  },
];

// פונקציית תרגום מרכזית למקצועות רפואיים
export const getSpecialtyTranslation = (specialty: string, t: Translation): string => {
  switch (specialty) {
    case 'רפואה משפחה':
      return t.specialties.familyMedicine;
    case 'רופא עור':
      return t.specialties.dermatology;
    case 'רופאת נשים':
      return t.specialties.gynecology;
    default:
      return specialty;
  }
};

// פונקציות עזר
export const getDoctorBySpecialty = (specialty: string): Doctor | undefined => {
  return mockDoctors.find((doctor) => doctor.specialty === specialty);
};

export const getAvailableSlotsBySpecialty = (specialty: string): TimeSlot[] => {
  const doctor = getDoctorBySpecialty(specialty);
  return doctor ? doctor.availableSlots.filter((slot) => slot.isAvailable) : [];
};
