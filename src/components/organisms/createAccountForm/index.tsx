import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { api } from "@/services/api";
import BackButton from "@/components/atoms/backbutton";
import { authFlowScreenStyles } from "@/styles/auth-flow-screen";

const placeholderColor = "rgba(26, 31, 36, 0.45)";

type CreateAccountFormProps = {
  onBack: () => void;
  onRegistered: () => void;
};

export default function CreateAccountForm({
  onBack,
  onRegistered,
}: CreateAccountFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Finish all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup response:", response.data);
      Alert.alert("Account created successfully! Login now.");
      onRegistered();
    } catch (error: unknown) {
      const axiosLike = error as {
        response?: { data?: { message?: string } };
      };
      const message =
        axiosLike.response?.data?.message ??
        (error instanceof Error ? error.message : "Try again later.");
      console.error("Signup error:", message);
      Alert.alert("Error creating account", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackButton
        buttonStyle={authFlowScreenStyles.backButton}
        textStyle={authFlowScreenStyles.backButtonText}
        onPress={onBack}
      />
      <View style={authFlowScreenStyles.formWrap}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign up</Text>

            <Text style={styles.label}>name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={placeholderColor}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor={placeholderColor}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Text style={styles.label}>confirm password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor={placeholderColor}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Registering..." : "Sign up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
