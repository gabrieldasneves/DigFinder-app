import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export function Welcome() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to DigFind</Text>
      <Text style={styles.subtitle}>
        Track your discoveries. Inspire others.
      </Text>
    </View>
  );
}
