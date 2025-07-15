export interface Translation {
  common: {
    login: string;
    logout: string;
    cancel: string;
    confirm: string;
    error: string;
    success: string;
    back: string;
    add: string;
    update: string;
    delete: string;
    save: string;
    loading: string;
    next: string;
    previous: string;
    edit: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    username: string;
    password: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    loginButton: string;
    fillAllFields: string;
  };
  main: {
    welcome: string;
    systemTitle: string;
    upcomingAppointment: string;
    noActiveAppointment: string;
    noAppointmentDescription: string;
    bookNewAppointment: string;
    updateAppointment: string;
    cancelAppointment: string;
    appointmentCanceled: string;
    additionalAppointments: string;
  };
  booking: {
    newAppointmentTitle: string;
    selectSpecialty: string;
    selectSpecialtyDescription: string;
    selectDateTime: string;
    doctorCalendar: string;
    noSlotsAvailable: string;
    selected: string;
    at: string;
    bookAppointment: string;
    pleaseSelectSlot: string;
  };
  appointment: {
    appointmentBooked: string;
    appointmentDetails: string;
    patientName: string;
    specialty: string;
    doctorName: string;
    date: string;
    time: string;
    status: string;
    active: string;
    importantNotes: string;
    arriveEarly: string;
    bringDocuments: string;
    canModify: string;
    confirmAndReturn: string;
  };
  manage: {
    manageAppointment: string;
    currentAppointmentDetails: string;
    availableActions: string;
    updateAppointmentAction: string;
    updateDescription: string;
    cancelAppointmentAction: string;
    cancelDescription: string;
    note: string;
    noteDescription: string;
    noAppointmentToManage: string;
    cancelConfirmTitle: string;
    cancelConfirmMessage: string;
    appointmentCanceledTitle: string;
    appointmentCanceledMessage: string;
  };
  specialties: {
    familyMedicine: string;
    dermatology: string;
    gynecology: string;
  };
  drawer: {
    actions: string;
    settings: string;
    language: string;
    theme: string;
    light: string;
    dark: string;
  };
}

export const hebrewTranslation: Translation = {
  common: {
    login: 'התחברות',
    logout: 'התנתקות',
    cancel: 'ביטול',
    confirm: 'אישור',
    error: 'שגיאה',
    success: 'הצלחה',
    back: 'חזרה',
    add: 'הוסף',
    update: 'עדכן',
    delete: 'מחק',
    save: 'שמור',
    loading: 'טוען...',
    next: 'הבא',
    previous: 'קודם',
    edit: 'עריכה',
  },
  auth: {
    loginTitle: 'מערכת זימון תורים רפואיים',
    loginSubtitle: 'התחברות למערכת',
    username: 'שם משתמש',
    password: 'סיסמה',
    usernamePlaceholder: 'הכנס שם משתמש',
    passwordPlaceholder: 'הכנס סיסמה',
    loginButton: 'התחבר',
    fillAllFields: 'אנא מלא את כל השדות',
  },
  main: {
    welcome: 'שלום',
    systemTitle: 'מערכת זימון תורים רפואיים',
    upcomingAppointment: 'התור הקרוב שלך',
    noActiveAppointment: 'אין לך תור פעיל',
    noAppointmentDescription: 'לחץ על הכפתור למטה כדי לזמן תור חדש',
    bookNewAppointment: 'זמן תור חדש',
    updateAppointment: 'עדכן תור',
    cancelAppointment: 'בטל תור',
    appointmentCanceled: 'התור בוטל בהצלחה',
    additionalAppointments: 'תורים נוספים',
  },
  booking: {
    newAppointmentTitle: 'זימון תור חדש',
    selectSpecialty: 'בחר מקצוע רפואי',
    selectSpecialtyDescription: 'בחר את המקצוע הרפואי שאליו תרצה לזמן תור',
    selectDateTime: 'בחר תאריך ושעה',
    doctorCalendar: 'יומן הרופא',
    noSlotsAvailable: 'אין תורים זמינים כרגע',
    selected: 'נבחר',
    at: 'בשעה',
    bookAppointment: 'זמן תור',
    pleaseSelectSlot: 'אנא בחר תור זמין',
  },
  appointment: {
    appointmentBooked: 'התור נקבע בהצלחה!',
    appointmentDetails: 'פרטי התור שלך:',
    patientName: 'שם המטופל',
    specialty: 'מקצוע רפואי',
    doctorName: 'שם הרופא',
    date: 'תאריך',
    time: 'שעה',
    status: 'סטטוס',
    active: 'פעיל',
    importantNotes: 'הערות חשובות:',
    arriveEarly: '• אנא הגע 15 דקות לפני השעה הקבועה',
    bringDocuments: '• הבא معך תעודת זהות וכרטיס ביטוח',
    canModify: '• ניתן לבטל או לעדכן את התור דרך האפליקציה',
    confirmAndReturn: 'אישור ומעבר למסך הראשי',
  },
  manage: {
    manageAppointment: 'ניהול תור',
    currentAppointmentDetails: 'פרטי התור הנוכחי',
    availableActions: 'פעולות זמינות:',
    updateAppointmentAction: 'עדכן תור',
    updateDescription: 'שנה תאריך או שעה',
    cancelAppointmentAction: 'בטל תור',
    cancelDescription: 'ביטול מוחלט של התור',
    note: 'הערה:',
    noteDescription: 'עדכון תור יאפשר לך לבחור תאריך ושעה חדשים מהיומן הזמין. ביטול התור יבטל אותו לחלוטין ותוכל לזמן תור חדש בעתיד.',
    noAppointmentToManage: 'אין תור פעיל לניהול',
    cancelConfirmTitle: 'ביטול תור',
    cancelConfirmMessage: 'האם אתה בטוח שברצונך לבטל את התור?',
    appointmentCanceledTitle: 'התור בוטל בהצלחה',
    appointmentCanceledMessage: 'התור שלך בוטל בהצלחה',
  },
  specialties: {
    familyMedicine: 'רפואה משפחתית',
    dermatology: 'דרמטולוגיה',
    gynecology: 'גינקולוגיה',
  },
  drawer: {
    actions: 'פעולות',
    settings: 'הגדרות',
    language: 'שפה',
    theme: 'נושא',
    light: 'בהיר',
    dark: 'כהה',
  },
};

export const englishTranslation: Translation = {
  common: {
    login: 'Login',
    logout: 'Logout',
    cancel: 'Cancel',
    confirm: 'Confirm',
    error: 'Error',
    success: 'Success',
    back: 'Back',
    add: 'Add',
    update: 'Update',
    delete: 'Delete',
    save: 'Save',
    loading: 'Loading...',
    next: 'Next',
    previous: 'Previous',
    edit: 'Edit',
  },
  auth: {
    loginTitle: 'Medical Appointment System',
    loginSubtitle: 'Login to System',
    username: 'Username',
    password: 'Password',
    usernamePlaceholder: 'Enter username',
    passwordPlaceholder: 'Enter password',
    loginButton: 'Login',
    fillAllFields: 'Please fill all fields',
  },
  main: {
    welcome: 'Hello',
    systemTitle: 'Medical Appointment System',
    upcomingAppointment: 'Your Upcoming Appointment',
    noActiveAppointment: 'No Active Appointment',
    noAppointmentDescription: 'Click the button below to book a new appointment',
    bookNewAppointment: 'Book New Appointment',
    updateAppointment: 'Update Appointment',
    cancelAppointment: 'Cancel Appointment',
    appointmentCanceled: 'Appointment canceled successfully',
    additionalAppointments: 'Additional Appointments',
  },
  booking: {
    newAppointmentTitle: 'Book New Appointment',
    selectSpecialty: 'Select Medical Specialty',
    selectSpecialtyDescription: 'Choose the medical specialty for your appointment',
    selectDateTime: 'Select Date and Time',
    doctorCalendar: "Doctor's Calendar",
    noSlotsAvailable: 'No slots available at the moment',
    selected: 'Selected',
    at: 'at',
    bookAppointment: 'Book Appointment',
    pleaseSelectSlot: 'Please select an available slot',
  },
  appointment: {
    appointmentBooked: 'Appointment Booked Successfully!',
    appointmentDetails: 'Your Appointment Details:',
    patientName: 'Patient Name',
    specialty: 'Medical Specialty',
    doctorName: 'Doctor Name',
    date: 'Date',
    time: 'Time',
    status: 'Status',
    active: 'Active',
    importantNotes: 'Important Notes:',
    arriveEarly: '• Please arrive 15 minutes before your scheduled time',
    bringDocuments: '• Bring your ID and insurance card',
    canModify: '• You can cancel or update the appointment through the app',
    confirmAndReturn: 'Confirm and Return to Main',
  },
  manage: {
    manageAppointment: 'Manage Appointment',
    currentAppointmentDetails: 'Current Appointment Details',
    availableActions: 'Available Actions:',
    updateAppointmentAction: 'Update Appointment',
    updateDescription: 'Change date or time',
    cancelAppointmentAction: 'Cancel Appointment',
    cancelDescription: 'Permanently cancel the appointment',
    note: 'Note:',
    noteDescription:
      'Updating an appointment will allow you to choose new date and time from the available calendar. Canceling will permanently remove the appointment and you can book a new one in the future.',
    noAppointmentToManage: 'No active appointment to manage',
    cancelConfirmTitle: 'Cancel Appointment',
    cancelConfirmMessage: 'Are you sure you want to cancel the appointment?',
    appointmentCanceledTitle: 'Appointment Canceled',
    appointmentCanceledMessage: 'Your appointment has been canceled successfully',
  },
  specialties: {
    familyMedicine: 'Family Medicine',
    dermatology: 'Dermatology',
    gynecology: 'Gynecology',
  },
  drawer: {
    actions: 'Actions',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
  },
};

export type SupportedLanguage = 'he' | 'en';

export const translations = {
  he: hebrewTranslation,
  en: englishTranslation,
};
