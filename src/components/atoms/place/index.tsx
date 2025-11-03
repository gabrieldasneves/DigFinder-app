import { TouchableOpacity, View, Text, Image } from "react-native";

import { styles } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";
import { TouchableOpacityProps } from "react-native";

export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  address: string;
  cover: string;
};

type Props = TouchableOpacityProps & {
  data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image
        style={styles.image}
        source={require("../../../assets/avatarImg.png")}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>
        <View style={styles.footer}>
          <IconTicket />
          <Text style={styles.tickets}>{data.coupons} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
