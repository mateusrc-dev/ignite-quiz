import { useWindowDimensions } from "react-native"; // useWindowDimensions - is a hook - can get dimensions updated of screen
import Animated from "react-native-reanimated";
import { Canvas, Rect, BlurMask } from "@shopify/react-native-skia";
import { THEME } from "../../styles/theme";

const STATUS = [
  "transparent",
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
];

type Props = {
  status?: number;
};

export function OverlayFeedback({ status = 0 }: Props) {
  const color = STATUS[status];

  const { height, width } = useWindowDimensions();

  return (
    <Animated.View style={{ height, width, position: "absolute" }}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={color}>
          <BlurMask blur={50} style="inner" />
        </Rect>
      </Canvas>
    </Animated.View>
  );
}