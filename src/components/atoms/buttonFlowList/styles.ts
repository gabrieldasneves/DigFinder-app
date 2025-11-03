import { StyleSheet } from "react-native";
import { fontFamily } from "@/styles/typography";
import { colors } from "@/styles/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 44,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
});
