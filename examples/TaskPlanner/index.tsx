import * as Haptics from 'expo-haptics';
import { useCallback, useState } from 'react';
import { Dimensions, Platform, ScrollView } from 'react-native';
import { useAnimatedRef, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type {
  OrderChangeCallback,
  SortableGridRenderItem
} from 'react-native-sortables';
import Sortable from 'react-native-sortables';

import { spacing } from '@/theme';

import { SEPARATOR } from './constants';
import PlannedTasksHeader from './PlannedTasksHeader';
import SectionHeader from './SectionHeader';
import TaskCard from './TaskCard';
import type { Task } from './types';
import { calculateTotalDurations } from './utils';

const START_TIME_MINUTES = 9 * 60; // 9:00 AM

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

const ITEM_DURATIONS = DATA.reduce(
  (acc, item) => {
    if (item === SEPARATOR) {
      return acc;
    }

    acc[item.id] = item.duration;
    return acc;
  },
  {} as Record<string, number>
);

const INITIAL_TOTAL_DURATIONS = calculateTotalDurations(
  (DATA.slice(0, DATA.indexOf(SEPARATOR)) as Array<Task>).map(({ id }) => id),
  ITEM_DURATIONS
);

const SCREEN_HEIGHT = Dimensions.get('window').height;

type Item = (typeof DATA)[number];

export default function TaskPlanner() {
  const [data, setData] = useState(DATA);
  const insets = useSafeAreaInsets();
  const scrollableRef = useAnimatedRef<ScrollView>();

  const totalDurations = useSharedValue<Record<string, number>>(
    INITIAL_TOTAL_DURATIONS
  );

  const handleOrderChange = useCallback<OrderChangeCallback>(
    ({ fromIndex, indexToKey, keyToIndex, toIndex }) => {
      totalDurations.value = calculateTotalDurations(
        indexToKey,
        ITEM_DURATIONS
      );

      const separatorIndex = keyToIndex[SEPARATOR];
      // If the active item becomes selected
      if (toIndex === separatorIndex) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      // If the active item is deselected
      else if (fromIndex === separatorIndex) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    },
    [totalDurations]
  );

  const renderItem = useCallback<SortableGridRenderItem<Item>>(
    ({ item }) => {
      if (item === SEPARATOR) {
        return <SectionHeader title='Inbox Tasks' />;
      }

      return (
        <TaskCard
          {...item}
          startTimeMinutes={START_TIME_MINUTES}
          totalDurations={totalDurations}
        />
      );
    },
    [totalDurations]
  );

  return (
    <ScrollView
      ref={scrollableRef}
      style={Platform.OS === 'web' && { overflowY: 'scroll' }}
      contentContainerStyle={{
        paddingBottom: insets.bottom + spacing.md,
        paddingHorizontal: spacing.md
      }}>
      <PlannedTasksHeader
        startTimeMinutes={START_TIME_MINUTES}
        totalDurations={totalDurations}
      />
      <Sortable.Grid
        activeItemScale={1.03}
        autoScrollSpeed={0.5}
        data={data}
        dragActivationDelay={0}
        overDrag='vertical'
        renderItem={renderItem}
        rowGap={spacing.sm}
        scrollableRef={scrollableRef}
        autoScrollActivationOffset={[
          0.2 * SCREEN_HEIGHT,
          0.075 * SCREEN_HEIGHT
        ]}
        customHandle
        onOrderChange={handleOrderChange}
        onDragEnd={({ data: newData }) => {
          setData(newData);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        onDragStart={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }
      />
    </ScrollView>
  );
}
