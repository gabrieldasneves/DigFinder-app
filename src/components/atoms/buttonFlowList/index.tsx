import { View } from "react-native";
import { styles } from "./styles";
import { ButtonFlow } from "../buttonFlow";
import { IconPin, IconMap } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";
import { router } from "expo-router";

export function ButtonFlowList() {
  return (
    <View style={styles.container}>
      <ButtonFlow
        onPress={() => {
          router.push("map" as any);
        }}
        title="Explore"
        subtitle="Find places where people have found fossils"
        icon={<IconMap color={colors.brown.middle} />}
        imageProps={{
          source: require("@/assets/lookingForFossils.png"),
          position: "left",
        }}
      />
      <ButtonFlow
        onPress={() => {
          router.push("register/createRegister" as any);
        }}
        title="Register"
        subtitle="Did you find a fossil? Let's register so others can check this place to find more"
        icon={<IconPin color={colors.brown.middle} />}
        imageProps={{
          source: require("@/assets/registeringFossil.png"),
          position: "right",
        }}
      />
    </View>
  );
}
