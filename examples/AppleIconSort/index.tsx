import * as Haptics from 'expo-haptics';
import { memo, useCallback, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import type { SortableGridRenderItem } from 'react-native-sortables';
import Sortable, { useItemContext } from 'react-native-sortables';

import { IS_WEB, MAX_CONTENT_WIDTH } from '@/constants';

import amazon from './img/amazon.png';
import dropbox from './img/dropbox.png';
import facebook from './img/facebook.png';
import github from './img/github.png';
import gmail from './img/gmail.png';
import google from './img/google.png';
import googleDrive from './img/google-drive.png';
import instagram from './img/instagram.png';
import linkedin from './img/linkedin.png';
import messenger from './img/messenger.png';
import paypal from './img/paypal.png';
import pinterest from './img/pinterest.png';
import reddit from './img/reddit.png';
import skype from './img/skype.png';
import spotify from './img/spotify.png';
import telegram from './img/telegram.png';
import twitter from './img/twitter.png';
import whatsapp from './img/whatsapp.png';
import youtube from './img/youtube.png';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type IconData = {
  image: ImageSourcePropType;
  label: string;
};

const ICONS: Array<IconData> = [
  { image: amazon, label: 'Amazon' },
  { image: dropbox, label: 'Dropbox' },
  { image: facebook, label: 'Facebook' },
  { image: gmail, label: 'Gmail' },
  { image: github, label: 'GitHub' },
  { image: google, label: 'Google' },
  { image: googleDrive, label: 'Drive' },
  { image: instagram, label: 'Instagram' },
  { image: linkedin, label: 'LinkedIn' },
  { image: messenger, label: 'Messenger' },
  { image: paypal, label: 'PayPal' },
  { image: pinterest, label: 'Pinterest' },
  { image: reddit, label: 'Reddit' },
  { image: skype, label: 'Skype' },
  { image: spotify, label: 'Spotify' },
  { image: telegram, label: 'Telegram' },
  { image: twitter, label: 'Twitter' },
  { image: whatsapp, label: 'WhatsApp' },
  { image: youtube, label: 'YouTube' }
];

const keyExtractor = (item: IconData) => item.label;

const shakeTimingConfig = {
  duration: 150,
  easing: Easing.inOut(Easing.ease)
};

type IconProps = {
  item: IconData;
  isEditing: SharedValue<boolean>;
  onDelete: (item: IconData) => void;
};

const Icon = memo(function Icon({ isEditing, item, onDelete }: IconProps) {
  const { isActive } = useItemContext();

  const shakeProgress = useDerivedValue(() =>
    isEditing.value
      ? withDelay(
          Math.random() * 300,
          withRepeat(
            withSequence(
              withTiming(-2, shakeTimingConfig),
              withTiming(2, shakeTimingConfig)
            ),
            -1
          )
        )
      : withTiming(0, shakeTimingConfig)
  );

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${shakeProgress.value}deg` }]
  }));

  const animatedDeleteButtonStyle = useAnimatedStyle(() =>
    isEditing.value && !isActive.value
      ? { opacity: withTiming(1), pointerEvents: 'auto' }
      : { opacity: withTiming(0), pointerEvents: 'none' }
  );

  return (
    <Animated.View style={[styles.icon, animatedShakeStyle]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.text}>{item.label}</Text>
      <AnimatedPressable
        style={[styles.deleteButton, animatedDeleteButtonStyle]}
        onPress={onDelete.bind(null, item)}>
        <Text style={styles.deleteButtonText}>-</Text>
      </AnimatedPressable>
    </Animated.View>
  );
});

export default function AppleIconSort() {
  const [icons, setIcons] = useState(ICONS);
  const [isEditing, setIsEditing] = useState(false);
  const isEditingValue = useDerivedValue(() => isEditing);

  const handleIconDelete = useCallback((item: IconData) => {
    setIcons(prevIcons => prevIcons.filter(icon => icon.label !== item.label));
  }, []);

  const renderItem = useCallback<SortableGridRenderItem<IconData>>(
    ({ item }) => (
      <Icon
        isEditing={isEditingValue}
        item={item}
        onDelete={handleIconDelete}
      />
    ),
    [isEditingValue, handleIconDelete]
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          {isEditing && (
            <AnimatedPressable
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.button}
              onPress={() => setIsEditing(false)}>
              <Text style={styles.buttonText}>Done</Text>
            </AnimatedPressable>
          )}
        </View>
        <Sortable.Grid
          columnGap={24}
          columns={4}
          data={icons}
          inactiveItemOpacity={1}
          keyExtractor={keyExtractor}
          overflow='visible'
          renderItem={renderItem}
          rowGap={24}
          // We want to have the icon centered when dragging but the delete
          // button adds up to the total width, so we have to move the snap
          // offset from the center to the right
          snapOffsetX='70%'
          onDragEnd={({ data }) => {
            setIcons(data);
          }}
          onDragStart={() => {
            if (!isEditing) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              setIsEditing(true);
            }
          }}
        />
      </View>
    </View>
  );
}

const backgroundImageProp = `${IS_WEB ? '' : 'experimental_'}backgroundImage`;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(180, 180, 180, 0.6)',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    alignItems: 'center',
    [backgroundImageProp]: `linear-gradient(125deg, #158a80 0%, #072f2c 50%, #010c0b 100%), 
      linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), 
      radial-gradient(circle at 50% 50%, rgba(21, 138, 128, 0.08) 0%, rgba(21, 138, 128, 0) 70%)`,
    flex: 1,
    padding: 30
  },
  contentWrapper: {
    alignContent: 'flex-end',
    ...(IS_WEB ? { maxWidth: MAX_CONTENT_WIDTH, width: '100%' } : {})
  },

  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(180, 180, 180, 0.8)',
    borderRadius: 20,
    height: 25,
    justifyContent: 'center',
    left: -10,
    position: 'absolute',
    top: -10,
    width: 25
  },
  deleteButtonText: {
    color: 'black',
    fontSize: 28,
    lineHeight: 28
  },
  header: {
    alignItems: 'flex-end',
    height: 40,
    justifyContent: 'center',
    marginBottom: 16
  },
  icon: {
    gap: 8
  },
  image: {
    resizeMode: 'contain',
    width: '100%'
  },
  imageContainer: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderCurve: 'continuous',
    borderRadius: '30%',
    justifyContent: 'center',
    // For some reason this is needed as gesture handler goes crazy
    // when overflow is not set to hidden because the image is likely
    // overflowing the container (the transparent part of the image
    // and gesture handler recognizes press events on wrong items)
    overflow: 'hidden',
    padding: 8
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { height: 1, width: 0 },
    textShadowRadius: 5
  }
});
