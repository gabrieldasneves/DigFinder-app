import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    elevation: 8,
    backgroundColor: colors.gray[100],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  handle: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  indicator: {
    alignSelf: "center",
    backgroundColor: colors.gray[300],
    width: 80,
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  title: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.gray[600],
  },
  list: {
    flex: 1,
  },
  content: {
    gap: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  empty: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray[400],
  },
});
