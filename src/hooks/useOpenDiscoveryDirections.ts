import { Alert, Linking, Platform } from 'react-native'

function googleMapsUrl (latitude: number, longitude: number) {
  const destination = `${latitude},${longitude}`
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`
}

function googleMapsAppUrl (latitude: number, longitude: number) {
  const destination = `${latitude},${longitude}`
  return `comgooglemaps://?daddr=${destination}&directionsmode=driving`
}

export function useOpenDiscoveryDirections (
  latitude: number,
  longitude: number,
) {
  async function openDirections () {
    try {
      if (Platform.OS === 'ios') {
        try {
          await Linking.openURL(googleMapsAppUrl(latitude, longitude))
          return
        } catch (error) {
          console.log(error)
        }
      }

      await Linking.openURL(googleMapsUrl(latitude, longitude))
    } catch (error) {
      console.log(error)
      Alert.alert('Maps', 'Could not open Google Maps.')
    }
  }

  return { openDirections }
}
