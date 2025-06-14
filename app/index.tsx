import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TaskPlanner from '@/examples/TaskPlanner';
import { colors } from '@/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <TaskPlanner />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background1,
    flex: 1
  }
});
