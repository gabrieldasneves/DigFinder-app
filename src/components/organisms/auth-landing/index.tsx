import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type AuthLandingProps = {
  onEnter: () => void;
  onSignUp: () => void;
};

export function AuthLanding({ onEnter, onSignUp }: AuthLandingProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 24) + 16;

  return (
    <ImageBackground
      source={require("@/assets/bones.jpeg")}
      style={styles.root}
      resizeMode="cover"
    >
      <View style={[styles.dim, { paddingBottom: bottomPad }]}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onEnter}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={onSignUp}
            activeOpacity={0.85}
          >
            <Text style={styles.outlineButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
