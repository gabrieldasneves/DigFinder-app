import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    gap: 16,
    padding: 24,
    paddingBottom: 100,
  },
  indicator: {
    backgroundColor: colors.gray[300],
    width: 80,
    height: 4,
  },
  title: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 16,
  },
});
