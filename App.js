// App.js
import * as React from 'react';
import { NavigationContainer, DefaultTheme as NavLight, DarkTheme as NavDark } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import EditItemScreen from './screens/EditItemScreen';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#4caf50',
      secondary: '#03a9f4',
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#81c784',
      secondary: '#4fc3f7',
    },
  };

  const theme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={isDark ? NavDark : NavLight}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <LoginScreen {...props} toggleTheme={() => setIsDark(!isDark)} />}
          </Stack.Screen>
          <Stack.Screen name="Dashboard">
            {(props) => <DashboardScreen {...props} toggleTheme={() => setIsDark(!isDark)} />}
          </Stack.Screen>
          <Stack.Screen name="EditItem" component={EditItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
