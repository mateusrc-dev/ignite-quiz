import { Pressable, PressableProps } from "react-native";
// Pressable have more options than that TouchableOpacity
import { useEffect } from "react";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
// useSharedValue - we let's use for save content of animations - this content can change with changing of something state
// useAnimatedStyle - we let's use for created the animated styles
// Animated - for become a component in a animated component
// withSpring - we can use for defined how the value will be altered
// withTiming - linear animation
// interpolateColor - for created interpolation of colors

const PressableAnimated = Animated.createAnimatedComponent(Pressable);
// we let's created a animated component when not exist the component inside of Animated

import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1); // we let's defined a initial value
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    // for created animations in properties of styles with useSharedValue
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      ),
    };
  });

  function onPressIn() {
    scale.value = withTiming(1.2, { easing: Easing.bounce, duration: 500 });
  }

  function onPressOut() {
    scale.value = withTiming(1, { easing: Easing.bounce, duration: 500 });
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, { duration: 700 });
  }, [isChecked]);

  return (
    <PressableAnimated
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.container,
        animatedContainerStyle,
        {
          borderColor: COLOR,
        },
      ]}
      {...rest}
    >
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  );
}
