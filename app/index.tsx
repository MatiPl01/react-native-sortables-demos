import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TaskPlanner from '@/examples/TaskPlanner';
import { flex } from '@/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={flex.fill}>
      <TaskPlanner />
    </GestureHandlerRootView>
  );
}
