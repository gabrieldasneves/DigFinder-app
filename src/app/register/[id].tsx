import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Loading } from "@/components/atoms/loading";

export default function RegisterDetail() {
  const { id } = useLocalSearchParams();
  const [register, setRegister] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRegister() {
    try {
      const { data } = await api.get(`/registers/${id}`);
      setRegister(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRegister();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></View>
  );
}
