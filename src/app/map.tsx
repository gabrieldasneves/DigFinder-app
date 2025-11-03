import {
  View,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { PlaceProps } from "@/components/atoms/place";
import { Places } from "@/components/molecules/places";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/typography";
import { router } from "expo-router";
import BackButton from "@/components/atoms/backbutton";
import { Categories } from "@/components/molecules/categories";
import type { CategoriesProps } from "@/components/molecules/categories";

type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

export default function Map() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState<string>("");
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Categories not found");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      }
      const { data } = await api.get(`/registers/category/${category}`);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Places not found");
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Places not found");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#cecece",
      }}
    >
      <BackButton
        textStyle={styles.backButtonText}
        buttonStyle={styles.backButton}
      />

      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 35.6938,
          longitude: 139.7034,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: 35.6938,
            longitude: 139.7034,
          }}
          image={require("@/assets/location.png")}
        />
        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.push(`/register/${item.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
        <Places data={markets} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: colors.green.dark,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
    padding: 7,
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    shadowColor: colors.gray[600],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
