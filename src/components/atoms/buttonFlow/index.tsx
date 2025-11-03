import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

type ImageProps = {
  source: any;
  position: "left" | "right";
};

type Props = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
  imageProps?: ImageProps;
};

export function ButtonFlow({
  title,
  subtitle,
  icon,
  onPress,
  imageProps,
}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {imageProps?.position === "left" && (
        <View style={styles.imageContainer}>
          <Image
            source={imageProps?.source || require("@/assets/fossil.jpg")}
            style={styles.imageLeft}
          />

          <View
            style={
              imageProps?.position === "left"
                ? styles.imageOverlayLeft
                : styles.imageOverlayRight
            }
          />
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {imageProps?.position === "right" && (
        <View style={styles.imageContainer}>
          <Image
            source={imageProps?.source || require("@/assets/fossil.jpg")}
            style={styles.imageRight}
          />

          <View
            style={
              imageProps?.position === "right"
                ? styles.imageOverlayRight
                : styles.imageOverlayLeft
            }
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
