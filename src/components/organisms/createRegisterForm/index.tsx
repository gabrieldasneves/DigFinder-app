// src/app/register-fossil.tsx
import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import { api } from "@/services/api";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { Loading } from "../../atoms/loading";
import BackButton from "@/components/atoms/backbutton";

const registerSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  categoryId: z.string().uuid("Please select a category"),
  description: z
    .string()
    .min(10, "Description must have at least 10 characters"),
  latitude: z.number(),
  longitude: z.number(),
  photos: z.array(z.string()).min(1, "At least one photo is required"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

type Category = {
  id: string;
  name: string;
};

export default function CreateRegisterForm() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState({
    latitude: 35.6938,
    longitude: 139.7034,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Categories not found");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();

    if (cameraStatus !== "granted" || locationStatus !== "granted") {
      Alert.alert(
        "Permission",
        "We need permission to access camera and location!"
      );
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert("Error", "Error getting location");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log(data);
    //   await api.post("/createDiscovery",data)
    } catch (error) {
      Alert.alert("Erro", "Erro ao enviar formulário");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton
        textStyle={styles.backButtonText}
        buttonStyle={styles.backButton}
      />

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Register</Text>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Write your discovery name"
                onChangeText={onChange}
                value={value}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryExplainedButtonContainer}>
                <Text style={styles.subLabel}>
                  Choose a category for your discovery
                </Text>
                <TouchableOpacity
                  style={styles.categoryExplainedButton}
                  onPress={() =>
                    router.push({
                      pathname: "categoryExplained" as any,
                      params: { categories: JSON.stringify(categories) },
                    })
                  }
                >
                  <Text style={styles.categoryExplainedButtonText}>?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.categoryGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      value === category.id && styles.categoryButtonSelected,
                    ]}
                    onPress={() => onChange(category.id)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        value === category.id &&
                          styles.categoryButtonTextSelected,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.categoryId && (
                <Text style={styles.errorText}>
                  {errors.categoryId.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.subLabel}>
                Describe your discovery with more details
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Write your description"
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={4}
              />
              {errors.description && (
                <Text style={styles.errorText}>
                  {errors.description.message}
                </Text>
              )}
            </View>
          )}
        />

        <View style={styles.photoContainer}>
          <Text style={styles.label}>Add photos</Text>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose Photos</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal style={styles.photoPreviewContainer}>
          {photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.photoPreview}
            />
          ))}
        </ScrollView>

        <Text style={styles.label}>Where did you find it?</Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
            )}
          </MapView>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={getCurrentLocation}
          >
            <Text style={styles.buttonLocationText}>Use Current Location</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonSubmitText}>Register Find</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
