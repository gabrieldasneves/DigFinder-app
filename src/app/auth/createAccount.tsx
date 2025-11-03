import { View } from "react-native";
import { colors } from "@/styles/colors";
import CreateAccountForm from "@/components/organisms/createAccountForm";

export default function CreateAccount() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.brown.dark,
      }}
    >
      <CreateAccountForm />
    </View>
  );
}
