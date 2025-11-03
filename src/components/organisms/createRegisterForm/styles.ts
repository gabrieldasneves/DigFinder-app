import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily, typography } from "@/styles/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  scrollView: {
    flex: 1,
    padding: 24,
    marginTop: 90,
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
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    marginBottom: 32,
    textAlign: "center",
    color: colors.green.dark,
  },
  inputContainer: {
    marginBottom: 28,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    marginBottom: 6,
    color: colors.green.dark,
  },
  subLabel: {
    fontFamily: fontFamily.regular,
    color: colors.gray[300],
  },
  categoryExplainedButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryExplainedButton: {
    backgroundColor: colors.green.rifle_green,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 25,
    marginRight: 8,
  },
  categoryExplainedButtonText: {
    fontFamily: fontFamily.semiBold,
    color: colors.gray[100],
    fontSize: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.gray[200],
    borderRadius: 16,
    padding: 16,
    ...typography.textMd,
    backgroundColor: colors.gray[100],
    color: colors.gray[600],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 140,
    textAlignVertical: "top",
  },
  errorText: {
    color: colors.attention.base,
    ...typography.textXs,
    marginTop: 6,
    marginLeft: 4,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: colors.gray[100],
    borderWidth: 1.5,
    borderColor: colors.gray[200],
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  categoryButtonSelected: {
    backgroundColor: colors.brown.strong,
    borderColor: colors.brown.strong,
  },
  categoryButtonText: {
    fontFamily: fontFamily.regular,
    color: colors.gray[400],
  },
  categoryButtonTextSelected: {
    color: colors.gray[100],
  },
  mapContainer: {
    height: 240,
    marginVertical: 28,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    backgroundColor: colors.brown.middle,

    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  buttonLocationText: {
    fontFamily: fontFamily.semiBold,
    color: colors.gray[100],
  },
  photoContainer: {
    marginVertical: 28,
  },
  photoButton: {
    backgroundColor: colors.gray[100],
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.brown.strong,
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  photoPreviewContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  photoPreview: {
    width: 140,
    height: 140,
    marginRight: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: colors.green.dark,
    padding: 20,
    borderRadius: 16,
    marginTop: 28,
    marginBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: colors.brown.strong,
    ...typography.action,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray[100],
  },
  buttonSubmitText: {
    fontFamily: fontFamily.semiBold,
    color: colors.gray[100],
  },
});
