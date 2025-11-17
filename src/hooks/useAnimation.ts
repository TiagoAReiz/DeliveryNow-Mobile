import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook para criar animações de pulse reutilizáveis
 */
export function usePulseAnimation(
  isActive: boolean = false,
  scale: number = 1.03,
  duration: number = 1000
) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isActive) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: scale,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    }

    return () => {
      animation?.stop();
      pulseAnim.setValue(1);
    };
  }, [isActive, scale, duration]);

  return pulseAnim;
}

/**
 * Hook para criar animações de fade reutilizáveis
 */
export function useFadeAnimation(isVisible: boolean = false, duration: number = 300) {
  const fadeAnim = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [isVisible, duration]);

  return fadeAnim;
}

/**
 * Hook para criar animações de slide reutilizáveis
 */
export function useSlideAnimation(
  isVisible: boolean = false,
  fromValue: number = -100,
  toValue: number = 0,
  duration: number = 300
) {
  const slideAnim = useRef(new Animated.Value(isVisible ? toValue : fromValue)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? toValue : fromValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [isVisible, fromValue, toValue, duration]);

  return slideAnim;
}

