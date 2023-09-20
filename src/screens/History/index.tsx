import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Alert } from "react-native";
import { HouseLine, Trash } from "phosphor-react-native";
import { Swipeable } from "react-native-gesture-handler";

import { Header } from "../../components/Header";
import { HistoryCard, HistoryProps } from "../../components/HistoryCard";

import { styles } from "./styles";
import { historyGetAll, historyRemove } from "../../storage/quizHistoryStorage";
import { Loading } from "../../components/Loading";
import Animated, {
  Layout,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import { THEME } from "../../styles/theme";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const { goBack } = useNavigation();

  const swipeableRefs = useRef<Swipeable[]>([]); // let's use useRef for manipulate the component directly

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);

    fetchHistory();
  }

  function handleRemove(id: string, index: number) {
    swipeableRefs.current?.[index].close(); // let's access the menu directly to close it
    Alert.alert("Remover", "Deseja remover esse registro?", [
      {
        text: "Sim",
        onPress: () => remove(id),
      },
      { text: "Não", style: "cancel" },
    ]);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${"\n"}realizados`}
        icon={HouseLine}
        onPress={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {history.map((item, index) => (
          <Animated.View
            layout={Layout.springify()}
            entering={SlideInRight}
            exiting={SlideOutRight}
            key={item.id}
          >
            <Swipeable // this property is for become the component sliding
              ref={(ref) => {
                if (ref) {
                  swipeableRefs.current.push(ref);
                }
              }}
              overshootLeft={false} // let's use this property so the item doesn't shoot completely to the left
              containerStyle={styles.swipeableContainer}
              leftThreshold={10} // setting the threshold to recognize container sliding
              renderRightActions={() => null} // for not render nothing in right side
              onSwipeableOpen={() => handleRemove(item.id, index)}
              renderLeftActions={() => (
                <View style={styles.swipeableRemove}>
                  <Trash size={32} color={THEME.COLORS.GREY_100} />
                </View>
              )}
            >
              <HistoryCard data={item} />
            </Swipeable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
