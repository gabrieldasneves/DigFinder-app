import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    height: 56,
    maxWidth: 56,
    backgroundColor: colors.green.dark,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 14,
  },
  title: {
    color: colors.gray[100],
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
});
