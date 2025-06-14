import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, text } from '@/theme';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.line} />
        <Text style={styles.text}>{title}</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
}

export default memo(SectionHeader);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xs,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.xs
  },
  line: {
    backgroundColor: colors.background4,
    flex: 1,
    height: 1
  },
  text: {
    ...text.subHeading2,
    color: colors.foreground4,
    marginHorizontal: spacing.sm
  }
});
