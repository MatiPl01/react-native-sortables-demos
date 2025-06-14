import { useLocalSearchParams } from 'expo-router';

import { EXAMPLES } from '@/examples';

export default function ExampleScreen() {
  const { example } = useLocalSearchParams<{ example: string }>();

  if (!example) {
    return null;
  }

  const exampleConfig = EXAMPLES.find(ex => ex.route === example);

  if (!exampleConfig) {
    return null;
  }

  const ExampleComponent = exampleConfig.component;

  return <ExampleComponent />;
}
