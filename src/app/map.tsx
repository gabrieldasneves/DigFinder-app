import {
  View,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import type { DiscoveryProps } from '@/components/atoms/place'
import { Places } from '@/components/molecules/places'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/typography'
import { router } from 'expo-router'
import BackButton from '@/components/atoms/backbutton'
import { Categories } from '@/components/molecules/categories'
import type { CategoriesProps } from '@/components/molecules/categories'
import { mapStyle } from '@/styles/map'

type DiscoveryMapItem = DiscoveryProps & {
  latitude: number
  longitude: number
}

type ApiDiscovery = {
  id: string
  title: string
  description: string | null
  latitude: number
  longitude: number
  images: Array<{ url: string; isPrimary: boolean; orderIndex: number }>
}

const BRAZIL_CENTER = { latitude: -15.77, longitude: -47.92 }

export default function Map() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState<string>('all')
  const [discoveries, setDiscoveries] = useState<DiscoveryMapItem[]>([])
  const [initialRegion, setInitialRegion] = useState({
    ...BRAZIL_CENTER,
    latitudeDelta: 30,
    longitudeDelta: 30,
  })

  function toMapItem(d: ApiDiscovery): DiscoveryMapItem {
    const primary = d.images?.find((img) => img.isPrimary) ?? d.images?.[0]
    return {
      id: d.id,
      title: d.title,
      description: d.description,
      imageUrl: primary?.url,
      latitude: d.latitude,
      longitude: d.longitude,
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Could not load categories.')
    }
  }

  async function fetchDiscoveries() {
    try {
      const response =
        category === 'all'
          ? await api.get<ApiDiscovery[]>('/registers')
          : await api.get<ApiDiscovery[]>(`/registers/category/${category}`)
      setDiscoveries(response.data.map(toMapItem))
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Could not load discoveries.')
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (granted) {
        const location = await Location.getCurrentPositionAsync()
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    getCurrentLocation()
  }, [])

  useEffect(() => {
    fetchDiscoveries()
  }, [category])

  const useGoogleMaps = Platform.OS === 'android'

  return (
    <View style={{ flex: 1, backgroundColor: '#cecece' }}>
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
        style={{ flex: 1 }}
        customMapStyle={useGoogleMaps ? mapStyle : undefined}
        region={initialRegion}
        showsUserLocation={true}
      >
        {discoveries.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            tracksViewChanges={false}
          >
            <Image
              source={require('@/assets/pin.png')}
              style={{ width: 15, height: 15 }}
              resizeMode="contain"
            />
            <Callout onPress={() => router.push(`/register/${item.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {item.title}
                </Text>
                {item.description ? (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.gray[600],
                      fontFamily: fontFamily.regular,
                    }}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                ) : null}
              </View>
            </Callout>
          </Marker>
        ))}
        <Places data={discoveries} />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  backButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: colors.green.dark,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    padding: 7,
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    shadowColor: colors.gray[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
})
