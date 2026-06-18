import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { FlyersProvider } from '@/context/FlyersContext';

import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <FlyersProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="flyer/[id]" 
            options={{ 
              presentation: 'card', 
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="bookmarks" 
            options={{ 
              presentation: 'card', 
              animation: 'slide_from_right'
            }} 
          />
        </Stack>
      </FlyersProvider>
    </ThemeProvider>
  );
}
