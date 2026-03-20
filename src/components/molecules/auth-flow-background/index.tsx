import { ImageBackground, StyleSheet, View } from "react-native";

type AuthFlowBackgroundProps = {
  children: React.ReactNode;
};

export function AuthFlowBackground({ children }: AuthFlowBackgroundProps) {
  return (
    <ImageBackground
      source={require("@/assets/bones.jpeg")}
      style={styles.root}
      resizeMode="cover"
    >
      <View style={styles.dim}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  dim: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
})
