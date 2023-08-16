import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
// useSharedValue - we let's use for save content of animations - this content can change with changing of something state
// useAnimatedStyle - we let's use for created the animated styles
// Animated - for become a component in a animated component

import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = TouchableOpacityProps & {
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

  return (
    <TouchableOpacity {...rest}>
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
    </TouchableOpacity>
  );
}
