import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './components/ThemeProvider';

const AppWithTheme: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);

  return (
    <SafeAreaProvider>
      {/* <StatusBar
        style={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#3498db'}
      /> */}
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
