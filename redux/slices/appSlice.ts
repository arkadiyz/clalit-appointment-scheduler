import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment, AppState } from '../../types';
import { mockDoctors } from '../../utils/mockData';
import { SupportedLanguage } from '../../translations/index';

const initialState: AppState = {
  user: null,
  currentAppointment: null,
  appointments: [], // מאותחל למערך ריק להתחלה
  doctors: mockDoctors, // מאותחל עם רשימת הרופאים המדומים
  selectedSpecialty: null, // מאותחל למצב ללא מקצוע נבחר
  selectedDoctor: null, // מאותחל למצב ללא רופא נבחר
  isDarkMode: false, // מאותחל למצב בהיר
  currentLanguage: 'en', // מאותחל לשפה אנגלית
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /**
     * LOGIN-REDUCER
     * @param state
     * @param action
     */
    loginUser: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.user = {
        username: action.payload.username,
        password: action.payload.password,
        isAuthenticated: true,
      };
    },

    /**
     * LOGOUT-REDUCER
     * @param state
     */
    logoutUser: (state) => {
      state.user = null;
      state.currentAppointment = null;
      state.selectedSpecialty = null;
      state.selectedDoctor = null;
    },

    /**
     * SELECTDOCTOR-BY-SPECIALTY-REDUCER
     * @param state
     * @param action
     */
    selectSpecialty: (state, action: PayloadAction<string>) => {
      state.selectedSpecialty = action.payload;
      state.selectedDoctor = state.doctors.find((doctor) => doctor.specialty === action.payload) || null;
    },

    /**
     * BOOK-OR-UPDATE-REDUCER
     * @param state
     * @param action
     */
    bookAppointment: (state, action: PayloadAction<Appointment>) => {
      // מוסיף תור לרשימת התורים
      state.appointments.push(action.payload);

      // עדכון התור הנוכחי להיות התור החדש
      state.currentAppointment = action.payload;

      // עדכון זמינות התור שנבחר
      if (state.selectedDoctor) {
        const slot = state.selectedDoctor.availableSlots.find((s) => s.date === action.payload.date && s.time === action.payload.time);
        if (slot) {
          slot.isAvailable = false; // מסמן את התור כלא זמין
        }
      }
    },

    cancelAppointment: (state, action: PayloadAction<string | undefined>) => {
      const appointmentId = action.payload || state.currentAppointment?.id;

      if (appointmentId) {
        // מציאת התור ברשימה
        const appointmentIndex = state.appointments.findIndex((apt) => apt.id === appointmentId);

        if (appointmentIndex !== -1) {
          const appointment = state.appointments[appointmentIndex];

          // החזרת הזמינות לתור שבוטל
          const doctor = state.doctors.find((d) => d.name === appointment.doctorName);
          if (doctor) {
            const slot = doctor.availableSlots.find((s) => s.date === appointment.date && s.time === appointment.time);
            if (slot) {
              slot.isAvailable = true;
            }
          }

          // הסרת התור מהרשימה
          state.appointments.splice(appointmentIndex, 1);
          // אם זה התור הנוכחי, נעדכן את התור הנוכחי
          if (state.currentAppointment?.id === appointmentId) {
            // אם יש תורים נוספים, התור הנוכחי יהיה התור הבא (לפי תאריך)
            if (state.appointments.length > 0) {
              const sortedAppointments = [...state.appointments].sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA.getTime() - dateB.getTime();
              });
              state.currentAppointment = sortedAppointments[0];
            } else {
              state.currentAppointment = null;
            }
          }
        }
      }
    },

    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      // ביטול התור הקודם
      if (state.currentAppointment && state.selectedDoctor) {
        const oldSlot = state.selectedDoctor.availableSlots.find(
          (s) => s.date === state.currentAppointment!.date && s.time === state.currentAppointment!.time
        );
        if (oldSlot) {
          oldSlot.isAvailable = true;
        }
      }

      // זימון התור החדש
      state.currentAppointment = action.payload;

      if (state.selectedDoctor) {
        const newSlot = state.selectedDoctor.availableSlots.find((s) => s.date === action.payload.date && s.time === action.payload.time);
        if (newSlot) {
          newSlot.isAvailable = false;
        }
      }
    },

    resetSelection: (state) => {
      state.selectedSpecialty = null;
      state.selectedDoctor = null;
    },

    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },

    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },

    setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  selectSpecialty,
  bookAppointment,
  cancelAppointment,
  updateAppointment,
  resetSelection,
  toggleTheme,
  setTheme,
  setLanguage,
} = appSlice.actions;

export default appSlice.reducer;
