import { View, TouchableOpacity, Text } from "react-native";
import { colors } from "../styles/colors";
import { Welcome } from "@/components/atoms/welcome";
import { UserMenu } from "@/components/molecules/userMenu";
import { useRouter } from "expo-router";
import { ButtonFlowList } from "@/components/atoms/buttonFlowList";

export function Home() {
  const router = useRouter();


  return (
    <View
      style={{
        flex: 1,
        padding: 40,
        gap: 40,
      }}
    >
      <UserMenu />
      <Welcome />
      <ButtonFlowList />
    </View>
  );
}

export default Home;
