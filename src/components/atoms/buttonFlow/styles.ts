import { StyleSheet } from "react-native";
import { fontFamily } from "@/styles/typography";
import { colors } from "@/styles/colors";
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    backgroundColor: colors.gray[100],
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.gray[200],
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
  },
  imageContainer: {
    width: 120,
    height: "100%",
    position: "relative",
  },
  imageLeft: {
    width: "100%",
    height: "100%",
  },
  imageRight: {
    width: "100%",
    height: "100%",
  },
  imageOverlayRight: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 30,
    borderTopWidth: 120,
    borderRightColor: "transparent",
    borderTopColor: colors.gray[100],
  },

  imageOverlayLeft: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderTopWidth: 120,
    borderLeftColor: "transparent",
    borderTopColor: colors.gray[100],
  },
  details: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[600],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    lineHeight: 20,
  },
});
