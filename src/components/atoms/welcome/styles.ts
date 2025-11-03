import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  logo: {
    width: 124,
    height: 124,
    marginTop: 104,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginTop: 12,
  },
});
