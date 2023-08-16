import { Pressable, PressableProps, Text } from "react-native";
// Pressable have more options than that TouchableOpacity

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
// useSharedValue - we let's use for save content of animations - this content can change with changing of something state
// useAnimatedStyle - we let's use for created the animated styles
// Animated - for become a component in a animated component
// withSpring - we can use for defined how the value will be altered
// withTiming - linear animation

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

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    // for created animations in properties of styles
    return { transform: [{ scale: scale.value }] };
  });

  function onPressIn() {
    scale.value = withTiming(1.2, { easing: Easing.bounce, duration: 500 });
  }

  function onPressOut() {
    scale.value = withTiming(1, { easing: Easing.bounce, duration: 500 });
  }

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View
        style={[
          styles.container,
          animatedContainerStyle,
          {
            borderColor: COLOR,
            backgroundColor: isChecked ? COLOR : "transparent",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isChecked ? THEME.COLORS.GREY_100 : COLOR },
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
