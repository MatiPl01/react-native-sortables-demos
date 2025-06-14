import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import type { AnimatedProps, SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface TextProps extends Omit<AnimatedProps<TextInputProps>, 'value'> {
  text: SharedValue<string>;
}

export default function AnimatedText({ style, text, ...rest }: TextProps) {
  // We need to store the initial text as the animated text value works only if
  // the stored text changes and won't update value on the initial render.
  const [initialText] = useState(() => text.value);

  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: text.value
      }) as TextInputProps
  );

  return (
    <AnimatedTextInput
      allowFontScaling={false}
      animatedProps={animatedProps}
      editable={false}
      style={[style, styles.animatedText]}
      underlineColorAndroid='transparent'
      value={initialText}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  animatedText: {
    lineHeight: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
    pointerEvents: 'none'
  }
});
