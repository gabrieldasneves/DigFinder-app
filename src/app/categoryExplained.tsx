import CategoryExplained from "@/components/molecules/categoryExplained";
import { View, StyleSheet } from "react-native";

export default function CategoryExplainedPage() {

  return (
    <View style={styles.container}>
      <CategoryExplained />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
