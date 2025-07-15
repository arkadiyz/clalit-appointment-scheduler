import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';
import { logoutUser, setLanguage, toggleTheme } from '../redux/slices/appSlice';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.app);
  const { theme, isDarkMode } = useTheme();
  const { t, currentLanguage, isRTL } = useTranslation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleLanguage = () => {
    const newLanguage = currentLanguage === 'he' ? 'en' : 'he';
    dispatch(setLanguage(newLanguage));
  };

  const handleBookNewAppointment = () => {
    navigation.navigate('BookingScreen');
    navigation.closeDrawer();
  };

  const handleManageAppointment = () => {
    navigation.navigate('ManageAppointment');
    navigation.closeDrawer();
  };

  const styles = createStyles(theme, isRTL);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView>
        {/* כותרת התפריט */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>{t.main.systemTitle}</Text>
          <Text style={styles.userName}>
            {t.main.welcome} {user?.username}
          </Text>
        </View>

        {/* תפריט פעולות */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{t.drawer.actions}</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleBookNewAppointment}>
            <Text style={styles.menuIcon}>📅</Text>
            <Text style={styles.menuText}>{t.main.bookNewAppointment}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleManageAppointment}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>{t.manage.manageAppointment}</Text>
          </TouchableOpacity>
        </View>

        {/* תפריט הגדרות */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{t.drawer.settings}</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleToggleLanguage}>
            <Text style={styles.menuIcon}>🌐</Text>
            <Text style={styles.menuText}>
              {t.drawer.language}: {currentLanguage === 'he' ? 'עברית' : 'English'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleToggleTheme}>
            <Text style={styles.menuIcon}>{isDarkMode ? '☀️' : '🌙'}</Text>
            <Text style={styles.menuText}>
              {t.drawer.theme}: {isDarkMode ? t.drawer.light : t.drawer.dark}
            </Text>
          </TouchableOpacity>
        </View>

        {/* כפתור התנתקות */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>{t.common.logout}</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme: any, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.xl,
      marginBottom: theme.spacing.lg,
    },
    appTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: 'white',
      marginBottom: theme.spacing.sm,
      textAlign: isRTL ? 'right' : 'left',
    },
    userName: {
      fontSize: theme.typography.fontSize.md,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: isRTL ? 'right' : 'left',
    },
    menuSection: {
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
      textAlign: isRTL ? 'right' : 'left',
    },
    menuItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.xs,
    },
    menuIcon: {
      fontSize: theme.typography.fontSize.lg,
      marginRight: isRTL ? 0 : theme.spacing.md,
      marginLeft: isRTL ? theme.spacing.md : 0,
    },
    menuText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      flex: 1,
      textAlign: isRTL ? 'right' : 'left',
    },
    logoutSection: {
      marginTop: 'auto',
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.lg,
    },
    logoutButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.error,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.medium,
    },
    logoutIcon: {
      fontSize: theme.typography.fontSize.lg,
      marginRight: isRTL ? 0 : theme.spacing.md,
      marginLeft: isRTL ? theme.spacing.md : 0,
    },
    logoutText: {
      fontSize: theme.typography.fontSize.md,
      color: 'white',
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: isRTL ? 'right' : 'left',
    },
  });

export default CustomDrawerContent;
