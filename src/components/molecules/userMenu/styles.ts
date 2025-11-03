import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 80,
    paddingRight: 24,
  },
  menuContainer: {
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    overflow: "hidden",
    minWidth: 160,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  menuOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  menuOptionText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[600],
  },
});
