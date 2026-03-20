// src/app/register-fossil.tsx
import { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { Picker } from '@react-native-picker/picker'
import { api } from '@/services/api'
import { useRouter } from 'expo-router'
import { styles } from './styles'
import { colors } from '@/styles/colors'
import { Loading } from '../../atoms/loading'
import BackButton from '@/components/atoms/backbutton'
import { useAuth } from '@/contexts/Authcontext'
import { uploadMultipleImages } from '@/services/storage'

const registerSchema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters'),
  categoryId: z.string().uuid('Please select a category'),
  description: z
    .string()
    .min(10, 'Description must have at least 10 characters'),
  latitude: z.number(),
  longitude: z.number(),
  photos: z.array(z.string()).min(1, 'At least one photo is required'),
})

type RegisterFormData = z.infer<typeof registerSchema>

type Category = {
  id: string
  name: string
}

export default function CreateRegisterForm() {
  const router = useRouter()
  const user = useAuth()
  const [photos, setPhotos] = useState<string[]>([])
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [locationMode, setLocationMode] = useState<'map' | 'gps'>('map')
  const [mapRegion, setMapRegion] = useState({
    latitude: 35.6938,
    longitude: 139.7034,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Categories not found')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    initializeUserLocation()
  }, [])

  useEffect(() => {
    setValue('photos', photos)
  }, [photos, setValue])

  const requestPermissions = async () => {
    try {
      const { status: currentLocationStatus } =
        await Location.getForegroundPermissionsAsync()

      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync()

      let locationStatus = currentLocationStatus

      if (currentLocationStatus === 'undetermined') {
        const { status } = await Location.requestForegroundPermissionsAsync()
        locationStatus = status
      }

      if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
        Alert.alert(
          'Permission',
          'We need permission to access camera and location!',
        )
      }

      return locationStatus === 'granted'
    } catch (error) {
      return false
    }
  }

  const initializeUserLocation = async () => {
    try {
      const hasPermission = await requestPermissions()

      if (!hasPermission) {
        setValue('latitude', mapRegion.latitude)
        setValue('longitude', mapRegion.longitude)
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })

      console.log('Location obtained:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      setLocation(location)
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })

      setValue('latitude', location.coords.latitude)
      setValue('longitude', location.coords.longitude)
    } catch (error) {
      setValue('latitude', mapRegion.latitude)
      setValue('longitude', mapRegion.longitude)
      Alert.alert(
        'Location',
        'It was not possible to obtain your location. You can select manually on the map.',
      )
    }
  }

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location permission is required to use this feature. Please enable it in settings.',
        )
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      setLocation(location)
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })

      setValue('latitude', location.coords.latitude)
      setValue('longitude', location.coords.longitude)
    } catch (error) {
      console.error('Error getting location:', error)
      Alert.alert(
        'Error',
        'Failed to get your location. Please try again or select a location on the map.',
      )
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri])
    }
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      if (!user?.user?.id) {
        Alert.alert('Error', 'User not found')
        return
      }

      Alert.alert('Uploading images...')
      const imgUrls = await uploadMultipleImages(photos, user.user.id)

      const discoveryData = {
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        discoveryDate: new Date().toISOString(),
        categoryIds: [data.categoryId],
        imageUrls: imgUrls,
      }

      const resposne = await api.post(
        '/discoveries/createDiscovery',
        discoveryData,
      )

      console.log('Discovery created successfully:', resposne.data)

      Alert.alert('Discovery created successfully')

      router.back()
    } catch (error) {
      console.error('Error creating discovery:', error)
      Alert.alert('Error', 'Failed to create discovery. Please try again.')
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    )
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
                      pathname: 'categoryExplained' as any,
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

        <Text style={styles.label}>Where did you find it?</Text>
        <View style={styles.locationButtonContainer}>
          <TouchableOpacity
            style={[
              styles.locationButton,
              { width: '50%' },
              locationMode === 'map'
                ? { backgroundColor: colors.green.dark }
                : { backgroundColor: colors.gray[100] },
            ]}
            onPress={() => setLocationMode('map')}
          >
            <Text
              style={[
                styles.buttonLocationText,
                locationMode === 'map'
                  ? { color: colors.gray[100] }
                  : { color: colors.green.dark },
              ]}
            >
              Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.locationButton,
              { width: '50%' },
              locationMode === 'gps'
                ? { backgroundColor: colors.green.dark }
                : { backgroundColor: colors.gray[100] },
            ]}
            onPress={() => setLocationMode('gps')}
          >
            <Text
              style={[
                styles.buttonLocationText,
                locationMode === 'gps'
                  ? { color: colors.gray[100] }
                  : { color: colors.green.dark },
              ]}
            >
              Use my location
            </Text>
          </TouchableOpacity>
        </View>
        {locationMode === 'map' && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={mapRegion}
              onRegionChangeComplete={(region) => {
                setMapRegion(region)
                setValue('latitude', region.latitude)
                setValue('longitude', region.longitude)
              }}
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
          </View>
        )}
        {locationMode === 'gps' && (
          <View style={styles.gpsLocationPanel}>
            <Text style={styles.gpsHelpText}>
              Stand where you made the find (or as close as is safe), then tap
              below. Switch to Map if you need to fine-tune the pin.
            </Text>

            {location != null && (
              <Text style={styles.coordsHint}>
                Coordinates saved: {location.coords.latitude.toFixed(5)},{' '}
                {location.coords.longitude.toFixed(5)}
              </Text>
            )}
          </View>
        )}

        <Controller control={control} name="latitude" render={() => <></>} />
        <Controller control={control} name="longitude" render={() => <></>} />

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

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonSubmitText}>Register Find</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
