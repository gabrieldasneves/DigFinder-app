import LoginForm from "@/components/organisms/loginForm";
import { colors } from "@/styles/colors";
import { View } from "react-native";
import { useStatusBar } from "@/hooks/useStatusBar";

export default function Index() {
  useStatusBar("light"); 

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",  
        backgroundColor: colors.brown.strong,
      }}
    >
      <LoginForm />
    </View>
  );
}
