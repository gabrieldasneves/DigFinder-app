import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.brown.strong,
  },
  formContainer: {
    backgroundColor: colors.brown.light,
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamily.semiBold,
    marginBottom: 24,
    textAlign: "center",
    color: colors.gray[600],
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: colors.gray[100],
  },
  button: {
    backgroundColor: colors.brown.dark,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: colors.gray[600],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
  linkText: {
    fontFamily: fontFamily.regular,
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: colors.green.lgith,
  },
  link: {
    borderBottomColor: colors.green.lgith,
    borderBottomWidth: 1,

    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
