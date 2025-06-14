import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { memo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolateColor,
  LinearTransition,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Sortable, { useItemContext } from 'react-native-sortables';

import AnimatedText from '@/components/AnimatedText';
import { colors, flex, iconSizes, radius, spacing, text } from '@/theme';

import { SEPARATOR } from './constants';
import type { Task } from './types';
import { minutesToTime } from './utils';

function formatDuration(duration: number) {
  'worklet';
  return `Duration: ${minutesToTime(duration)}`;
}

type TaskCardProps = Task & {
  startTimeMinutes: number;
  totalDurations: SharedValue<Record<string, number>>;
};

function TaskCard({
  duration,
  icon,
  startTimeMinutes,
  title,
  totalDurations
}: TaskCardProps) {
  const { itemKey, keyToIndex } = useItemContext();

  const selectedAnimationProgress = useDerivedValue(() => {
    const itemIndex = keyToIndex.value[itemKey] ?? 0;
    const separatorIndex = keyToIndex.value[SEPARATOR] ?? 0;
    return withTiming(itemIndex < separatorIndex ? 1 : 0);
  });
  const isSelected = useDerivedValue(() =>
    Math.round(selectedAnimationProgress.value)
  );
  const animatedText = useSharedValue(formatDuration(duration));

  useAnimatedReaction(
    () => ({
      selected: isSelected.value,
      totalDuration: totalDurations.value[itemKey]
    }),
    ({ selected, totalDuration }) => {
      if (selected && totalDuration) {
        const startTime = startTimeMinutes + totalDuration - duration;
        animatedText.value = minutesToTime(startTime);
      } else if (!selected) {
        animatedText.value = formatDuration(duration);
      }
    },
    [totalDurations, itemKey, duration, startTimeMinutes]
  );

  const animatedCardStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      selectedAnimationProgress.value,
      [0, 1],
      [colors.white, colors.primary]
    ),
    ...(isSelected.value
      ? {
          justifyContent: 'flex-start',
          marginLeft: 60,
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

  const animatedSubtitleStyle = useAnimatedStyle(() =>
    isSelected.value
      ? {
          left: -110,
          position: 'absolute',
          top: -10
        }
      : {
          left: 0,
          position: 'relative',
          top: 0
        }
  );

  return (
    <Animated.View
      layout={LinearTransition}
      style={[styles.card, animatedCardStyle]}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text>{icon}</Text>
          <View style={flex.shrink}>
            <Animated.Text
              layout={LinearTransition}
              numberOfLines={1}
              style={[styles.title, animatedTitleStyle]}>
              {title}
            </Animated.Text>
            <AnimatedText
              layout={LinearTransition}
              style={[styles.subtitle, animatedSubtitleStyle]}
              text={animatedText}
            />
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
    flexShrink: 1,
    gap: spacing.md
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between'
  },
  subtitle: {
    ...text.subHeading3,
    color: colors.foreground3,
    // Set to something large to prevent text clipping when text in the
    // animated text input changes
    width: Dimensions.get('window').width
  },
  title: {
    ...text.heading4,
    color: colors.foreground2,
    flexShrink: 1,
    textOverflow: 'ellipsis'
  }
});
