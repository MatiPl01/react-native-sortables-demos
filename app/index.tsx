import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EXAMPLES } from '@/examples';
import { colors, iconSizes, radius, spacing, text } from '@/theme';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {EXAMPLES.map(example => (
        <Link href={`/${example.route}`} key={example.route} asChild>
          <Pressable style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{example.title}</Text>
                <Text style={styles.cardDescription}>
                  {example.description}
                </Text>
              </View>
              <Ionicons
                color={colors.foreground3}
                name='chevron-forward'
                size={iconSizes.lg}
              />
            </View>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    marginBottom: spacing.md,
    padding: spacing.md
  },
  cardContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardDescription: {
    ...text.body1,
    color: colors.foreground4
  },
  cardText: {
    flex: 1
  },
  cardTitle: {
    ...text.heading4,
    color: colors.black,
    marginBottom: spacing.xs
  },
  contentContainer: {
    padding: spacing.md
  }
});
