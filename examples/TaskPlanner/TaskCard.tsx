import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Sortable from 'react-native-sortables';

import { colors, iconSizes, radius, spacing, text } from '@/theme';

import type { Task } from './types';
import { minutesToTime } from './utils';

export function TaskCard({ duration, icon, title }: Task) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>{icon}</Text>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{minutesToTime(duration)}</Text>
        </View>
      </View>
      <Sortable.Handle>
        <FontAwesome5
          color={colors.foreground4}
          name='grip-horizontal'
          size={iconSizes.md}
        />
      </Sortable.Handle>
    </View>
  );
}

export default memo(TaskCard);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background2,
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md
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
