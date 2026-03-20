import { useEffect, useLayoutEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { useNavigation } from "expo-router";
import { AuthLanding } from "@/components/organisms/auth-landing";
import { AuthFlowBackground } from "@/components/molecules/auth-flow-background";
import LoginForm from "@/components/organisms/loginForm";
import CreateAccountForm from "@/components/organisms/createAccountForm";
import BackButton from "@/components/atoms/backbutton";
import { useStatusBar } from "@/hooks/useStatusBar";
import { authFlowScreenStyles } from "@/styles/auth-flow-screen";

type AuthView = "landing" | "login" | "signup";

export default function Index() {
  const navigation = useNavigation();
  const [view, setView] = useState<AuthView>("landing");
  useStatusBar("light");

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      fullScreenGestureEnabled: false,
      headerBackVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (view === "login" || view === "signup") {
        setView("landing");
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [view]);

  if (view === "landing") {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <AuthLanding
          onEnter={() => setView("login")}
          onSignUp={() => setView("signup")}
        />
      </View>
    );
  }

  if (view === "login") {
    return (
      <AuthFlowBackground>
        <BackButton
          buttonStyle={authFlowScreenStyles.backButton}
          textStyle={authFlowScreenStyles.backButtonText}
          onPress={() => setView("landing")}
        />
        <View style={authFlowScreenStyles.formWrap}>
          <LoginForm />
        </View>
      </AuthFlowBackground>
    );
  }

  return (
    <AuthFlowBackground>
      <CreateAccountForm
        onBack={() => setView("landing")}
        onRegistered={() => setView("login")}
      />
    </AuthFlowBackground>
  );
}
