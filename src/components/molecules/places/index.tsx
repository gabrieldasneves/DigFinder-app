import { useWindowDimensions, View, Text } from "react-native";
import { styles } from "./styles";
import { useRef } from "react";
import type { PlaceProps } from "@/components/atoms/place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Place } from "@/components/atoms/place";

type Props = {
  data: PlaceProps[];
};

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            onPress={() => router.push(`/register/${item.id}`)}
            data={item}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Check out places near you</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
