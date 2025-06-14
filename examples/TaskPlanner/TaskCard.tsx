import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from 'react-native-reanimated';
import Sortable, { useItemContext } from 'react-native-sortables';

import { colors, iconSizes, radius, spacing, text } from '@/theme';

import { SEPARATOR } from './constants';
import type { Task } from './types';
import { minutesToTime } from './utils';

function TaskCard({ duration, icon, title }: Task) {
  const { itemKey, keyToIndex } = useItemContext();
  const selectedAnimationProgress = useDerivedValue(() => {
    const itemIndex = keyToIndex.value[itemKey] ?? 0;
    const separatorIndex = keyToIndex.value[SEPARATOR] ?? 0;
    return withTiming(itemIndex < separatorIndex ? 1 : 0);
  });
  const isSelected = useDerivedValue(() =>
    Math.round(selectedAnimationProgress.value)
  );

  const animatedCardStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      selectedAnimationProgress.value,
      [0, 1],
      [colors.background2, colors.primary]
    ),
    ...(isSelected.value
      ? {
          justifyContent: 'flex-start',
          marginLeft: spacing.xxl,
          minHeight: 1.5 * duration
        }
      : {
          justifyContent: 'center',
          marginLeft: 0,
          minHeight: 'auto'
        })
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      selectedAnimationProgress.value,
      [0, 1],
      [colors.foreground2, colors.white]
    )
  }));

  const animatedSubtitleStyle = useAnimatedStyle(() => ({
    display: isSelected.value ? 'none' : 'flex'
  }));

  return (
    <Animated.View
      layout={LinearTransition}
      style={[styles.card, animatedCardStyle]}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text>{icon}</Text>
          <View>
            <Animated.Text
              layout={LinearTransition}
              style={[styles.title, animatedTitleStyle]}>
              {title}
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, animatedSubtitleStyle]}>
              Duration: {minutesToTime(duration)}
            </Animated.Text>
          </View>
        </View>
        <Animated.View layout={LinearTransition}>
          <Sortable.Handle>
            <FontAwesome5
              color='#d1d1d1'
              name='grip-horizontal'
              size={iconSizes.md}
            />
          </Sortable.Handle>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

export default memo(TaskCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background2,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    ...text.subHeading3,
    color: colors.foreground3
  },
  title: {
    ...text.heading4,
    color: colors.foreground2
  }
});
