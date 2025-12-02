import { useEffect } from "react";
import { StatusBar } from "react-native";

export function useStatusBar(style: "light" | "dark") {
  useEffect(() => {
    StatusBar.setBarStyle(style === "light" ? "light-content" : "dark-content");
  }, [style]);
}
