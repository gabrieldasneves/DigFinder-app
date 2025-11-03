import { View, Text, TextInput, TouchableOpacity, Linking } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { useAuth } from "@/contexts/Authcontext";
import { router } from "expo-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      //   router.replace("/home" as any);
    } catch (error) {
      // Tratar erro de login
      console.error(error);
    }
  };

  const handleCreateAccount = () => {
    router.push("/auth/createAccount" as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={handleCreateAccount}>
          <Text style={styles.linkText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
