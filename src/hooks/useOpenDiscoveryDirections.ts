import { Alert, Linking, Platform } from 'react-native'

function directionsUrl (latitude: number, longitude: number) {
  const destination = `${latitude},${longitude}`

  if (Platform.OS === 'ios') {
    return `https://maps.apple.com/?daddr=${destination}&dirflg=d`
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`
}

export function useOpenDiscoveryDirections (
  latitude: number,
  longitude: number,
) {
  async function openDirections () {
    try {
      await Linking.openURL(directionsUrl(latitude, longitude))
    } catch (error) {
      console.log(error)
      Alert.alert('Maps', 'Could not open the maps app.')
    }
  }

  return { openDirections }
}
