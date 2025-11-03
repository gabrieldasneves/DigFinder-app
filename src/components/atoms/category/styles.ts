import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 36,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.brown.middle,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 10,
  },
  name: {
    fontSize: 14,
    color: colors.brown.middle,
    fontFamily: fontFamily.regular,
  },
  containerSelected: {
    backgroundColor: colors.brown.strong,
    borderColor: colors.brown.strong,
  },
  nameSelected: {
    color: colors.gray[100],
  },
});
