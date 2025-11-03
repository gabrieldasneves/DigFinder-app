import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/atoms/backbutton";
export default function CategoryExplained() {
  const params = useLocalSearchParams();
  const categories = params.categories
    ? JSON.parse(params.categories as string)
    : [];

  return (
    <View style={{ flex: 1 }}>
      <BackButton
        buttonStyle={styles.backButton}
        textStyle={styles.backButtonText}
      />
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Category Explaination</Text>
        </View>
        {categories.map((item: any) => (
          <View style={styles.categoryExplainedButtonContainer} key={item.id}>
            <Text style={styles.categoryExplainedButtonText}>{item.name}</Text>
            <Text style={styles.categoryExplainedButtonDescription}>
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
