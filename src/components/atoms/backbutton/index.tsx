import { router } from "expo-router";
import {
  View,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { styles } from "./styles";

type BackButtonProps = {
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function BackButton({
  onPress,
  textStyle,
  buttonStyle,
}: BackButtonProps) {
  return (
    <View>
      <TouchableOpacity
        style={buttonStyle ? buttonStyle : styles.backButton}
        onPress={() => (onPress ? onPress() : router.back())}
      >
        <Text style={textStyle ? textStyle : styles.backButtonText}>←</Text>
      </TouchableOpacity>
    </View>
  );
}
