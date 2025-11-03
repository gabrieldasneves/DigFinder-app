import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { Category } from "@/components/atoms/category";
export type CategoriesProps = {
  id: string;
  name: string;
}[];

type Props = {
  data: CategoriesProps;
  selected: string;
  onSelect: (id: string) => void;
};

export function Categories({ data, selected, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          onPress={() => onSelect(item.id)}
          name={item.name}
          iconId={item.id}
          isSelected={item.id === selected}
        />
      )}
    />
  );
}
