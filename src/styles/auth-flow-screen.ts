import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const authFlowScreenStyles = StyleSheet.create({
  formWrap: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20,
    zIndex: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.65)",
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  backButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: colors.gray[100],
  },
})
