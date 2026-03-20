import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
  formContainer: {
    backgroundColor: colors.auth.glassFill,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.auth.glassBorder,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: fontFamily.semiBold,
    marginBottom: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  label: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 16,
    backgroundColor: colors.auth.inputFill,
    color: colors.gray[600],
  },
  button: {
    backgroundColor: colors.auth.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
})
