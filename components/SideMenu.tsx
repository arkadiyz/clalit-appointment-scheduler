import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../hooks/useTheme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  isVisible: boolean;
  slideAnim: Animated.Value;
  getTransformValue: () => Animated.AnimatedInterpolation<string | number>;
  onClose: () => void;
  onBookNew: () => void;
  onLogout: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
}

const SideMenu: React.FC<Props> = (props) => {
  const { isVisible, slideAnim, getTransformValue, onClose, onBookNew, onLogout, onToggleTheme, onToggleLanguage } = props;
  const { t, currentLanguage, isRTL } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const { user } = useSelector((state: RootState) => state.app);

  const styles = createStyles(theme, isRTL);

  return (
    <Modal animationType='none' transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View
          style={[
            styles.sideMenu,
            isRTL ? styles.sideMenuRTL : styles.sideMenuLTR,
            {
              transform: [{ translateX: getTransformValue() }],
              opacity: slideAnim,
            },
          ]}
        >
          <SafeAreaView style={styles.menuContainer}>
            {/* כותרת התפריט */}
            <View style={styles.menuHeader}>
              {/* <TouchableOpacity style={[styles.closeButton, isRTL && styles.closeButtonRTL]} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity> */}
              <Text style={[styles.appTitle, isRTL && styles.textRTL]}>{t.main.systemTitle}</Text>
              <Text style={[styles.userName, isRTL && styles.textRTL]}>
                {t.main.welcome} {user?.username}
              </Text>
            </View>

            <ScrollView style={styles.menuContent}>
              {/* תפריט פעולות */}
              <View style={styles.menuSection}>
                <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>{t.drawer.actions}</Text>

                <TouchableOpacity style={[styles.menuItem, isRTL && styles.menuItemRTL]} onPress={onBookNew}>
                  <Text style={[styles.menuIcon, isRTL && styles.iconRTL]}>📅</Text>
                  <Text style={[styles.menuText, isRTL && styles.textRTL]}>{t.main.bookNewAppointment}</Text>
                </TouchableOpacity>
              </View>

              {/* תפריט הגדרות */}
              <View style={styles.menuSection}>
                <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>{t.drawer.settings}</Text>

                <TouchableOpacity style={[styles.menuItem, isRTL && styles.menuItemRTL]} onPress={onToggleLanguage}>
                  <Text style={[styles.menuIcon, isRTL && styles.iconRTL]}>🌐</Text>
                  <Text style={[styles.menuText, isRTL && styles.textRTL]}>
                    {t.drawer.language}: {currentLanguage === 'he' ? 'עברית' : 'English'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, isRTL && styles.menuItemRTL]} onPress={onToggleTheme}>
                  <Text style={[styles.menuIcon, isRTL && styles.iconRTL]}>{isDarkMode ? '☀️' : '🌙'}</Text>
                  <Text style={[styles.menuText, isRTL && styles.textRTL]}>
                    {t.drawer.theme}: {isDarkMode ? t.drawer.light : t.drawer.dark}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* כפתור התנתקות */}
            <View style={styles.logoutSection}>
              <TouchableOpacity style={[styles.logoutButton, isRTL && styles.logoutButtonRTL]} onPress={onLogout}>
                <Text style={[styles.logoutIcon, isRTL && styles.iconRTL]}>🚪</Text>
                <Text style={[styles.logoutText, isRTL && styles.textRTL]}>{t.common.logout}</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: any, _isRTL: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.black,
    },
    modalBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    sideMenu: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '80%',
      maxWidth: 300,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 10,
      opacity: 0,
    },
    sideMenuLTR: {
      left: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      transform: [{ translateX: -300 }],
    },
    sideMenuRTL: {
      right: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      transform: [{ translateX: 300 }],
    },
    menuContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
    },
    menuHeader: {
      backgroundColor: theme.colors.primary,
      marginHorizontal: -theme.spacing.lg,
      marginTop: -theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
      marginBottom: theme.spacing.lg,
      position: 'relative',
    },
    appTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: 'white',
      marginBottom: theme.spacing.xs,
    },
    userName: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.rgba_wite,
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing.md,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.colors.shadow,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    closeButtonRTL: {
      left: theme.spacing.lg,
    },
    closeButtonText: {
      color: 'white',
      fontSize: theme.typography.fontSize.lg, //18
      fontWeight: theme.typography.fontWeight.bold, // 'bold',
    },
    menuContent: {
      flex: 1,
      paddingBottom: theme.spacing.lg,
    },
    menuSection: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      marginBottom: theme.spacing.md,
      color: theme.colors.textSecondary,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: theme.spacing.xs,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.card,
      marginBottom: theme.spacing.sm,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    menuItemRTL: {
      flexDirection: 'row-reverse',
    },
    menuIcon: {
      fontSize: theme.typography.fontSize.xl, //24
      width: 30,
      textAlign: 'center',
      color: theme.colors.primary,
    },
    iconRTL: {
      marginLeft: theme.spacing.md,
      marginRight: 0,
    },
    menuText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    logoutSection: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: theme.spacing.lg,
      marginTop: 'auto',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.error,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    logoutButtonRTL: {
      flexDirection: 'row-reverse',
    },
    logoutIcon: {
      fontSize: theme.typography.fontSize.lg, //18,
      color: theme.colors.background,
    },
    logoutText: {
      color: theme.colors.background,
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.bold,
      marginLeft: theme.spacing.sm,
    },
    textRTL: {
      textAlign: 'right',
    },
  });

export default SideMenu;
