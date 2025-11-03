import { View, Text, Pressable, PressableProps } from "react-native";
import { styles } from "./styles";

type Props = {
  name: string;
  iconId: string;
  isSelected?: boolean;
} & PressableProps;

export function Category({ name, iconId, isSelected, ...rest }: Props) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  );
}
