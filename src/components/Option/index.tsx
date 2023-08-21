import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import {
  Canvas,
  Skia,
  Path,
  useValue,
  runTiming, // this is similar to the withTiming
  BlurMask,
  Circle,
  Easing,
} from "@shopify/react-native-skia";
import { useEffect } from "react";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
};

const CHECK_SIZE = 28;
const CHECK_STROKE = 2; // here is the thickness

export function Option({ checked, title, ...rest }: Props) {
  const percentage = useValue(0); // this is similar to the useSharedValue
  const circle = useValue(0); // this is similar to the useSharedValue

  const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
  const CENTER_CIRCLE = RADIUS / 2;

  const path = Skia.Path.Make(); // let's created a path, the pen to paint the design
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS);

  useEffect(() => {
    if (checked) {
      runTiming(percentage, 1, { duration: 700 });
      runTiming(circle, CENTER_CIRCLE, { easing: Easing.bounce });
    } else {
      runTiming(percentage, 0, { duration: 700 });
      runTiming(circle, 0, { duration: 300 });
    }
  }, [checked]);

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style="solid" />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={4} style="inner" />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  );
}

// Canvas is a space to paint
