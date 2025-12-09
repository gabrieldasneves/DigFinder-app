import {
    View,
    Text,
    Alert,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Platform,
  } from "react-native";
  import { api } from "@/services/api";
  import { useEffect, useState } from "react";
  import { PlaceProps } from "@/components/atoms/place";
  import { Places } from "@/components/molecules/places";
  import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
  import * as Location from "expo-location";
  import { colors } from "@/styles/colors";
  import { fontFamily } from "@/styles/typography";
  import { router } from "expo-router";
  import BackButton from "@/components/atoms/backbutton";
  import { Categories } from "@/components/molecules/categories";
  import type { CategoriesProps } from "@/components/molecules/categories";
  import { mapStyle } from "@/styles/map";
  
  type RegisterProps = PlaceProps & {
    latitude: number;
    longitude: number;
  };
  
  export default function Map() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState<string>("all");
    const [registers, setRegisters] = useState<RegisterProps[]>([]);
  
    async function fetchCategories() {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.log(error);
        Alert.alert("Categories not found");
      }
    }
  
    async function fetchRegisters() {
      try {
        let registers: RegisterProps[] = [];
        if (category === "all") {
          const response = await api.get("/registers");
          registers = response.data;
        } else {
          const { data } = await api.get(`/registers/category/${category}`);
          registers = data;
        }
        setRegisters(registers);
      } catch (error) {
        console.log(error);
        Alert.alert("Registers not found");
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
      fetchRegisters();
    }, [category]);
  

    const useGoogleMaps = Platform.OS === "android";
  
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
          provider={useGoogleMaps ? PROVIDER_GOOGLE : undefined}
          style={{
            flex: 1,
          }}
          customMapStyle={useGoogleMaps ? mapStyle : undefined}
          initialRegion={{
            latitude: 35.6938,
            longitude: 139.7034,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: 35.6938,
              longitude: 139.7034,
            }}
            image={require("@/assets/location.png")}
            tracksViewChanges={false}
          />
          {registers.map((item) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={require("@/assets/pin.png")}
              tracksViewChanges={false}
            >
              {useGoogleMaps ? (
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
              ) : (
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
              )}
            </Marker>
          ))}
          <Places data={registers} />
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