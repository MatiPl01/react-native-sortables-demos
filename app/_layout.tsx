import { Stack } from 'expo-router';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { EXAMPLES } from '@/examples';
import { colors, flex } from '@/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={flex.fill}>
      <StatusBar backgroundColor={colors.background2} barStyle='dark-content' />
      <Stack
        screenOptions={{
          contentStyle: styles.screenContent,
          headerStyle: {
            backgroundColor: colors.white
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.foreground1
          }
        }}>
        <Stack.Screen
          name='index'
          options={{
            title: 'React Native Sortables Examples'
          }}
        />
        <Stack.Screen
          name='[example]'
          options={({ route }) => {
            const params = route.params as undefined | { example?: string };
            const exampleRoute = params?.example;
            const example = EXAMPLES.find(ex => ex.route === exampleRoute);
            return {
              title: example?.title ?? 'Example'
            };
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    backgroundColor: colors.background2,
    flex: 1
  }
});
