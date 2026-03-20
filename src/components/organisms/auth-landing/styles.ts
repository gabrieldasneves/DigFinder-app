import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  dim: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "flex-end",
  },
  actions: {
    paddingHorizontal: 28,
    width: "100%",
    gap: 16,
  },
  primaryButton: {
    backgroundColor: colors.auth.primary,
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: fontFamily.semiBold,
  },
  outlineButton: {
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: fontFamily.semiBold,
  },
})
