import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useAnimatedRef } from 'react-native-reanimated';
import type { SortableGridRenderItem } from 'react-native-sortables';
import Sortable from 'react-native-sortables';

import { spacing } from '@/theme';

import Separator from './Separator';
import TaskCard from './TaskCard';
import type { Task } from './types';

// Special marker for the visual break between the
// "already-scheduled" list (top) and the inbox (bottom).
export const SEPARATOR = '__SEPARATOR__' as const;

// Assume this is the initial data from the backend
export const DATA: Array<Task | typeof SEPARATOR> = [
  // scheduled block
  { duration: 30, icon: '🍳', id: 'e1a4b3d2', title: 'Breakfast' },

  SEPARATOR, // separates scheduled tasks from inbox tasks

  // inbox tasks
  {
    duration: 45,
    icon: '🔍',
    id: 'c7f5e201',
    title: 'Code review pull requests'
  },
  {
    duration: 180,
    icon: '💻',
    id: 'd9a8c602',
    title: 'Implement new auth feature'
  },
  { duration: 30, icon: '🎨', id: 'ab34d591', title: 'Sync with UX designer' },
  { duration: 30, icon: '🚀', id: 'f3c6b820', title: 'Deploy staging build' },
  {
    duration: 60,
    icon: '🤝',
    id: 'bb9d4e71',
    title: 'Interview frontend candidate'
  },
  {
    duration: 45,
    icon: '📋',
    id: 'a482c930',
    title: 'Sprint backlog grooming'
  },
  {
    duration: 60,
    icon: '📊',
    id: 'ce57af12',
    title: 'Prepare monthly HR metrics'
  },
  { duration: 40, icon: '🔐', id: 'd0e74623', title: 'Review security patch' },
  { duration: 60, icon: '🍱', id: 'f72e1c88', title: 'Lunch with team' },
  {
    duration: 60,
    icon: '🏢',
    id: 'a2b5d7e4',
    title: 'Company all-hands meeting'
  }
];

type Item = (typeof DATA)[number];

export default function TaskPlanner() {
  const [data, setData] = useState(DATA);
  const scrollableRef = useAnimatedRef<ScrollView>();

  const renderItem = useCallback<SortableGridRenderItem<Item>>(({ item }) => {
    if (item === SEPARATOR) {
      return <Separator />;
    }

    return <TaskCard {...item} />;
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      ref={scrollableRef}>
      <Sortable.Grid
        activeItemScale={1.03}
        data={data}
        dragActivationDelay={0}
        overDrag='vertical'
        renderItem={renderItem}
        reorderTriggerOrigin='touch'
        rowGap={spacing.sm}
        scrollableRef={scrollableRef}
        customHandle
        onDragEnd={({ data: newData }) => setData(newData)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md
  }
});
