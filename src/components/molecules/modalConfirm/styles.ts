import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: 300,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: "#d9534f",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
