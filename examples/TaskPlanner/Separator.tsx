import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, text } from '@/theme';

export function Separator() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.line} />
        <Text style={styles.text}>Inbox Tasks</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
}

export default memo(Separator);

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
    ...text.subHeading3,
    color: colors.foreground4,
    marginHorizontal: spacing.sm
  }
});
