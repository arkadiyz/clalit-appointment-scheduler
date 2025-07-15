import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/appSlice';
import { AppDispatch } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, userLoginParams } from '../types';
import { useTheme } from '../hooks/useTheme';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import { useTranslation } from '../hooks/useTranslation';

import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [user, srtUser] = useState<userLoginParams>({ username: '', password: '' });
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const { showAlert, isVisible, alertConfig, hideAlert } = useCustomAlert();
  const { t, isRTL } = useTranslation();
  const isAuthenticated = useSelector((state: RootState) => state.app.user?.isAuthenticated);

  console.log('User is authenticated:', isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Main');
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = () => {
    if (!user.username.trim() || !user.password.trim()) {
      showAlert({
        title: t.common.error,
        message: t.auth.fillAllFields,
        buttons: [{ text: t.common.confirm }],
      });
      return;
    }

    dispatch(loginUser({ ...user }));
    // navigation.replace('Main');
  };

  const styles = createStyles(theme, isRTL);

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t.auth.loginTitle}</Text>
        <Text style={styles.subtitle}>{t.auth.loginSubtitle}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t.auth.username}</Text>
          <TextInput
            style={styles.inputContainer}
            value={user.username}
            onChangeText={(text) => srtUser({ ...user, username: text })}
            placeholder={t.auth.usernamePlaceholder}
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize='none'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t.auth.password}</Text>
          <TextInput
            style={styles.inputContainer}
            value={user.password}
            onChangeText={(text) => srtUser({ ...user, password: text })}
            placeholder={t.auth.passwordPlaceholder}
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{t.auth.loginButton}</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={isVisible}
        title={alertConfig?.title || ''}
        message={alertConfig?.message}
        buttons={alertConfig?.buttons || []}
        onDismiss={hideAlert}
      />
    </SafeAreaProvider>
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
      justifyContent: 'center',
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
      fontSize: theme.typography.fontSize.lg,
      textAlign: 'center',
      marginBottom: theme.spacing.xxl,
      color: theme.colors.textSecondary,
    },
    inputContainer: {
      marginBottom: theme.spacing.lg,
    },
    label: {
      fontSize: theme.typography.fontSize.md,
      marginBottom: theme.spacing.xs,
      color: theme.colors.text,
      textAlign: isRTL ? 'right' : 'left',
      fontWeight: theme.typography.fontWeight.medium,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.card,
      fontSize: theme.typography.fontSize.md,
      textAlign: isRTL ? 'right' : 'left',
      color: theme.colors.text,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      marginTop: theme.spacing.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    loginButtonText: {
      color: 'white',
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'center',
    },
  });

export default LoginScreen;
