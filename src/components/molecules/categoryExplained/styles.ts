import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 28,
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  categoryExplainedButtonContainer: {
    gap: 8,
    marginLeft: 10,
    justifyContent: "center",
  },
  categoryExplainedButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.green.dark,
    fontFamily: fontFamily.medium,
  },
  categoryExplainedButtonDescription: {
    fontSize: 12,
    color: colors.gray[400],
    fontFamily: fontFamily.regular,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 30,
  },
  title: {
    color: colors.green.dark,
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
    padding: 7,
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    shadowColor: colors.gray[600],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  backButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: colors.green.dark,
  },
});
